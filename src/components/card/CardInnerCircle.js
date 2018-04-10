import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { Avatar } from '../avatar';

const CardInnerCircle = () => (
  <View 
    style={{ 
      flexDirection: 'row', 
      borderColorBottom: '#ccc', 
      borderBottomWidth: 0.5, 
      justifyContent: 'flex-start', 
      alignItems: 'center',
      paddingVertical: 10
    }}
  >
    <View 
      style={{ 
        flex: 2, 
        flexDirection: 'row', 
        // borderColor: '#ccc', 
        // borderWidth: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
      }}
    >
      <Avatar
        avatarSize="Small"
        imageSource="https://images-cdn.9gag.com/photo/aMjGOVM_700b.jpg"
      />
      <View style={{ margin: 10 }}>
        <Text>Adam</Text>
        <Text>Kakak</Text>
      </View>
    </View>
    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity>
        <Text style={{ color: '#ff1200', fontSize: 28 }}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default CardInnerCircle;
