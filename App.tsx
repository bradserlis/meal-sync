import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/containers/Home';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Ooga Booga</Text>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
