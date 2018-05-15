import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { Card } from '../../../components';
import Style from '../../../style/defaultStyle';

const HistoryHba1c = () => (
  <View style={styles.containerStyle}>
    <Text style={styles.titleStyle}>hba1c</Text>
    <Card containerStyle={styles.cardStyle}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.hba1cContainerStyle}>
          <Text style={styles.hba1cStyle}>8%</Text>
          <Text style={styles.statusHba1cStyle}>(normal)</Text>
        </View>
        <Text style={styles.textStyle}>
          pertahankan pola makan, jaga kesehatan dan olahraga teratur
        </Text>
      </View>
      <Text style={styles.textInfoStyle}>Keterangan : kurang 0-4 | normal 4-8 | parah 8-12</Text>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    width: Style.DEVICE_WIDTH / 2.2,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  cardStyle: {
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 11.18,
    paddingTop: 6.42,
    paddingBottom: 10,
    paddingRight: 45,
    marginLeft: 0,
    marginRight: 5,
    marginTop: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      android: {
        elevation: 3.55
      }
    }),
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    fontWeight: '900',
    color: '#252C68'
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: '500',
    color: '#556299',
    paddingLeft: 3.02
  },
  hba1cContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  hba1cStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE * 1.7,
    fontWeight: 'bold',
    color: '#556299'
  },
  statusHba1cStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: 'bold',
    color: '#556299',
    top: -10
  },
  textInfoStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER - 6,
    fontWeight: '200',
    color: '#556299',
    fontStyle: 'italic'
  }
});

export default HistoryHba1c;
