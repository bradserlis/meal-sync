import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import * as firebase from 'firebase';

const SignOutButton = ({navigation}) => {
    
    const handleClearExpoToken = () => {
        let currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref('users').child(currentUserId).update({expoPushToken: null})
    }

    const handleSignOut = async () => {
        // identify current user's uid for clearExpoToken
        handleClearExpoToken();

        // logout of firebase auth
       await firebase.auth().signOut();

        // redirect to landing screen
        navigation.navigate('Landing');
    }

    return(
    <Button
        style={{display: 'flex', alignSelf: 'left'}}
        labelStyle={{fontSize: 8}}
        mode='contained'
        compact={true}
        dark={true}
        onPress={handleSignOut}
    >
    Sign Out
    </Button>
    )
}

export default SignOutButton;