import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

export const padding = {
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40
  }

export const fonts = {
  sm: 12,
  md: 18,
  lg: 28,
}

export const colors = {
  DARK_BLUE: 'rgb(0,120,220)',
  DARK_GREY: '#494949',
  ICON_BLUE: 'rgb(0, 120, 220)',
  PURPLE: '#6200ee'
}

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}

export const globalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.md,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth,
    height: '100%'
  },
  flexed: {
   display: 'flex',
   flex: 1,
  },
  footerStyle: {
    display: 'flex',
    flex: 1,
    alignContent: 'flex-end',
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  dividerDiv: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth:.5, 
    borderBottomColor:'grey'
  }
})
