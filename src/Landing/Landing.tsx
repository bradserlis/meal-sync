import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Headline} from 'react-native-paper';

import * as firebase from 'firebase';

import SignInScreen from '../Navigation/SignInScreen';
import SignUpScreen from '../Navigation/SignUpScreen';
import { globalStyles, dimensions } from '../globalStyles'

const Landing = ({navigation}) => {

  const handleDevSignIn = () => {
    firebase.auth().signInWithEmailAndPassword('anotherfake@abc.com', 'Password123').then( (result) => {
      navigation.navigate('Home')
    })
  }

  return (
    <View style={[globalStyles.container, styles.centered]}>
      <View style={styles.box}>
        <Headline style={{alignSelf:'center', marginBottom: 20}}>
          Meal Sync
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
        <Button
          style={{marginTop:20}}
          mode='outlined'
          onPress={handleDevSignIn}
        >
        Dev Sign In
        </Button>
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
