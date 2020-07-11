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
        if(result.user.uid){
          firebase.database().ref('users').child(result.user.uid).child('displayName').set(displayName)
          alert('it worketh')
        }
      })
    }
    catch(e){
      alert('it faileth')
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
          mode={'contained'} 
          onPress={onSubmit}
        >
        Sign Up
        </Button>
    </View>
    )
}

export default SignUpScreen;
