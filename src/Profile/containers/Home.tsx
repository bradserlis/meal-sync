import React from 'react';
import { View } from 'react-native';
import { Paragraph, Title, Divider, Headline, Text, Button} from 'react-native-paper'
import * as firebase from 'firebase'

import {globalStyles} from '../../globalStyles'

const Home = (props) => {

  const {navigate} = props.navigation;

  const signInFakeUser = () => {
    let user = {
      username: 'bradley@abc.com',
      password:'testpass123'
    }
    try {
    firebase.auth().createUserWithEmailAndPassword(user.username, user.password).then((result) => {
      if(result.user.uid){
        firebase.database().ref('users').child(result.user.uid).set('douwork')
    alert('it worketh')  
      }
            // firebase
            //   .database()
            //   .ref("users")
            //   .child(userId)
            //   .child("firstname")
            //   .set(jresponse.first_name);
    })
    }
    catch(e){
      alert('it faileth')
      console.log(e)
    }
  }

  return(
    <View style={globalStyles.container}>
    <View style={globalStyles.dividerDiv}>
      <Headline> Home </Headline>
    </View>
      <Paragraph> Now that you are logged in, let's start swiping on food... </Paragraph>
      <Button
        mode={'contained'}
        onPress={signInFakeUser}
        >
        Create test user
      </Button>
    </View>
    )
}

export default Home;
