/*
Thread Deskripsi
*/
import React from 'react';
import { View, Text, Linking, TouchableHighlight } from 'react-native';
import { CardSection, TextWithClickableURL } from '../../../components';

const ThreadDesc = (props) => {

  return (
    <CardSection>
      <View style={{ flex: 1, paddingHorizontal: 15, marginBottom: 10 }}>
        <Text style={{ fontSize: 15 }}>
          <TextWithClickableURL inputText={props.desc}/>
        </Text>
      </View>
    </CardSection>
  )
};

export default ThreadDesc;
