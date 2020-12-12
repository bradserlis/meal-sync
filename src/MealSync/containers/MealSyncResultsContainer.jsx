import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import {
Paragraph,
Title,
Headline,
Button, 
Dialog, 
Portal } from 'react-native-paper';

import MealSyncResults from '../components/MealSyncResults';
import { globalStyles } from '../../common/globalStyles';
import * as firebase from 'firebase';
import { AppContext } from '../../../context/AppContext';

const MealSyncResultsContainer = ({ navigation }) => {
    const { currentUserObject } = useContext(AppContext);
    const [mealSyncObject, setMealSyncObject] = useState({})
    const [mealSyncKey, setMealSyncKey] = useState('');
    const [results, setResults] = useState([])
    const [incompleteResults, setIncompleteResults] = useState(true);
    const [showDialog, setShowDialog] = useState(false)

    useEffect(() => {
        setMealSyncResults();
    }, []);

    let toggleShowDialog = () => setShowDialog(!showDialog)
      
    
    const getMealSyncQuery = () => {
        return firebase
            .database()
            .ref('mealsync-groups')
            .orderByChild('users/' + currentUserObject.displayName)
            .equalTo(currentUserObject.connectionId)
            .once('value')
    }

    const setMealSyncResults = async () => {
        let mealSyncQuerySnapshot = await getMealSyncQuery();
        let dataObj = {};
        mealSyncQuerySnapshot.forEach((item) => {
            Object.assign(dataObj, item.val())
        })
        setSyncedResults(dataObj);
    }

    const verifyAllUsersResponded = (mealSyncObject) => {
        //check if all users assigned to that mealsync object...
        for (let [key, val] of Object.entries(mealSyncObject.users)) {
            // have a corresponding results object
            if (!mealSyncObject.results.hasOwnProperty(val)) {
                return false
            }
        }
        return true
    }

    const setSyncedResults = (mealSyncObject) => {
        if(!verifyAllUsersResponded(mealSyncObject)){
            return setResults(null)
        }
        let restaurantVotes = Object.values(mealSyncObject.results);
        let aggregateRestaurantVotes = restaurantVotes.reduce((aggregateRestaurantVotes, userRestaurantVotes) => {
            for (let restaurant in userRestaurantVotes) {
                aggregateRestaurantVotes[restaurant] = aggregateRestaurantVotes[restaurant] && userRestaurantVotes[restaurant];
            }
            return aggregateRestaurantVotes;
        })
        setMealSyncKey(mealSyncObject.key)
        let restarauntNames = Object.keys(aggregateRestaurantVotes);
        let restaurantPicks = restarauntNames.filter(restaurantName => aggregateRestaurantVotes[restaurantName])
        setResults(restaurantPicks)
    }

    const clearMealSync = () => {
        firebase.database().ref('mealsync-groups').child(mealSyncKey).remove().then(() => {
            navigation.navigate('MealSync');
        })
    }
    
    return (
        <View>
            <View style={globalStyles.container}>
                <View style={globalStyles.dividerDiv}>
                    <Headline> Results </Headline>
                </View>
                <Button
                    mode='contained'
                    dark={true}
                    onPress={setMealSyncResults}
                >
                    Check Results
                </Button>
                <MealSyncResults toggleShowDialog={toggleShowDialog} results={results} />
                <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                        <Button
                            style={{ display: 'flex', alignSelf: 'center', alignItems: 'center' }}
                            mode='contained'
                            onPress={() => navigation.navigate('MealSync')}
                        >
                            Go Back
                        </Button>
                    </View>
                </View>
                <Portal>
                    <Dialog visible={showDialog} onDismiss={toggleShowDialog}>
                            <>
                                <Dialog.Title>Remove Meal Sync Results?</Dialog.Title>
                                <Dialog.Content>
                                    <Paragraph>In order to be able to create a new Meal Sync, you will need to clear these results. Press the <Paragraph style={{fontWeight: 'bold'}}>Clear Results </Paragraph>button below if you are finished with these results </Paragraph>
                                </Dialog.Content>
                                <Dialog.Actions>
                                    <Button style={{margin: 5}} mode={'outlined'} onPress={null}>Clear Results</Button>
                                    <Button style={{margin: 5}} mode={'outlined'} onPress={() => navigation.navigate('MealSync')}>Keep Results</Button>
                                </Dialog.Actions>
                            </>
                    </Dialog>
                </Portal>
            </View>
        </View>
    )
}

export default MealSyncResultsContainer;
