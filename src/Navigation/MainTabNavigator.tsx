import React from 'react';
import Icon from 'react-native'
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Home from '../Profile/containers/Home';
import Router from "./Router";

export default (MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      title: "Profile"
    },
    // Nearby: {
    //   screen: Nearby,
    //   title: "Nearby"
    // },
    // Connections: {
    //   screen: Connections
    // },
    // Messages: {
    //   screen: Messages
    // }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "ios-contact";
          backBehavior: "none";
        } /*else if (routeName === "Connections") {
          iconName = "ios-chatboxes";
        } else if (routeName === "Nearby") {
          iconName = "ios-people";
        } else if (routeName === "Messages") {
          iconName = "ios-chatbubbles";
        }*/
        return <Icon name={iconName} size={2} style={{ marginBottom: -10.5 }} />;
      }
    }),
    // tabBarComponent: react-navigation-tabs,
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: false,
    backBehavior: "none"
  }
));
