import React, { useEffect, createContext, useReducer, useMemo } from 'react';
import { View, Text, Button, SafeAreaView, AsyncStorage } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import Router from './src/Navigation/Router';
import Landing from './src/Landing/Landing';

const App = () => {

  return (
      <SafeAreaView style={{ display: 'flex', flex: 1 }}>
      <PaperProvider>
        <Router />
        </PaperProvider>
      </SafeAreaView>
  );
}

export default App;
