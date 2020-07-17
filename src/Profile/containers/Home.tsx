import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Title, Divider, Headline, Text, Button} from 'react-native-paper'
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
        <Paragraph> Your Connection ID: {connectionId}</Paragraph>
      </View>
    </View>
    )
}

export default Home;
