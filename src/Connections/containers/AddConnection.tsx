import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Paragraph, Title, Headline, TextInput, Button, Dialog, Portal } from 'react-native-paper';

import { globalStyles } from '../../globalStyles'

const AddConnection = (props) => {

  const [searchText, setSearchText] = useState('')
  const [dialogVisibility, setDialogVisibility] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  let hideDialog = () => setDialogVisibility(false);

  const onSubmit = async () => {
    if(searchText.length === 8){
      let formatter = searchText.slice(0, 4) + '-' + searchText.slice(4)
      await setSearchText(formatter)
      props.createConnection(formatter)
      props.toggleShowDialog()
      setSearchText('')
    } else{
      setDialogMessage('Invalid ConnectionID length - 8 Characters Required')
      setDialogVisibility(!dialogVisibility)
    }
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{display: 'flex', flex: .5, flexDirection: 'row'}}
      keyboardVerticalOffset={150}  
    >        
    <Portal>
        <Dialog visible={dialogVisibility} onDismiss={hideDialog}>
          <Dialog.Title>Oops...</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'flex-end'}}>
        <Title>Add Connection</Title>
        <TextInput 
        label='Connection ID'
        mode={'flat'}
        placeholder='0000-0000'
        value={searchText}
        onChangeText={setSearchText}
        keyboardType={'numeric'}
        maxLength={8}
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
