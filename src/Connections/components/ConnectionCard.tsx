import React from 'react';
import { View } from 'react-native';
import { Title, Paragraph, Surface } from 'react-native-paper';

const ConnectionCard = ({user}) => {
  console.log('what is user', user)
  return(
    <View style={{padding: 10, width: 350, alignSelf: 'center'}}>
      <Surface>
        <Title> {user.username} </Title>
        <Paragraph> Connection ID: {user.connectionId} </Paragraph>
      </Surface>
    </View>
    )
}

export default ConnectionCard;
