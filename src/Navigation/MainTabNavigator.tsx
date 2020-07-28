import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../Profile/containers/Home';
import Connections from '../Connections/containers/Connections';
import MealSync from '../MealSync/containers/MealSync';

export default (MainTabNavigator = createBottomTabNavigator(
  {
    Home,
    Connections,
    MealSync,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOptions: {
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        activeTintColor: 'rgb(0, 120, 220)',
        inactiveTintColor: '#444',
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        const color = focused ? 'rgb(0,120,220)' : '#444'
        if (routeName === "Home") {
          iconName = "ios-contact";
          backBehavior: "none";
        } else if (routeName === "Connections") {
          iconName = "md-contacts";
        } else if (routeName === "MealSync") {
          iconName = "ios-restaurant";
        } 
        return <Ionicons name={iconName} size={28} color={color} />;
      }
    }),
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: false,
    backBehavior: "true"
  }
));
