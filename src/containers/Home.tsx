import React, {useState} from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

const Home = () => {

  const [test, setTest] = useState<number|null >(0);

  const incrementState = () => {
    setTest(test + 1)
  }

  return (
    <View>
      <Text>
        Home Text..
      </Text>
      <TouchableOpacity
        onPress={incrementState}
      >
      <Text>Test clicker thing {test} </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home;
