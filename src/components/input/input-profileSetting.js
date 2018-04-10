import React from 'react';

import { View, Text, TextInput } from 'react-native';

const InputProfileSetting = () => (
  <View>
    <Text>Alamat</Text>
    <TextInput 
      value={this.state.alamat}
      style={{ height: 40, color: '#4a4a4a' }}
      placeholderTextColor="#4a4a4a"
      placeholder="Alamat"
      onChangeText={(text) => this.setState({ username: text })}
      underlineColorAndroid="#ef434e"
    />
  </View>
);

export default InputProfileSetting;

