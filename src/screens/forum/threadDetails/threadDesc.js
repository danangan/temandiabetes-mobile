/*
Thread Deskripsi
*/
import React from 'react';
import { View, Text } from 'react-native';
import { CardSection } from '../../../components';

const ThreadDesc = (props) => (
  <CardSection>
    <View style={{ flex: 1, paddingHorizontal: 15, marginBottom: 10 }}>
      <Text>
        {props.desc}
      </Text>
    </View>
  </CardSection>
);

export default ThreadDesc;
