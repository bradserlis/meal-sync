import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph, Title, Divider, Headline, Text, Button} from 'react-native-paper'
import * as firebase from 'firebase'

import {globalStyles} from '../../globalStyles';

const Home = (props) => {

  const [randomId, setRandomId] = useState('')
  
  const {navigate} = props.navigation;
  // let connectionId = firebase.auth().currentUser.uid

  const assignRandomId = () => {
    setRandomId(Math.floor(Math.random()*900000) + 100000)
  }

  return(
    <View style={globalStyles.container}>
    <View style={globalStyles.dividerDiv}>
      <Headline> Home </Headline>
    </View>
      <Paragraph> Now that you are logged in, let's start swiping on food... </Paragraph>
      <Button
        onPress={assignRandomId}
        mode={'contained'}
        >
        Create test user
      </Button>
      <View style={globalStyles.footerStyle}>
        <Paragraph> Your Connection ID: {randomId}</Paragraph>
      </View>
    </View>
    )
}

export default Home;
