import React from 'react';
import { View, Image, Text } from 'react-native';

import DotsInfo from './DotsInfo';
import Style from '../../../style/defaultStyle';

const HistoryBloodSugarLevels = () => (
  <View style={styles.containerStyle}>
    <Text style={styles.titleStyle}>Kadar Gula Darah</Text>
    <Image
      source={{ uri: 'https://i.imgur.com/nRAGbLs.png' }}
      style={{ width: Style.DEVICE_WIDTH, height: Style.DEVICE_WIDTH / 2 }}
    />
    <View style={styles.infoDotsContainerStyle}>
      <DotsInfo />
    </View>
  </View>
);

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  infoDotsContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  titleStyle: {
    fontFamily: 'Montserrat',
    fontSize: Style.FONT_SIZE,
    fontWeight: '900',
    marginBottom: 5.94,
    color: '#252C68',
  }
};

export default HistoryBloodSugarLevels;
