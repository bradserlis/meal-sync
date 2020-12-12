import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Headline, Button } from 'react-native-paper';

import { globalStyles } from '../../common/globalStyles';


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