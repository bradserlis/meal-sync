import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, ScrollView, Keyboard } from 'react-native'
import { Headline, Paragraph, Button, Title, Dialog, Portal, Text } from 'react-native-paper';
import * as firebase from 'firebase'

import { globalStyles, dimensions } from '../../globalStyles';
import YourConnections from './YourConnections';
import AddConnection from './AddConnection'
import { AppContext } from '../../../context/AppContext';

const Connections = ({ navigation }) => {
  const { currentUserObject, retrieveUserFromDB } = useContext(AppContext);

  const [connectionCards, setConnectionCards] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [addConnectionDialog, setAddConnectionDialog] = useState(false)
  const [errorDialog, setErrorDialog] = useState(false)
  const [connectionSearchResults, setConnectionSearchResults] = useState('')
  const [userDisplayName] = useState(firebase.auth().currentUser.displayName)

  useEffect(() => {
    retrieveConnections();  
  }, [])

  let toggleShowDialog = () => {
    setShowDialog(!showDialog)
  }

  let closeErrorDialog = () => {
    setShowDialog(!showDialog)
    setErrorDialog(false)
  }

  let createConnection = (user) => {
    setConnectionSearchResults(user.toString())
  }

  let retrieveConnections =  () => {
    let connectionsList = [];
    for(let [key, value] of Object.entries(currentUserObject.connections)){
      connectionsList.push({username: key, connectionId: value})
    }
    setConnectionCards(connectionsList) 
  }

  let checkForConnection = () => {
    return connectionCards.some(connection => connection.connectionId === connectionSearchResults)
  }

  const addConnectionToTemporary = (targetUsername, targetConnectionId) => {
    let connectionsList: Array<Object> = [{
      username: targetUsername,
      connectionId: targetConnectionId 
    }];
    for(let [key, value] of Object.entries(currentUserObject.connections)){
      connectionsList.push({username: key, connectionId: value})
    }
    setConnectionCards(connectionsList);
    retrieveUserFromDB();  
  }

  let addConnectionId = () => {
    setAddConnectionDialog(false)
    if(!checkForConnection()){
      try {
        toggleShowDialog()
        firebase
          .database()
          .ref("users")
          .orderByChild("connectionId")
          .equalTo(connectionSearchResults)
          .limitToFirst(1)
          .once("value", snapshot => {
            if(snapshot.exists() === false){
              alert('Does not exist')
            } else {
              snapshot.forEach(async (connection) => {
              let targetUsername = connection.toJSON().displayName;
              let currentUserQuery = firebase.database().ref("/users/" + currentUserObject.uid).child("connections").child(targetUsername).set(connectionSearchResults)
              let targetUserQuery = firebase.database().ref("/users/" + connection.key).child("connections").child(userDisplayName).set(currentUserObject.connectionId)
              await Promise.all([currentUserQuery, targetUserQuery]);
              Keyboard.dismiss();  
              addConnectionToTemporary(targetUsername, connectionSearchResults);
              })
              alert('Success');
            }
          })
      } 
      catch (e) {
        alert(e)
      } 
    }
    else {
      Keyboard.dismiss();  
      setErrorDialog(true)
    }
  }

  return(
      <View style={globalStyles.container}>
        <View style={globalStyles.dividerDiv}>
          <Headline> Connections </Headline>
        </View>
        <Portal>
        <Dialog visible={showDialog} onDismiss={toggleShowDialog}>
        { addConnectionDialog && (
          <>
            <Dialog.Title>Adding Connection</Dialog.Title>
            <Dialog.Content>
              <Paragraph>You are trying to add user: <Paragraph style={{fontWeight: 'bold'}}>{connectionSearchResults}</Paragraph></Paragraph>
              <Paragraph>To continue, press Connect below</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button style={{margin: 5}} mode={'outlined'} onPress={addConnectionId}>Connect</Button>
              <Button style={{margin: 5}} mode={'outlined'} onPress={toggleShowDialog}>Cancel</Button>
            </Dialog.Actions>
          </>
          )
        }
        { errorDialog && (
          <>
          <Dialog.Title>Oops...</Dialog.Title>
          <Dialog.Content>
            <Paragraph>You are trying to add user that you're already connected with.</Paragraph>
          </Dialog.Content>
            <Dialog.Actions>
              <Button style={{margin: 5}} mode={'outlined'} onPress={closeErrorDialog}>Confirm</Button>
          </Dialog.Actions>
          </>
          )}  
        </Dialog>
      </Portal>
        <YourConnections 
          connections={connectionCards}
        />
        <AddConnection 
          toggleShowDialog={toggleShowDialog} 
          createConnection={createConnection} 
          setAddConnectionDialog={setAddConnectionDialog}
        />
      </View>
  )
}

export default Connections;


// look into updating connectionCards state, to force YourConnections component to re-render
