import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Headline } from 'react-native-paper';
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
            alert('No user found. Please check your details and try again')
            break;
          case 'auth/wrong-password':
            alert('Your password is incorrect')
            break;
          case 'auth/invalid-email':
            alert('The email entered is not formatted correctly - "me@something.com"')
            break;
          case 'auth/user-disabled':
            alert('Your account is currently disabled')
            break;
          default:
            alert('Something has gone wrong. Please try again.')
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
    </View>
  );
}

export default SignInScreen;
