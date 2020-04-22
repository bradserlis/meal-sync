import * as React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';

import Router from './src/Navigation/Router';
import Landing from './src/Landing/Landing';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
    <Router />
    </SafeAreaView>
  );
}

export default App;
