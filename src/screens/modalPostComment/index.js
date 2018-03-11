import React, { Component } from 'react';

import { View, Image, TouchableOpacity, Text, TextInput } from 'react-native';
import Closed from '../../assets/icons/close.png';

class ModalPostComponent extends Component {
  static navigatorStyle = {
		navBarHidden: true
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <View 
        style={{ 
          flex: 1, 
          flexDirection: 'row', 
          justifyContent: 'center', 
          alignItems: 'center', 
          position: 'absolute',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          top: 0,
          borderBottomColor: '#ccc'
        }}
      >
          <TouchableOpacity 
              onPress={() => Navigation.dismissModal({
                animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
              })}
              style={{ flex: 0.5 }}>
              <Image 
                source={Closed}
                style={{ width: 25, height: 25 }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1.5 }}>
              <Text>Tambah Komentar</Text>
            </View>
        </View>
        <View style={{ flex: 2, marginVertical: 50, borderWidth: 1, borderColor: '#000', width: '100%' }}>
          <TextInput
            placeholder="Tambahkan komen disini"
          />
        </View>
      </View>
    );
  }
}

export default ModalPostComponent;
