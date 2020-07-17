import React from "react";
import {
  createSwitchNavigator, 
  createAppContainer,
} from "react-navigation";

import Landing from "../Landing/Landing";
import SignInScreen from '../Auth/SignInScreen';
import SignUpScreen from '../Auth/SignUpScreen';
import MainTabNavigator from './MainTabNavigator';

const Router = createAppContainer(createSwitchNavigator(
  {
    Landing: Landing,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen,
    MainTabNavigator: MainTabNavigator
  },
  {
    initialRouteName: "Landing"
  }
));

export default Router;
