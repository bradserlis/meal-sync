import React, { createContext, useState } from 'react';

import * as firebase from 'firebase';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  
  const [currentUserObject, setCurrentUserObject] = useState({});
  const [localNotificationsListenerActive, setLocalNotificationsListenerActive] = useState(false);
  
  const retrieveUserFromDB = () => {
    let currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + currentUserId).once('value', (snapshot) => {
      let snapshotObj = snapshot.val();
      Object.assign(snapshotObj, {uid: snapshot.key})
      setCurrentUserObject(snapshotObj)
    })
  }

  const activateLocalNotifications = () => setLocalNotificationsListenerActive(true);
  
  const defaultContext = {
    currentUserObject,
    retrieveUserFromDB,
    activateLocalNotifications,
    localNotificationsListenerActive,
  };
  
  return (
    <AppContext.Provider value={defaultContext}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };