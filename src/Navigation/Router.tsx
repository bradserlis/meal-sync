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
import CreateGroup from '../MealSync/containers/CreateGroup'

const Router = createAppContainer(createSwitchNavigator(
  {
    Landing: Landing,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen,
    MainTabNavigator: MainTabNavigator,
    MealSyncGroups: MealSyncGroups,
    CreateGroup: CreateGroup,
  },
  {
    initialRouteName: "Landing"
  }
));

export default Router;
