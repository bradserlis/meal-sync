import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import * as firebase from 'firebase'

const ClearMealSyncButton = (props) => {

    return(
        <View>
            <Button
            mode='contained'
            color='red'
            onPress={props.toggleShowDialog}
            >
            Clear this MealSync
            </Button>
        </View>
    )
}

export default ClearMealSyncButton;