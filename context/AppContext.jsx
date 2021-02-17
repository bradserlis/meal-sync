import React, { createContext, useState } from 'react';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo';
import * as firebase from 'firebase';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [currentUserObject, setCurrentUserObject] = useState({});
  const [localNotificationsListenerActive, setLocalNotificationsListenerActive] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('')
  
  const retrieveUserFromDB = () => {
    let currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + currentUserId).once('value', (snapshot) => {
      let snapshotObj = snapshot.val();
      Object.assign(snapshotObj, {uid: snapshot.key})
      setCurrentUserObject(snapshotObj)
    })
  }

  const activateLocalNotifications = () => setLocalNotificationsListenerActive(true);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {        
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      setExpoPushToken(token);
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      if(!localNotificationsListenerActive){
        console.log(localNotificationsListenerActive, 'so setting now')
        Notifications.addListener((notification) => {
          if(notification.data.messageBody){
            Notifications.presentLocalNotificationAsync(
              {
                ios: {_displayInForeground:true},
                title: 'MealSync',
                body: notification.data.messageBody
              }
            )
          };
        });
        activateLocalNotifications();
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  }

  const defaultContext = {
    // Current User Object and Function to set Object
    currentUserObject,
    retrieveUserFromDB,
    // expo push token for device and function to check permissions to set expoPushToken
    expoPushToken,
    registerForPushNotificationsAsync,
  };
  
  return (
    <AppContext.Provider value={defaultContext}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider }