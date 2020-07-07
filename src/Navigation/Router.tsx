import React, { Component } from "react";
import {
  createSwitchNavigator
} from "react-navigation";

import App from "../../App";
import MessagesIndividual from "../../messages/components/MessagesIndividual";
import { Text, View, ImageBackground } from "react-native";

const Router = createSwitchNavigator(
  {
    Landing: Landing,
    // MainTabNavigator: MyNavigator
  },
  {
    initialRouteName: "Landing"
  }
);

export default Router;
