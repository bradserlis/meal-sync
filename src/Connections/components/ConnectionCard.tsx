import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Paragraph, Surface } from 'react-native-paper';

const ConnectionCard = ({user}) => {
  return(
    <View style={styles.connectionCardStyle}>
      <Surface>
        <Title> {user.username} </Title>
        <Paragraph> Connection ID: {user.connectionId} </Paragraph>
      </Surface>
    </View>
    )
}

const styles = StyleSheet.create({
  connectionCardStyle: {
    padding: 10, 
    width: 350, 
    alignSelf: 'center'
  }
})

export default ConnectionCard;
