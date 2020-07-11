import React from 'react';
import { Text, View, Button } from 'react-native';

import SignInScreen from '../Navigation/SignInScreen';
import SignUpScreen from '../Navigation/SignUpScreen';

const Landing = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Landing Page Text
      </Text>
      <Button
      title='signin'
      onPress={() => navigation.navigate('SignInScreen')}
      >
      </Button>
      <Button
        title='signup'
        onPress={() => navigation.navigate('SignUpScreen')}
      >
      </Button>
    </View>
  )
}

export default Landing;
