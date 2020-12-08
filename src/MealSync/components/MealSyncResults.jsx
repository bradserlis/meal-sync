import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Headline, Button } from 'react-native-paper';

import { globalStyles } from '../../common/globalStyles';

const MealSyncResults = (props) => {

    if (!props.results) {
        return (
            <View style={{ display: 'flex', flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                <Title> They aren't done </Title>
            </View>
        )
    } else if (props.results.length) {
        return (
            <View>
                <Title>Results for Everyone</Title>
                {
                    props.results.map((restaurant, i) => {
                        return <Paragraph key={i}>{restaurant}</Paragraph>
                    })
                }
            </View>
        )
    }
    else if (!props.results.length) {
        return <View>
            <Title> They could not agree </Title>
        </View>
    }
}

export default MealSyncResults;