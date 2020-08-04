import React, { useState, useEffect } from 'react';
import 
{ 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { 
  Headline, 
  Paragraph, 
  Title, 
  Button, 
  Surface, 
  Portal, 
  Dialog 
} from 'react-native-paper';
import * as firebase from 'firebase';
import * as Location from 'expo-location';

import { globalStyles, dimensions } from '../../globalStyles'
import MealSyncGroups from './MealSyncGroups';
import MealSyncCardsContainer from './MealSyncCardsContainer';

const MealSync = ({navigation}) => {

  const [showDialog, setShowDialog] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [room, setRoom] = useState({});
  const [groupList, setGroupList] = useState([]);
  const [connectionCards, setConnectionCards] = useState([])
  const [userId] = useState(firebase.auth().currentUser.uid);

  const hideDialog = () => setShowDialog(false)

  const openDialog = () => setShowDialog(true)
  
  useEffect(() => {
    retrieveConnections();
    getLocation();
  }, [])

  const resetDialog = () => {
    retrieveConnections();
    setGroupList([])
  }

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
        alert("Permission to access location was denied")     
    }
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  }

  let createNewGroup = async () => {
    let formattedGroupList = groupList.reduce((acc, connection) => {
      acc[connection.connectionId] = connection.username;
      return acc; 
    }, {});
    let mealSyncObj = {
      users: formattedGroupList,
      location: 
      {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude
      }
    }
    firebase.database().ref("mealsync-groups").push(mealSyncObj);
    return mealSyncObj;
  }

  const handleCreateGroup = async () => {
    let roomObj = await createNewGroup();
    navigation.navigate('MealSyncCardsContainer', {room: roomObj})
    alert('Added Group');
  }

  const addConnectionToGroup = (connection) => {
    setGroupList([...groupList, connection]);
    let arr = connectionCards.filter((card) => card.connectionId !== connection.connectionId)
    setConnectionCards(arr)
  }


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
        <Headline> Meal Sync </Headline>
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
            <Button onPress={handleCreateGroup}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{display: 'flex', flex: 1}}>
      <View style={{flex: 1, padding: 20, minWidth: dimensions.fullWidth/2, flexDirection:'row', justifyContent:'space-between'}}>
      <TouchableOpacity
        onPress={openDialog}
        style={styles.buttonStyle}
      >
      <Title style={[styles.buttonTextStyle, styles.buttonTextEmphasisStyle]}>Start</Title>
      <Title style={styles.buttonTextStyle}>Meal Syncing Together</Title>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('MealSyncGroups')}
      >
        <Title style={[styles.buttonTextStyle, styles.buttonTextEmphasisStyle]}>See</Title>
        <Title style={styles.buttonTextStyle}> Previous Results </Title>
      </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: dimensions.fullWidth/2.5,
    backgroundColor:'skyblue', 
    height: 300, 
    justifyContent: 'center', 
    alignSelf:'center', 
    alignItems: 'center',
    borderStyle:'solid',
    borderWidth: 3,
    borderColor: 'rgb(255, 240, 240)'
  },
  buttonTextStyle: {
    padding: 10,
    color: 'rgb(240, 240, 240)', 
    textAlign: 'center',
    fontSize: 25
  },
  buttonTextEmphasisStyle: {
    color: 'black',
  }, 
  centered: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignContent:'space-between',
    justifyContent: 'center', 
  },
  dialogCards: {
    textAlign: 'center', 
    alignContent: 'center', 
    justifyContent: 'center',
    marginBottom: 10, 
    paddingTop: 15, 
    paddingBottom: 15, 
    backgroundColor: 'lightblue', 
    width: dimensions.fullWidth/2.5
  },
})

export default MealSync;
