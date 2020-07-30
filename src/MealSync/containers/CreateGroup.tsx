import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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

  const resetDialog = () => {
    retrieveConnections();
    setGroupList([])
  }

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

  const itemRendererClickable = (connection) => {
    return (
      <TouchableOpacity
        onPress={() => addConnectionToGroup(connection.item)}
      > 
      <Paragraph style={styles.dialogCards}>{connection.item.username}</Paragraph>
      </TouchableOpacity>
    )
  }

  const itemRendererNonClickable = (connection) => {
    return (
      <View style={{display: 'flex', justifyContent: 'space-around'}}>
        <Paragraph style={styles.dialogCards}>{connection.item.username}</Paragraph>
      </View>
    )
  }

  const retrieveConnections =  () => {
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
        <Dialog style={{width: dimensions.fullWidth/1.1, height: dimensions.fullHeight/1.3}} visible={showDialog} onDismiss={hideDialog}>
        <Dialog.Title> Select Connections for this group </Dialog.Title>
          <Dialog.Content style={{display: 'flex', flex: 1}}>
            <Title> New Group:</Title>
            <FlatList
              contentContainerStyle={{padding: 10}}
              data={groupList}
              keyExtractor={item => item.connectionId}
              renderItem={itemRendererNonClickable}
            />
            <Title>Available Connections:</Title>
              <FlatList
                contentContainerStyle=
                {{padding: 10
                }}
                data={connectionCards}
                renderItem={itemRendererClickable}
                keyExtractor={item => item.connectionId}
              />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={resetDialog}>Reset</Button>
            <Button onPress={hideDialog}>Cancel</Button>
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

const styles = StyleSheet.create({
  dialogCards: {
    textAlign: 'center', 
    alignContent: 'center', 
    justifyContent: 'center', 
    paddingTop: 15, 
    paddingBottom: 15, 
    backgroundColor: 'lightblue', 
    width: dimensions.fullWidth/2.5
  },
})

export default CreateGroup;
