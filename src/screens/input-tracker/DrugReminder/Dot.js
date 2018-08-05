import React from 'react';

import {
  View,
} from 'react-native';

const Dot = () => (
  <View style={styles.container}>
    <View style={styles.innerComponet} />
  </View>
);

const styles = {
  container: { 
    flex: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 20, 
    height: 20, 
    borderRadius: 20, 
    backgroundColor: '#e8e6ee' 
  },
  innerComponet: { 
    width: 10, 
    height: 10, 
    borderRadius: 10,
    backgroundColor: '#fff' 
  }
};

export default Dot;
