import React from 'react';
import { View } from 'react-native'
import { Headline, Paragraph, Button } from 'react-native-paper';

import { globalStyles } from '../../globalStyles'

const MealSync = ({navigation}) => {
  return(
    <View style={globalStyles.container}>
      <View style={globalStyles.dividerDiv}>
        <Headline> Meal Sync </Headline>
      </View>
    </View>
    )
}

export default MealSync;
