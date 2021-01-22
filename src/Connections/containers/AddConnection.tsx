import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Paragraph, Title, Headline, TextInput, Button, Dialog, Portal } from 'react-native-paper';

import { globalStyles } from '../../common/globalStyles'

const AddConnection = (props) => {

  const [searchTextOne, setSearchTextOne] = useState('')
  const [searchTextTwo, setSearchTextTwo] = useState('')
  const [errorDialogVisibility, setErrorDialogVisibility] = useState(false)
  const [errorDialogMessage, setErrorDialogMessage] = useState('')
  const [addConnectionDialogVisibility, setAddConnectionDialogVisibility] = useState(false);

  const hideErrorDialog = () => setErrorDialogVisibility(false);
  const hideAddConnectionDialog = () => setAddConnectionDialogVisibility(false)
  const toggleAddConnectionDialog = () => setAddConnectionDialogVisibility(!addConnectionDialogVisibility)

  const connectionIdFormatter = (digit:string) => {}

  const onSubmit = async () => {
    toggleAddConnectionDialog()
    let formattedId = searchTextOne+'-'+searchTextTwo;
    console.log('formattedid is', formattedId, 'length is', formattedId.length);
    if(formattedId.length === 9){
      props.createConnection(formattedId)
      props.setAddConnectionDialog(true)
      props.toggleShowDialog()
      setSearchTextOne('');
      setSearchTextTwo('');
    } else{
      setErrorDialogMessage('Invalid ConnectionID length - 8 Characters Required')
      setErrorDialogVisibility(!errorDialogVisibility)
    }
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{display: 'flex', flex: 1, flexDirection: 'row'}}
      keyboardVerticalOffset={100}  
    >
      <Portal>
        <Dialog visible={errorDialogVisibility} onDismiss={hideErrorDialog}>
          <Dialog.Title>Oops...</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{errorDialogMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideErrorDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={addConnectionDialogVisibility} onDismiss={hideAddConnectionDialog} style={{display: 'flex', flex: .35, alignItems: 'center'}}>
          <Dialog.Title>Add Connection:</Dialog.Title>
          <Dialog.Content style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
            <TextInput
            mode={'outlined'}
            value={searchTextOne}
            onChangeText={setSearchTextOne}
            style={{flex: .5, alignSelf: 'center'}}
            maxLength={4}
            keyboardType={'number-pad'}
            />
            <Title style={{alignSelf: 'center'}}> - </Title>
            <TextInput
            mode={'outlined'}
            value={searchTextTwo}
            onChangeText={setSearchTextTwo}
            style={{flex: .5, alignSelf: 'center'}}
            maxLength={4}
            keyboardType={'number-pad'}
            />
          </Dialog.Content>
          <Dialog.Actions>
              <Button style={{margin: 5}} mode={'contained'} onPress={onSubmit}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignSelf: 'flex-end'}}>
        <Button
          style={{alignSelf: 'center', padding: 10}}
          mode='contained'
          onPress={toggleAddConnectionDialog}
        >
        Add Connection
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddConnection;
