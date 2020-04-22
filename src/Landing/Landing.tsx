import React, {useState} from 'react';

import { Text, View, Button } from 'react-native';

const Landing = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Landing Page Text
      </Text>
      <Button
      title='blah'
      onPress={() => navigation.navigate('Details')}
      >
      </Button>
    </View>
  )
}

export default Landing;
