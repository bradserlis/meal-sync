import React, { useState, useEffect } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import { Text, Headline, TextInput, Button, Paragraph, Portal, Dialog } from 'react-native-paper';
import * as firebase from 'firebase';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions'

import { globalStyles } from '../common/globalStyles'

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('');
  const [dialogVisibility, setDialogVisibility] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')
  const [expoPushToken, setExpoPushToken] = useState('')

  const showDialog = () => setDialogVisibility(true);
  const hideDialog = () => setDialogVisibility(false);

  useEffect(() => {
    const runRegister = async () => {
      registerForPushNotificationsAsync();
    }
    runRegister()
  }, [])

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

  let createConnectionId = (userid) => {
    var hash = 0, i, chr;
    for (i = 0; i < userid.length; i++) {
      chr = userid.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    let result = Math.abs(hash).toString();
    result = result.padStart(8, "0");
    return (result.substr(0, 4) + '-' + result.substr(4, 4))
  }

  const onSubmit = async () => {

    let userObj = {
      email,
      password,
    }

    try {
      firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password).then((result) => {
        registerForPushNotificationsAsync();
        firebase.auth().currentUser.updateProfile({
          displayName
        }).catch(function(error) {
          alert(error)
        })
        if(result.user.uid !== null){
          let connectionId: string = createConnectionId(result.user.uid)
          firebase.database().ref('users').child(result.user.uid).set({displayName, expoPushToken, connectionId, connections: ''})
          navigation.navigate('Home');
        }
      }).catch((error) => {
          switch(error.code){
            case 'auth/email-already-in-use':
              Keyboard.dismiss();
              setDialogMessage('Email address is already in use. Sign in instead!')
              setDialogVisibility(true)
              break;
            case 'auth/weak-password':
              Keyboard.dismiss();
              setDialogMessage(error.message)
              setDialogVisibility(true)
              break;
            case 'auth/invalid-email':
              Keyboard.dismiss();
              setDialogMessage('The email entered is not formatted correctly - "me@something.com"')
              setDialogVisibility(true)
              break;
            default:
              Keyboard.dismiss()
              setDialogMessage('Something has gone wrong. Please try again.')
              setDialogVisibility(true)
              break;
          }
        })
    }
    catch(e){
      console.log(e)
    }
  }

    return(
      <View style={[globalStyles.container, globalStyles.flexed]}>
        <Headline>Sign Up</Headline>
        <TextInput
          label='Enter Email'
          mode={'outlined'}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          /> 
        <TextInput
          label='Enter a Display Name'
          mode={'outlined'}
          placeholder='Display Name'
          value={displayName}
          onChangeText={setDisplayName}
          /> 
        <TextInput
          label='Enter a Password'
          mode={'outlined'}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          /> 
        <Button
          style={{marginTop: 10}}
          mode={'contained'} 
          onPress={onSubmit}
        >
        Sign Up
        </Button>
        <Portal>
        <Dialog visible={dialogVisibility} onDismiss={hideDialog}>
          <Dialog.Title>Oops...</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
        <View style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'flex-end'}}>
        <Button
          style={{display: 'flex', alignSelf: 'center', alignItems: 'center'}}
          mode='outlined'
          dark={true}
          onPress={() => navigation.navigate('Landing')}
        >
        Go Back
        </Button>
        </View>
      </View>
    </View>
    )
}

export default SignUpScreen;
