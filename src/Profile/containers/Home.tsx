import React from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Divider, Headline, Text, Button} from 'react-native-paper'

import {globalStyles} from '../../globalStyles'

const Home = (props) => {

  const {navigate} = props.navigation;

  return(
    <View style={globalStyles.container}>
    <View style={globalStyles.dividerDiv}>
      <Headline> Home </Headline>
    </View>
      <Paragraph> Now that you are logged in, let's start swiping on food... </Paragraph>
    </View>
    )
}

export default Home;
