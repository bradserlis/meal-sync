import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import * as firebase from 'firebase';

import authContext from '../../App';
import { globalStyles } from '../globalStyles'

const SignInScreen = ({navigation}) => {

  let handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
      alert('signed in properly!');
      navigation.navigate('Home')
    })
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleSignIn} 
      >
      Sign In
      </Button>
    </View>
  );
}

export default SignInScreen;
