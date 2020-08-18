import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { Paragraph, Title, Headline, TextInput, Button, Dialog, Portal } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';

import { globalStyles } from '../../globalStyles'

const AddConnection = (props) => {

  const [searchText, setSearchText] = useState('')
  const [dialogVisibility, setDialogVisibility] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('')

  let hideDialog = () => setDialogVisibility(false);

  const onSubmit = async () => {
    if(searchText.length === 9){
      props.createConnection(searchText)
      props.setAddConnectionDialog(true)
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
        <TextInputMask
          type={'custom'}
          options={{mask: '9999-9999'}}
          value={searchText}
          onChangeText={setSearchText}
          style={{height: 50, fontSize: 20}}
          customTextInput={TextInput}
          customTextInputProps={{
            style:{height: 50, fontSize: 20},
            label:'Connection ID',
            mode:'flat',
            placeholder:'0000-0000',
            onChangeText:{setSearchText}
          }}
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
