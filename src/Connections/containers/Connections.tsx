import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView } from 'react-native'
import { Headline, Paragraph, Button, Title, Dialog, Portal, Text } from 'react-native-paper';
import * as firebase from 'firebase'

import { globalStyles, dimensions } from '../../globalStyles';
import YourConnections from './YourConnections';
import AddConnection from './AddConnection'

const Connections = ({ navigation }) => {

  const [connectionCards, setConnectionCards] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [addConnectionDialog, setAddConnectionDialog] = useState(false)
  const [errorDialog, setErrorDialog] = useState(false)
  const [connectionSearchResults, setConnectionSearchResults] = useState('')
  const [userId] = useState(firebase.auth().currentUser.uid)
  const [userDisplayName] = useState(firebase.auth().currentUser.displayName)
  const [userConnectionId, setUserConnectionId] = useState('')

  useEffect(() => {
    retrieveUserConnectionId();
  }, [])

  useEffect( () => {
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

  let retrieveUserConnectionId = () => {
     firebase
    .database()
    .ref("/users/" + userId)
    .child("connectionId")
    .once("value", snapshot => {
      setUserConnectionId(snapshot.val())
    })
  }

  let retrieveConnections =  async () => {
    let connectionsList = [];
     firebase.database().ref('/users/'+userId).child('connections').once('value', (snapshot) => {
      snapshot.forEach((item) =>{
        connectionsList.push({username: item.key, connectionId: item.toJSON()})
      })
    setConnectionCards(connectionsList)
    })
  }

  let checkForConnection = () => {
    return connectionCards.some(connection => connection.connectionId === connectionSearchResults)
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
          .on("value", snapshot => {
            if(snapshot.exists() === false){
              alert('Does not exist')
            } else {
              snapshot.forEach(async (connection) => {
              let currentUserQuery = firebase.database().ref("/users/" + userId).child("connections").child(connection.toJSON().displayName).set(connectionSearchResults)
              let targetUserQuery = firebase.database().ref("/users/" + connection.key).child("connections").child(userDisplayName).set(userConnectionId)
              await Promise.all([currentUserQuery, targetUserQuery]);  
              alert('Success');
              })
            }
          })
      } 
      catch (e) {
        alert(e)
      } 
    }
    else {
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
        <YourConnections connections={connectionCards} />
        <AddConnection 
          toggleShowDialog={toggleShowDialog} 
          createConnection={createConnection} 
          setAddConnectionDialog={setAddConnectionDialog}
        />
      </View>
  )
}

export default Connections;
