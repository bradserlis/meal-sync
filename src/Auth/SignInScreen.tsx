import React, { useState } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import { TextInput, Button, Headline, Portal, Dialog, Paragraph } from 'react-native-paper';
import * as firebase from 'firebase';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import authContext from '../../App';
import Landing from '../Landing/Landing';
import { globalStyles } from '../globalStyles';

const SignInScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const getDeviceExpoPushToken = async () => {
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
    let returnedToken = await Notifications.getExpoPushTokenAsync();
    return returnedToken;
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
  }

  let handleSignIn = () => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(async (result) => {
        let expoPushToken = await getDeviceExpoPushToken();
        firebase.database().ref('users').child(result.user.uid).update({expoPushToken})
        navigation.navigate('Home')
      }).catch(error => {
        switch(error.code){
          case 'auth/user-not-found':
            Keyboard.dismiss()
            setDialogMessage('No user found. Please check your details and try again')
            setDialogVisibility(true)
            break;
          case 'auth/wrong-password':
            Keyboard.dismiss()
            setDialogMessage('Your password is incorrect')
            setDialogVisibility(true)
            break;
          case 'auth/invalid-email':
            Keyboard.dismiss()
            setDialogMessage('The email entered is not formatted correctly - "me@something.com"')
            setDialogVisibility(true)
            break;
          case 'auth/user-disabled':
            Keyboard.dismiss()
            setDialogMessage('Your account is currently disabled') 
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
    catch(e) {
      alert(e)
      console.log(e)
    }
  }

  const showDialog = () => setDialogVisibility(true);
  const hideDialog = () => setDialogVisibility(false);

  return (
    <View style={[globalStyles.container, globalStyles.flexed]}>
      <Headline>Sign In</Headline>
      <TextInput
        label='Enter Email'
        mode='outlined'
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label='Enter Password'
        mode='outlined'
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
       style={{marginTop: 10}}
       mode='contained'
       onPress={handleSignIn} 
      >
      Sign In
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
  );
}

export default SignInScreen;
