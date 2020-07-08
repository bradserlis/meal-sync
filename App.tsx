import React, { useEffect, createContext, useReducer, useMemo } from 'react';
import { View, Text, Button, SafeAreaView, AsyncStorage } from 'react-native';

import Router from './src/Navigation/Router';
import Landing from './src/Landing/Landing';

const App = () => {

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <Router />
      </SafeAreaView>
  );
}

export default App;
