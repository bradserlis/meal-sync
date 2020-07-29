import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Title, Headline, Paragraph, Button } from 'react-native-paper';

import {globalStyles} from '../../globalStyles'
import YourConnections from '../../Connections/containers/YourConnections';
import * as firebase from 'firebase'

const MealSyncGroups = ({navigation}) => {
  
  const [connectionCards, setConnectionCards] = useState([]);
  const [userId] = useState(firebase.auth().currentUser.uid);

  useEffect(() => {
    retrieveConnections()
  }, [])

  let retrieveConnections =  async () => {
    let connectionsList = [];
     firebase.database().ref('/users/'+userId).child('connections').once('value', (snapshot) => {
      snapshot.forEach((item) =>{
        connectionsList.push({username: item.key, connectionId: item.toJSON()})
      })
    setConnectionCards(connectionsList)
    })
  }

  return(
    <View style={globalStyles.container}>
      <View style={globalStyles.dividerDiv}>
        <Headline> Meal Sync Groups </Headline>
      </View>
      <YourConnections connections={connectionCards} />
      <View style={{display: 'flex', flexDirection: 'row', alignSelf: 'center'}} >
        <Button
          mode={'contained'}
        >
        Get Started
        </Button>
        <Button
          onPress={() => navigation.navigate('MealSync')}
          mode={'contained'}
        >
        Go Back
        </Button>
      </View>
    </View>
  )
}

export default MealSyncGroups;
