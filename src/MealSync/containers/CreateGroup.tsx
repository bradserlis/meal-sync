import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
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
    console.log('addConnectionToGroup', connection);
  }

  useEffect(() => {
    retrieveConnections();
  }, [])

  let itemRenderer = (connection) => {
    return (
      <TouchableOpacity
        onPress={addConnectionToGroup}
      > 
        <Paragraph style={{paddingTop: 15, paddingBottom: 15, backgroundColor: 'lightblue', width: dimensions.fullWidth/2}}>{connection.item.username}</Paragraph>
      </TouchableOpacity>
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
              renderItem={itemRenderer}
            >
            </FlatList>
              <Title>Available Connections</Title>
              <ScrollView contentContainerStyle={{display: 'flex', flex: 2}}>
                <FlatList
                  data={connectionCards}
                  renderItem={itemRenderer}
                >
                </FlatList>
              </ScrollView>
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
