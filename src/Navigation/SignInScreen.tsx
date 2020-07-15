import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { TextInput, Button, Headline, Portal, Dialog, Paragraph } from 'react-native-paper';
import * as firebase from 'firebase';

import authContext from '../../App';
import { globalStyles } from '../globalStyles'

const SignInScreen = ({navigation}) => {

  let handleSignIn = () => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        alert('signed in properly!');
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dialogVisibility, setDialogVisibility] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  const showDialog = () => setDialogVisibility(true);
  const hideDialog = () => setDialogVisibility(false);

  return (
    <View style={globalStyles.container}>
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
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

export default SignInScreen;
