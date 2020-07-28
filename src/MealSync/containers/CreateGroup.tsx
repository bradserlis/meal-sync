import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Headline, Title, Paragraph, Button } from 'react-native-paper';

import {globalStyles} from '../../globalStyles'

const CreateGroup = ({navigation}) => {

  return(
    <View style={globalStyles.container}>
      <View style={globalStyles.dividerDiv}>
        <Headline> Create Meal Sync Groups </Headline>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}} >
        <Button
          mode={'contained'}
        >
        Get Started
        </Button>
        <Button
          onPress={() => navigation.navigate('MealSync')}
          mode={'contained'}
        >
        Go Back
        </Button>
      </View>
    </View>
  )
}

export default CreateGroup;
