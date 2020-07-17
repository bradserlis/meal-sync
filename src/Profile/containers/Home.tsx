import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { 
  Paragraph, 
  Title, 
  Divider, 
  Headline, 
  Text, 
  Button, 
  Surface
  } from 'react-native-paper'
import * as firebase from 'firebase'

import {globalStyles} from '../../globalStyles';

const Home = (props) => {

  const [userId] = useState(firebase.auth().currentUser.uid)
  const [connectionId, setConnectionId] = useState('')
  
  useEffect(() => {
    firebase
    .database()
    .ref("/users/" + userId)
    .child("connectionId")
    .once("value")
    .then(snapshot => {
      setConnectionId(snapshot.val())
    })
  },[connectionId])
  
  const {navigate} = props.navigation;

  return(
    <View style={globalStyles.container}>
    <View style={globalStyles.dividerDiv}>
      <Headline> Home </Headline>
    </View>
      <Paragraph> Now that you are logged in, let's start swiping on food... </Paragraph>
      <View style={globalStyles.footerStyle}>
      <Surface style={styles.surface}>
        <Paragraph style={{fontSize: 18, fontWeight: '400'}}> Your Connection ID: <Paragraph style={{fontWeight:'bold', fontSize: 18, letterSpacing: 2.2}}> {connectionId} </Paragraph></Paragraph>
        </Surface>
      </View>
    </View>
    )
}

const styles = StyleSheet.create({
  surface: {
    padding: 15,
    elevation: 4,
  },
});

export default Home;
