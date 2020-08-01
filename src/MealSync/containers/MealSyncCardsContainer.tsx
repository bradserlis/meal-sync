import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Title, Headline, Paragraph, Button } from 'react-native-paper';

import { globalStyles, dimensions } from '../../globalStyles'

const MealSyncCardsContainer = ({navigation, props}) => {

  useEffect(() => {
    console.log('update mealsync cards container', navigation.getParam("location"))
  })
  
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.dividerDiv}>
        <Headline> Meal Sync Groups </Headline>
      </View>
    </View>  
  )
}

export default MealSyncCardsContainer;
