import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView } from 'react-native'
import { Headline, Paragraph, Button, Title,  } from 'react-native-paper';

import { globalStyles } from '../../globalStyles';
import YourConnections from './YourConnections';

const dummyData = [
  {
    username: 'test person',
    connectionId: '1234-5678'
  },
  {
    username: 'test person 2',
    connectionId: '2468-1357'
  }
];

const Connections = ({ navigation }) => {

  const [connectionCards, setConnectionCards] = useState([])

  useEffect(() => {
    setConnectionCards(dummyData)
  }, [connectionCards])

  return(
    <View style={globalStyles.container}>
      <View style={globalStyles.dividerDiv}>
        <Headline> Connections </Headline>
      </View>
      <YourConnections connections={connectionCards}/>
    </View>
    )
}

export default Connections;
