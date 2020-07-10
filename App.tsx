import React, { useEffect, createContext, useReducer, useMemo } from 'react';
import { View, Text, Button, SafeAreaView, AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as firebase from 'firebase';

import Router from './src/Navigation/Router';
import Landing from './src/Landing/Landing';

const firebaseconfig = {
  apiKey: "AIzaSyA9ptyDdBBYw49DsjQlFEgsnSmkIyvRVE8",
  authDomain: "meal-sync.firebaseapp.com",
  databaseURL: "https://meal-sync.firebaseio.com",
  projectId: "meal-sync",
  storageBucket: "meal-sync.appspot.com",
  messagingSenderId: "180385339533"
};

firebase.initializeApp(firebaseconfig);


const App = () => {

  return (
      <SafeAreaView style={{ display: 'flex', flex: 1 }}>
      <PaperProvider>
        <Router />
        </PaperProvider>
      </SafeAreaView>
  );
}

export default App;
