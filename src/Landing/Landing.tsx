import React, {useState} from 'react';
import { Text, View, Button } from 'react-native';

import SignInScreen from '../Navigation/SignInScreen'

const Landing = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Landing Page Text
      </Text>
      <Button
      title='blah'
      onPress={() => navigation.navigate('SignInScreen')}
      >
      </Button>
    </View>
  )
}

export default Landing;
