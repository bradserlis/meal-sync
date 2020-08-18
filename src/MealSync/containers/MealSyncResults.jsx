import React from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Headline, Button } from 'react-native-paper';

import { globalStyles } from '../../globalStyles';

const MealSyncResults = ({navigation}) => {

    let getResults = () => {
        alert('hacky results check')
    }

    return(
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
                <View style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                    <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'flex-end'}}>
                        <Button
                            style={{display: 'flex', alignSelf: 'center', alignItems: 'center'}}
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