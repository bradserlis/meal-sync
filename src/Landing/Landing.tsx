import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Headline} from 'react-native-paper';

import SignInScreen from '../Navigation/SignInScreen';
import SignUpScreen from '../Navigation/SignUpScreen';
import { globalStyles, dimensions } from '../globalStyles'

const Landing = ({navigation}) => {
  return (
    <View style={[globalStyles.container, styles.centered]}>
      <View style={styles.box}>
        <Headline style={{alignSelf:'center', marginBottom: 20}}>
          Landing Page Text
        </Headline>
        <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <Button
            mode='contained'
            onPress={() => navigation.navigate('SignInScreen')}
          >
          Sign In
          </Button>
          <Button
            mode='contained'
            onPress={() => navigation.navigate('SignUpScreen')}
          >
          Sign Up
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  }, 
  box: {
    minWidth: dimensions.fullWidth/2,
  }
})

export default Landing;
