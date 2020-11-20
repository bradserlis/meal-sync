import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as firebase from 'firebase/app';
import { AppLoading } from 'expo';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { AppContextProvider } from './context/AppContext';
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

  registerForPushNotificationsAsync = async () => {
    console.log('what is constants.isdevice?', Constants.isDevice);
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
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
    this.registerForPushNotificationsAsync();
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    
    return (
      <SafeAreaView style={{ display: 'flex', flex: 1 }}>
        <PaperProvider>
        <AppContextProvider>
          <Router />
        </AppContextProvider>
        </PaperProvider>
      </SafeAreaView>
    )
  }
}

export default App;
