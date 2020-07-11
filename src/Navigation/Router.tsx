import React, { Component } from "react";
import {
  createSwitchNavigator, 
  createAppContainer,
} from "react-navigation";

import Landing from "../Landing/Landing";
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
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
