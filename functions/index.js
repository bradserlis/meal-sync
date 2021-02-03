const functions = require('firebase-functions');
var fetch = require('node-fetch')

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

const db = admin.database();


//============================
// LIMIT THE GROUP SIZE! NEXT! 
//============================


/* there are two times when a notification would need to be sent -- 
    One: First user has entered their "results" -- need to let the second user know to add theirs
    Two: Second (or more) user(s) has finished. Let them know that the syncing is complete.
*/

exports.sendPushNotification = functions.database.ref('mealsync-groups/{mealSyncId}/results').onWrite(async (change, context) => {
    const groupUsersSnapshot = await db.ref('mealsync-groups/'+ context.params.mealSyncId).child('users').get();
    const groupUserConnectionIds = Object.values(groupUsersSnapshot.val());

    const groupResultsSnapshot = await db.ref('mealsync-groups/'+ context.params.mealSyncId).child('results').get();
    const respondingUserConnectionIds = Object.keys(groupResultsSnapshot.val());
    
    const allUsersHaveResponded = groupUserConnectionIds.length === respondingUserConnectionIds.length;
    console.log("allUsersHaveResponded is => ", allUsersHaveResponded);
    const firstUserHasResponded = respondingUserConnectionIds.length === 1;
    console.log("firstUserHasResponded is => ", firstUserHasResponded);
    const connectionIdsToNotify = allUsersHaveResponded ? groupUserConnectionIds : groupUserConnectionIds.filter((connectionId) => !respondingUserConnectionIds.includes(connectionId));
    console.log('this is connectionIdsToNotify => ', connectionIdsToNotify);

    if(firstUserHasResponded || allUsersHaveResponded){
        // send push to usersToNotify
        const usersToNotifyQueries = connectionIdsToNotify.map((connectionIdToNotify) => {
            return db.ref('users').orderByChild('connectionId').equalTo(connectionIdToNotify).once('value')
        })
        const usersToNotifySnapshots = await Promise.all(usersToNotifyQueries);
        let messageBody = allUsersHaveResponded ? "All users have finished" : "First user done. Your Turn." 
        const messages = usersToNotifySnapshots.map((snapshot) => {
            let expoPushToken;
            for (const [key, value] of Object.entries(snapshot.val())) {
                expoPushToken = value.expoPushToken;
              }
            return {
                "to": expoPushToken,
                "body": messageBody
            }
        })
        console.log("SHOW ME THE MESSAGES => ", messages);
        const pushNotificationPromises = messages.map((message) => {
            return fetch('https://exp.host/--/api/v2/push/send', {
                method: "POST",
                headers: {
                    "host": "exp.host",
                    "accept": "application/json",
                    "content-type": "application/json"
                },
                body: JSON.stringify(message)
            })
        })
        return Promise.all(pushNotificationPromises);
    }
    return null;
})