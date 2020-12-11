import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import * as firebase from 'firebase'

const ClearMealSyncButton = (props) => {

    const getMealSyncRoomQuery = () => firebase.database().ref('mealsync-groups').child(props.mealSyncRoomId).once('value')

    return(
        <View>
            <Button
            mode='contained'
            >
            Clear this MealSync {props.mealSyncRoomId}
            </Button>
        </View>
    )
}

export default ClearMealSyncButton;