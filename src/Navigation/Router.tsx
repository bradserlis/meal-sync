import React, { Component } from "react";
import {
  createSwitchNavigator, 
  createAppContainer,
} from "react-navigation";

import Landing from "../Landing/Landing";
import SignInScreen from './SignInScreen';
import MainTabNavigator from './MainTabNavigator';

const Router = createAppContainer(createSwitchNavigator(
  {
    Landing: Landing,
    SignInScreen: SignInScreen,
    MainTabNavigator: MainTabNavigator
  },
  {
    initialRouteName: "MainTabNavigator"
  }
));

export default Router;
