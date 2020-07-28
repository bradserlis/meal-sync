import React from "react";
import {
  createSwitchNavigator, 
  createAppContainer,
} from "react-navigation";

import Landing from "../Landing/Landing";
import SignInScreen from '../Auth/SignInScreen';
import SignUpScreen from '../Auth/SignUpScreen';
import MainTabNavigator from './MainTabNavigator';
import MealSyncGroups from '../MealSync/containers/MealSyncGroups'

const Router = createAppContainer(createSwitchNavigator(
  {
    Landing: Landing,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen,
    MainTabNavigator: MainTabNavigator,
    MealSyncGroups: MealSyncGroups,
  },
  {
    initialRouteName: "Landing"
  }
));

export default Router;
