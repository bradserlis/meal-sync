import React, {useState, useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import { Paragraph, Title, Headline } from 'react-native-paper';

import { globalStyles } from '../../globalStyles'
import ConnectionCard from '../components/ConnectionCard';

const YourConnections = ({connections}) => {

  return (
    <View style={globalStyles.flexed}>
      <Title> Your Connections: </Title>
      <ScrollView>
        {connections.length > 0 && connections.map(user => {
          return <ConnectionCard user={user} key={user.connectionId}/>
        })}
    </ScrollView>
    </View>
  )
}


export default YourConnections;
