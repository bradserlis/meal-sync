import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Paragraph, Title, Headline } from 'react-native-paper';

import { globalStyles, dimensions } from '../../common/globalStyles'
import ConnectionCard from '../components/ConnectionCard';

const YourConnections = ({connections}) => {
  return (
    <View style={globalStyles.flexed}>
      <Title> Your Connections: </Title>
      <ScrollView>
        {connections && connections.map(user => {
          return <ConnectionCard user={user} key={user.connectionId}/>
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  thinBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    height: dimensions.fullHeight 
  }
})

export default YourConnections;
