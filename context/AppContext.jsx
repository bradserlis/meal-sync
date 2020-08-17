import React, { createContext, useState } from 'react';

import * as firebase from 'firebase';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  
  const [currentUserObject, setCurrentUserObject] = useState({});
  
  const retrieveUserFromDB = () => {
    let currentUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + currentUserId).once('value', (snapshot) => {
      setCurrentUserObject(snapshot.val())
    })
  }

  const defaultContext = {
    currentUserObject,
    retrieveUserFromDB
  };
  
  return (
    <AppContext.Provider value={defaultContext}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };