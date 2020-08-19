import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Headline, Button } from 'react-native-paper';

import { globalStyles } from '../../globalStyles';
import * as firebase from 'firebase';
import { AppContext } from '../../../context/AppContext';

const MealSyncResults = ({ navigation }) => {
    const { currentUserObject } = useContext(AppContext);

    let getResults = () => {
        console.log('sanity check - currentUserObject', currentUserObject.connectionId)
        firebase
        .database()
        .ref('mealsync-groups')
        .orderByChild('users/'+currentUserObject.displayName)
        .equalTo(currentUserObject.connectionId)
        .once('value', snapshot => {
            console.log('snapshot!', snapshot)    
        })
    }

    return (
        <View>
            <View style={globalStyles.container}>
                <View style={globalStyles.dividerDiv}>
                    <Headline> Results </Headline>
                </View>
                <Button
                    mode='outlined'
                    dark={true}
                    onPress={getResults}
                >
                    Check Results
                </Button>
                <View style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'flex-end' }}>
                        <Button
                            style={{ display: 'flex', alignSelf: 'center', alignItems: 'center' }}
                            mode='outlined'
                            dark={true}
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