import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ButtonSave = (props) => (
  <TouchableOpacity
    style={{
      height: 45,
      width: '50%',
      alignItems: 'center',
      backgroundColor: '#ef434e',
      justifyContent: 'center',
    }}
    onPress={() => props.onSubmit(props.type)}
  >
    <Text style={{ fontFamily: 'Montserrat-Bold', color: '#fff' }}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

export default ButtonSave;
