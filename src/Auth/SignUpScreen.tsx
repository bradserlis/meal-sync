import React, { useState } from 'react';
import { View, Keyboard } from 'react-native';
import { Text, Headline, TextInput, Button, Paragraph, Portal, Dialog } from 'react-native-paper';
import * as firebase from 'firebase';

import { globalStyles } from '../globalStyles'

const SignUpScreen = ({navigation}) => {
const [email, setEmail] = useState('');
const [displayName, setDisplayName] = useState('')
const [password, setPassword] = useState('');
const [dialogVisibility, setDialogVisibility] = useState(false)
const [dialogMessage, setDialogMessage] = useState('')

const showDialog = () => setDialogVisibility(true);
const hideDialog = () => setDialogVisibility(false);

let createConnectionId = () => {
  let setOne = (Math.floor(Math.random()*9000) + 1000)
  let setTwo = (Math.floor(Math.random()*9000) + 1000)

  return (setOne + '-' + setTwo)
}

  const onSubmit = () => {

    let userObj = {
      email,
      password,
    }

    try {
      let connectionId: string = createConnectionId()
      firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password).then((result) => {
        firebase.auth().currentUser.updateProfile({
          displayName
        }).catch(function(error) {
          alert(error)
        })
        if(result.user.uid !== null){
          firebase.database().ref('users').child(result.user.uid).set({displayName, connectionId, connections: ''})
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
