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
        const groupUsers = groupUsersSnapshot.val();

        const groupResultsSnapshot = await db.ref('mealsync-groups/'+ context.params.mealSyncId).child('results').get();
        const groupResults = groupResultsSnapshot.val();

        const usersSnapsot =  await db.ref('users').once('value');
        const messages = [];
        
        usersSnapsot.forEach((userSnapshot) => {
            let expoPushToken = userSnapshot.val().expoPushToken
            if (expoPushToken) {
                messages.push({
                    "to": expoPushToken,
                    "body": "New Note Added"
                })
            }
        })

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
    })
