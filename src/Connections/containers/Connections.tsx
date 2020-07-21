import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView } from 'react-native'
import { Headline, Paragraph, Button, Title, Dialog, Portal, Text } from 'react-native-paper';
import * as firebase from 'firebase'

import { globalStyles, dimensions } from '../../globalStyles';
import YourConnections from './YourConnections';
import AddConnection from './AddConnection'

const dummyData = [
  {
    username: 'test person',
    connectionId: '1234-5678'
  },
  {
    username: 'test person 2',
    connectionId: '2468-1357'
  },
  {
    username: 'joe pera',
    connectionId: '411'
  },
  {
    username: 'spaghetti',
    connectionId: 'N/A'
  },
  {
    username: 'pasta pizza',
    connectionId: 'tell em'
  }
];

const Connections = ({ navigation }) => {

  const [connectionCards, setConnectionCards] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const [connectionSearchResults, setConnectionSearchResults] = useState('')
  const [userId] = useState(firebase.auth().currentUser.uid)

  let toggleShowDialog = () => {
    setShowDialog(!showDialog)
  }

  let createConnection = (user) => {
    setConnectionSearchResults(user)
    console.log('sanity check - user', connectionSearchResults)
  }

  let addConnectionId = (user) => {
    console.log('adding', connectionSearchResults, 'to', userId)
    toggleShowDialog()
  }

  useEffect(() => {
    setConnectionCards(dummyData)
  }, [connectionCards])

  return(
      <View style={globalStyles.container}>
        <View style={globalStyles.dividerDiv}>
          <Headline> Connections </Headline>
        </View>
        <Portal>
        <Dialog visible={showDialog} onDismiss={toggleShowDialog}>
          <Dialog.Title>Confirm Connection</Dialog.Title>
          <Dialog.Content>
            <Paragraph>You are trying to add user: <Paragraph style={{fontWeight: 'bold'}}>{connectionSearchResults}</Paragraph></Paragraph>
            <Paragraph>To continue, press Connect below</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={{margin: 5}} mode={'outlined'} onPress={addConnectionId}>Connect</Button>
            <Button style={{margin: 5}} mode={'outlined'} onPress={toggleShowDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
        <YourConnections connections={connectionCards}/>
        <AddConnection toggleShowDialog={toggleShowDialog} createConnection={createConnection} />
      </View>
  )
}

export default Connections;
