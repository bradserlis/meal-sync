import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Headline, Button } from 'react-native-paper';

import { globalStyles } from '../../common/globalStyles';
import ClearMealSyncButton from './ClearMealSyncButton';


const MealSyncResults = (props) => {

    if (!props.results) {
        return (
            <View style={{ display: 'flex', flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                <Title> One or more users have not finished </Title>
            </View>
        )
    } else if (props.results.length) {
        return (
            <View>
                <Title>Results for Everyone</Title>
                {
                    props.results.map((restaurant, i) => {
                        return <Paragraph key={i}> <Paragraph style={{fontWeight: 'bold'}}> -{restaurant} </Paragraph></Paragraph>
                    })
                }
                <Paragraph style={{marginTop: 10, marginBottom: 10 }}>In order to be able to create a new Meal Sync, you will need to clear these results. Press the Clear button below when you are finished with these results </Paragraph> 
                <ClearMealSyncButton toggleShowDialog={props.toggleShowDialog} />
            </View>
        )
    }
    else if (!props.results.length) {
        return <View>
            <Title> No Meal Sync is in progress </Title>
        </View>
    }
}

export default MealSyncResults;