import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import authContext from '../../App';

const SignInScreen = ({navigation}) => {

  let handleSignIn = () => {
    alert('whoo you signed in...sorta')
    navigation.navigate('Home')
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={handleSignIn} />
    </View>
  );
}

export default SignInScreen;
