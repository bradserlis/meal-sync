import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Headline, Paragraph, Title, Button, Surface } from 'react-native-paper';

import { globalStyles, dimensions } from '../../globalStyles'

const MealSync = ({navigation}) => {
  return(
    <View style={globalStyles.container}>
      <View style={globalStyles.dividerDiv}>
        <Headline> Meal Sync </Headline>
      </View>
      <View style={{display: 'flex', flex: 1}}>
      <View style={{flex: 1, padding: 20, minWidth: dimensions.fullWidth/2, flexDirection:'row', justifyContent:'space-between'}}>
      <TouchableOpacity
        style={styles.buttonStyle}
      >
        <Title style={[styles.buttonTextStyle, styles.buttonTextEmphasisStyle]}>Use Previous</Title>
        <Title style={styles.buttonTextStyle}> Meal Sync Group</Title>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
      >
      <Title style={[styles.buttonTextStyle, styles.buttonTextEmphasisStyle]}>Create New </Title>
      <Title style={styles.buttonTextStyle}>Meal Sync Group</Title>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


          // <Button
          //   labelStyle={styles.buttonStyle}
          //   mode='contained'
          //   onPress={() => navigation.navigate('SignInScreen')}
          // >
          // Use Previous Meal Sync Group
          // </Button>
          // <Button
          //   labelStyle={styles.buttonStyle}
          //   mode='contained'
          //   onPress={() => navigation.navigate('SignUpScreen')}
          // >
          // Create Meal Sync Group
          // </Button>

const styles = StyleSheet.create({
  centered: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignContent:'space-between',
    justifyContent: 'center', 
  },
  buttonStyle: {
    width: dimensions.fullWidth/2.5,
    // maxWidth: dimensions.fullWidth/2.5, 
    backgroundColor:'skyblue', 
    height: 300, 
    justifyContent: 'center', 
    alignSelf:'center', 
    alignItems: 'center',
    borderStyle:'solid',
    borderWidth: 3,
    borderColor: 'rgb(255, 240, 240)'
  },
  buttonTextStyle: {
    padding: 10,
    color: 'rgb(240, 240, 240)', 
    textAlign: 'center',
    fontSize: 25
  },
  buttonTextEmphasisStyle: {
    color: 'black',
  } 
})

export default MealSync;
