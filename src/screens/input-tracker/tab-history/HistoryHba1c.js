import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { Card } from '../../../components';
import Style from '../../../style/defaultStyle';

const HistoryHba1c = ({ history }) => {
  const valueHba1c = history.hba1c === null || history.hba1c === undefined ? 0 : history.hba1c;
  let wording = 'Masukkan data HbA1c anda';
  let status = 'cta';
  switch (true) {
    case valueHba1c > 0 && valueHba1c <= 5.69:
      wording = 'Pertahankan pola makan dan lakukan aktivitas fisik secara teratur';
      status = 'normal';
      break;
    case valueHba1c >= 5.7 && valueHba1c <= 6.49:
      wording = 'Terapkan gaya hidup sehat dan lakukan aktivitas fisik secara teratur';
      status = 'prediabetes';
      break;
    case valueHba1c >= 6.41:
      wording = 'Terapkan gaya hidup sehat dan lakukan aktivitas fisik secara teratur';
      status = 'diabetes';
      break;
    default:
      break;
  }

  let size = 0;
  switch (true) {
    case valueHba1c.toString().length >= 4:
      size = Style.FONT_SIZE * 1;
      break;
    default:
      size = Style.FONT_SIZE_TITLE * 1.2;
      break;
  }

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>HbA1c</Text>
      <Card containerStyle={styles.cardStyle}>
        <View style={styles.hba1cContainerStyle}>
          <Text style={[styles.hba1cStyle, { fontSize: size }]}>
            {valueHba1c.toString().slice(0, 4)}%
          </Text>
          <Text style={styles.statusHba1cStyle}>({status})</Text>
        </View>
        <Text style={styles.textStyle}>{wording}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: Style.CARD_WIDTH / 2,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  cardStyle: {
    height: Style.CARD_WIDTH / 4.5,
    width: Style.CARD_WIDTH / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 5,
    paddingTop: 6.42,
    paddingBottom: 10,
    paddingRight: 60,
    marginLeft: 0,
    marginRight: 5,
    marginTop: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2
      },
      android: {
        elevation: 3.55
      }
    })
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'android' ? Style.FONT_SIZE : Style.FONT_SIZE * 0.9,
    fontWeight: '900',
    color: '#252C68'
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'android' ? Style.FONT_SIZE_SMALLER : Style.FONT_SIZE_SMALLER * 0.8,
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
    fontWeight: 'bold',
    color: '#556299'
  },
  statusHba1cStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'android' ? Style.FONT_SIZE_SMALLER : Style.FONT_SIZE_SMALLER * 0.8,
    fontWeight: 'bold',
    color: '#556299'
  }
});

const mapStateToProps = state => ({
  history: state.historyEstimationReducer
});

export default connect(
  mapStateToProps,
  null
)(HistoryHba1c);
