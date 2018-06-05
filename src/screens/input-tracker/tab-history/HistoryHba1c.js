import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { Card } from '../../../components';
import Style from '../../../style/defaultStyle';

const HistoryHba1c = ({ history }) => {
  const valueHba1c = history.hba1c === null || history.hba1c === undefined ? 0 : history.hba1c;
  const statusHba1c =
    valueHba1c >= 0 || valueHba1c <= 5.69
      ? 'normal'
      : valueHba1c > 5.7 || valueHba1c <= 6.4
        ? 'prediabetes'
        : valueHba1c >= 6.41
          ? 'diabetes'
          : 'cta';

  const wording = {
    cta: 'Masukkan data HbA1c anda',
    normal: 'Pertahankan pola makan dan lakukan aktifitas fisik secara teratur',
    prediabetes: 'Terapkan gaya hidup sehat dan lakukan aktifitas fisik secara teratur',
    diabetes: 'terapkan gaya hidup sehat dan lakukan aktifitas fisik secara teratur'
  };

  const description =
    statusHba1c === 'normal'
      ? wording.normal
      : statusHba1c === 'prediabetes'
        ? wording.prediabetes
        : statusHba1c === 'diabetes'
          ? wording.diabetes
          : wording.cta;

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>HbA1c</Text>
      <Card containerStyle={styles.cardStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.hba1cContainerStyle}>
            <Text style={styles.hba1cStyle}>{valueHba1c}%</Text>
            <Text style={styles.statusHba1cStyle}>({statusHba1c})</Text>
          </View>
          <Text style={styles.textStyle}>{description}</Text>
        </View>
      </Card>
    </View>
  );
};

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
    paddingLeft: 10,
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
    })
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
    fontSize: Style.FONT_SIZE_TITLE * 1.2,
    fontWeight: 'bold',
    color: '#556299'
  },
  statusHba1cStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: 'bold',
    color: '#556299',
    top: -10
  }
});

const mapStateToProps = state => ({
  history: state.historyEstimationReducer
});

export default connect(mapStateToProps, null)(HistoryHba1c);
