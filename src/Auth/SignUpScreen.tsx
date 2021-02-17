import React, { useState, useEffect, useContext } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import { Text, Headline, TextInput, Button, Paragraph, Portal, Dialog } from 'react-native-paper';
import * as firebase from 'firebase';

import { globalStyles } from '../common/globalStyles';
import { AppContext } from '../../context/AppContext';

const SignUpScreen = ({navigation}) => {
  const { expoPushToken } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const hideDialog = () => setDialogVisibility(false);

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
    let userObj = { email, password };

    try {
      firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password).then((result) => {
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
