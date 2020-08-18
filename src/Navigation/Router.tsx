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
import MealSyncCardsContainer from '../MealSync/containers/MealSyncCardsContainer'
import MealSyncResults from '../MealSync/containers/MealSyncResults'

const Router = createAppContainer(createSwitchNavigator(
  {
    Landing,
    SignInScreen,
    SignUpScreen,
    MainTabNavigator,
    MealSyncGroups,
    MealSyncCardsContainer,
    MealSyncResults
  },
  {
    initialRouteName: "Landing",
  }
));

export default Router;
