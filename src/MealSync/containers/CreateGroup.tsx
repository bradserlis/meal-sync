import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity, } from 'react-native';
import { Headline, Title, Portal, Paragraph, Button, Dialog, Radio } from 'react-native-paper';

import { globalStyles, dimensions } from '../../globalStyles'
import YourConnections from '../../Connections/containers/YourConnections';
import * as firebase from 'firebase';

const CreateGroup = ({navigation}) => {

  const [showDialog, setShowDialog] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [connectionCards, setConnectionCards] = useState([])
  const [userId] = useState(firebase.auth().currentUser.uid);

  const hideDialog = () => setShowDialog(false)

  const openDialog = () => setShowDialog(true)

  let createNewGroup = () => {
  }

  const addConnectionToGroup = (connection) => {
    setGroupList([...groupList, connection]);
    let arr = connectionCards.filter((card) => card.connectionId !== connection.connectionId)
    setConnectionCards(arr)
  }

  useEffect(() => {
    retrieveConnections();
  }, [])

  let itemRendererClickable = (connection) => {
    return (
      <TouchableOpacity
        onPress={() => addConnectionToGroup(connection.item)}
      > 
      <Paragraph style={{paddingTop: 15, paddingBottom: 15, backgroundColor: 'lightblue', width: dimensions.fullWidth/2}}>data</Paragraph>
      </TouchableOpacity>
    )
  }

  let itemRendererNonClickable = (connection) => {
    return (
      <View>
        <Paragraph style={{paddingTop: 15, paddingBottom: 15, backgroundColor: 'lightblue', width: dimensions.fullWidth/2}}>data</Paragraph>
      </View>
    )
  }

  let retrieveConnections =  () => {
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
        <Headline> Create Meal Sync Groups </Headline>
      </View>
      <Portal>
        <Dialog style={{width: dimensions.fullWidth/1.1, height: dimensions.fullHeight/2}} visible={showDialog} onDismiss={hideDialog}>
        <Dialog.Title> Select Connections for this group </Dialog.Title>
          <Dialog.Content style={{display: 'flex', flex: 1}}>
            <Title> To be added: </Title>
            <FlatList
              data={groupList}
              keyExtractor={item => item.connectionId}
              renderItem={itemRendererNonClickable}
            >
            </FlatList>
              <Title>Available Connections</Title>
                <FlatList
                  data={connectionCards}
                  renderItem={itemRendererClickable}
                  keyExtractor={item => item.connectionId}
                >
                </FlatList>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end'}} >
        <Button
          onPress={openDialog}
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


      // {
      //   connectionCards && connectionCards.map((connection) => {
      //     <Paragraph> {connection.username} </Paragraph>
      //   })
      // }

export default CreateGroup;
