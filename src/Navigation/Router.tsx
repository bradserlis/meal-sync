import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../Landing/Landing';
import SplashScreen from './SplashScreen';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import Home from '../Profile/containers/Home';

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  )
}

const Stack = createStackNavigator();

const Router = () => {

  if (state.isLoading) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.userToken == null ?
          (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ title: 'Sign In' }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ title: 'Sign Up' }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Home"
              component={Home}
            />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router;
