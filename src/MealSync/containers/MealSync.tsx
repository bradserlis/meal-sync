import React, { useState, useEffect, useContext } from 'react';
import {
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
  Dialog,
  Snackbar
} from 'react-native-paper';
import * as firebase from 'firebase';
import * as Location from 'expo-location';

import { globalStyles, dimensions, colors } from '../../common/globalStyles'
import SignOutButton from '../../common/SignOutButton';
import MealSyncResultsContainerContainer from './MealSyncResultsContainer';
import MealSyncCardsContainer from './MealSyncCardsContainer';
import { AppContext } from '../../../context/AppContext';

const MealSync = ({ navigation }) => {

  interface IRoom {
    key: String,
    location: Object,
    users: Object,
    results?: Object
  }

  const { currentUserObject } = useContext(AppContext);
  const [showDialog, setShowDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [connectionCards, setConnectionCards] = useState([])
  const [room, setRoom] = useState({})

  useEffect(() => {
    retrieveConnections();
    getLocation();
  }, [])

  useEffect(() => {
    
    async function fetchUserRoom() {
      if(await getUserRoom() !== null){
        setRoom(await getUserRoom());
      }
      else {
        setRoom(null)
      }
    }
    fetchUserRoom();
  }, []);

  const hideDialog = () => setShowDialog(false)
  const openDialog = () => setShowDialog(true)

  const snackbarToggle = () => {
    navigation.navigate('MealSyncResultsContainer')
    setShowSnackbar(!showSnackbar)
  }

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

  const getUserRoom = async () => {
    let userRoomSnapshot = await getUserRoomQuery()
    if (!userRoomSnapshot.exists()) {
      return null
    }
    let dataObj = {};
    userRoomSnapshot.forEach((item) => {
      Object.assign(dataObj, item.val())
      // firebase.database().ref('/mealsync-groups-historical/'+item.key).set(dataObj);
      // removeFormerMealSyncFromDB(item.key);
    })
    return dataObj
  }

  const getUserRoomQuery = () => {
    return firebase
      .database()
      .ref('mealsync-groups')
      .orderByChild('users/' + currentUserObject.displayName)
      .equalTo(currentUserObject.connectionId)
      .once('value')
  }

  const checkUserHasCompletedMealSync = () => {
      // check if there are finished results on this room object
      if (room.results){
        // if there are, return whether current user results are present
        return currentUserObject.connectionId in room['results']
      }
    // fallback to false if no results
    return false
  }

  const shouldShowDialogCheck = () => {
    if(room === null) {
      return openDialog();
    }
    // if no current user results on room...
    if(checkUserHasCompletedMealSync() === false){
      navigation.navigate('MealSyncCardsContainer', {room: room})
    } else {
      // user already has results on room object -- move to results screen
      setShowSnackbar(true);
    };
  };

  const removeFormerMealSyncFromDB = (key: string | null) => {
    firebase.database().ref('/mealsync-groups/' + key).remove()
  }

  const handleCreateGroup = async () => {
    // if room object is null
    if (room === null) {
      // create room
      let roomObj = await createNewGroup();
      // move to swiping screen
      navigation.navigate('MealSyncCardsContainer', { room: roomObj })
    } else {
      // move to swiping screen -- this user does not have results on the existing room
      navigation.navigate('MealSyncCardsContainer', { room: room });
    }
  }

  const createNewGroup = async () => {
    let formattedGroupList = groupList.reduce((acc, connection) => {
      acc[connection.username] = connection.connectionId;
      return acc;
    }, {});
    //add current user to groupList
    Object.assign(formattedGroupList, { [currentUserObject.displayName]: currentUserObject.connectionId })
    let key = firebase.database().ref('/mealsync-groups').push().key;
    let mealSyncObj = {
      key,
      users: formattedGroupList,
      location:
        {
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude
        }
    }
    firebase.database().ref("/mealsync-groups/" + key).set(mealSyncObj);
    return mealSyncObj;
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
      <View style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Paragraph style={styles.dialogCards}>{connection.item.username}</Paragraph>
      </View>
    )
  }

  const retrieveConnections = () => {
    let connectionsList: Array<Object> = [];
    for (const [key, value] of Object.entries(currentUserObject.connections)) {
      connectionsList.push({ username: key, connectionId: value })
    }
    setConnectionCards(connectionsList);
  }

  return (
    <View style={globalStyles.container}>
      <SignOutButton navigation={navigation}/>
      <View style={globalStyles.dividerDiv}>
        <Headline> Meal Sync </Headline>
      </View>
      <Portal>
        <Dialog style={{ width: dimensions.fullWidth / 1.1, height: dimensions.fullHeight / 1.3 }} visible={showDialog} onDismiss={hideDialog}>
          <Dialog.Title> Select Connections for this group </Dialog.Title>
          <Dialog.Content style={{ display: 'flex', flex: 1 }}>
            <Title> New Group:</Title>
            <FlatList
              contentContainerStyle={{ padding: 10 }}
              data={groupList}
              keyExtractor={item => item.connectionId}
              renderItem={itemRendererNonClickable}
            />
            <Title>Available Connections:</Title>
            <FlatList
              contentContainerStyle=
              {{
                padding: 10
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
      <View style={{ display: 'flex', flex: 1 }}>
        <View style={{ flex: 1, padding: 20, minWidth: dimensions.fullWidth / 2, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={shouldShowDialogCheck}
            style={styles.buttonStyle}
          >
            <Title style={[styles.buttonTextStyle, styles.buttonTextEmphasisStyle]}>Start</Title>
            <Title style={styles.buttonTextStyle}>Meal Syncing Together</Title>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('MealSyncResultsContainer')}
          >
            <Title style={[styles.buttonTextStyle, styles.buttonTextEmphasisStyle]}>See</Title>
            <Title style={styles.buttonTextStyle}> Previous Results </Title>
          </TouchableOpacity>
          <Snackbar
            visible={showSnackbar}
            onDismiss={snackbarToggle}
            duration={2500}
          >
          Meal Sync in progress!
          </Snackbar>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: dimensions.fullWidth / 2.5,
    backgroundColor: colors.DARK_BLUE,
    height: 300,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
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
    alignContent: 'space-between',
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
    width: dimensions.fullWidth / 2.5
  },
})

export default MealSync;
