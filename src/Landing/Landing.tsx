import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Headline } from 'react-native-paper';
import firebase from "firebase/app"
import 'firebase/auth';
import 'firebase/database';

import SignInScreen from '../Navigation/SignInScreen';
import SignUpScreen from '../Navigation/SignUpScreen';
import { globalStyles, dimensions } from '../common/globalStyles'
import { AppContext } from '../../context/AppContext';

const Landing = ({navigation}) => {

  useEffect( () => {
    registerForPushNotificationsAsync()
  }, [])

  const { 
    registerForPushNotificationsAsync,
    expoPushToken 
  } = useContext(AppContext);

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
