import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as firebase from 'firebase';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Router from './src/Navigation/Router';
import Landing from './src/Landing/Landing';

const firebaseconfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseconfig);


class App extends Component {
  state={
    isReady: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <SafeAreaView style={{ display: 'flex', flex: 1 }}>
        <PaperProvider>
          <Router />
        </PaperProvider>
      </SafeAreaView>
    )
  }
}

export default App;
