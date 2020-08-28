import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Headline, Button } from 'react-native-paper';

import { globalStyles } from '../../globalStyles';
import * as firebase from 'firebase';
import { AppContext } from '../../../context/AppContext';

const MealSyncResults = ({ navigation }) => {
    const { currentUserObject } = useContext(AppContext);
    const [mealSyncObject, setMealSyncObject] = useState({})
    const [results, setResults] = useState({})
    const [incompleteResults, setIncompleteResults] = useState(true);

    const getResults = async () => {
        // create the mealsyncobject(room) - key, users, results, location
        await getMealSyncObject();
        // check if all users have responded or not
        if(verifyAllUsersResponded()){
            setIncompleteResults(false)
        }
        else {
            setIncompleteResults(true)
        }
    }

    const getMealSyncObject = () => {
        firebase
        .database()
        .ref('mealsync-groups')
        .orderByChild('users/'+currentUserObject.displayName)
        .equalTo(currentUserObject.connectionId)
        .once('value', snapshot => {
            snapshot.forEach((item) => {
                setMealSyncObject(item.val())
            })    
        })
    }

    const verifyAllUsersResponded = () => {
        //check if all users assigned to that mealsync object...
        for (let [key, val] of Object.entries(mealSyncObject.users)){
            // have a corresponding results object
            if(!mealSyncObject.results.hasOwnProperty(val)){
                return false
            }
        }
        return true
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
                    onPress={getResults}
                >
                    Check Results
                </Button>
                { 
                    incompleteResults ? (
                        <View style={{display: 'flex', flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                            <Title>Sorry, not all users have completed swiping. Try again? </Title>
                        </View>
                    ) :
                    (
                        <View>
                            <Title>Results for Everyone</Title>
                        </View>
                    )
                } 
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
            </View>
        </View>
    )
}

export default MealSyncResults;