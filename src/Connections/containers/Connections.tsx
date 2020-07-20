import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView, Text } from 'react-native'
import { Headline, Paragraph, Button, Title,  } from 'react-native-paper';

import { globalStyles } from '../../globalStyles';
import ConnectionCard from '../components/ConnectionCard'

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

const Connections = ({navigation}) => {

  const [connectionCards, setConnectionCards] = useState([])

  useEffect(() => {
    setConnectionCards(dummyData)
  })

  return(
    <View style={globalStyles.container}>
      <View style={globalStyles.dividerDiv}>
        <Headline> Connections </Headline>
      </View>
      <Title> Your Connections: </Title>
      <ScrollView>
      {connectionCards.map(user => {
        return <ConnectionCard user={user}/>
      })}
      </ScrollView>
    </View>
    )
}

export default Connections;
