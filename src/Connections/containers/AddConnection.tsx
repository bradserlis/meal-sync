import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Paragraph, Title, Headline, TextInput, Button } from 'react-native-paper';

import { globalStyles } from '../../globalStyles'

const AddConnection = () => {

  const [searchText, setSearchText] = useState('')

  const onSubmit = () => alert('cool')
  
  return(
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{display: 'flex', flex: .5, flexDirection: 'row'}}
        keyboardVerticalOffset={150}  
      >
        <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'flex-end'}}>
        <Title>Add Connection</Title>
        <TextInput 
        label='Connection ID'
        mode={'outlined'}
        placeholder='Connection ID'
        value={searchText}
        onChangeText={setSearchText}
        />
        <Button
          style={{marginTop: 10, display: 'flex', alignSelf: 'center', alignItems: 'center'}}
          mode={'contained'}
          onPress={onSubmit}
        >
        Add Connection
        </Button>
        </View>
      </KeyboardAvoidingView>
  )
}

export default AddConnection;
