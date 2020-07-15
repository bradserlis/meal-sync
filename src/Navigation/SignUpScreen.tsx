import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Headline, TextInput, Button } from 'react-native-paper';
import * as firebase from 'firebase';

import { globalStyles } from '../globalStyles'

const SignUpScreen = ({navigation}) => {
const [email, setEmail] = useState('');
const [displayName, setDisplayName] = useState('')
const [password, setPassword] = useState('');

  const onSubmit = () => {

    let userObj = {
      email,
      password,
    }

    try {
      firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password).then((result) => {
        if(result.user.uid !== null){
          firebase.database().ref('users').child(result.user.uid).child('displayName').set(displayName)
        }
      }).catch((error) => {
          switch(error.code){
            case 'auth/email-already-in-use':
              alert('Email address is already in use. Sign in instead!')
              break;
            case 'auth/weak-password':
              alert(error.message)
              break;
            case 'auth/invalid-email':
              alert('The email entered is not formatted correctly - "me@something.com"')
              break;
            default:
              alert('Something has gone wrong. Please try again.')
              break;
          }
        })
    }
    catch(e){
      console.log(e)
    }
  }

    return(
      <View style={globalStyles.container}>
        <Headline>Sign Up</Headline>
        <TextInput
          label='Enter Email'
          mode={'outlined'}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          > 
        </TextInput>
        <TextInput
          label='Enter a Display Name'
          mode={'outlined'}
          placeholder='Display Name'
          value={displayName}
          onChangeText={setDisplayName}
          > 
        </TextInput>
        <TextInput
          label='Enter a Password'
          mode={'outlined'}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          > 
        </TextInput>
        <Button
          style={{marginTop: 10}}
          mode={'contained'} 
          onPress={onSubmit}
        >
        Sign Up
        </Button>
    </View>
    )
}

export default SignUpScreen;
