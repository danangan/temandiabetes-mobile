import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { Card } from '../../../components';
import Style from '../../../style/defaultStyle';

const HistoryBloodPressure = ({ history }) => {
  const bloodPressure =
    history.bloodPressure === null || history.bloodPressure === 'undefined/undefined'
      ? '00/00'
      : history.bloodPressure;

  const sistolic = parseInt(
    bloodPressure
      .split('')
      .slice(0, 2)
      .join('')
  );
  const distolic = parseInt(
    bloodPressure
      .split('')
      .slice(3, 5)
      .join('')
  );
  const status =
    sistolic < 139 && distolic < 89
      ? 'normal'
      : sistolic > 140 && distolic > 90
        ? 'hipertensi'
        : 'cta';

  const wording = {
    cta: 'Masukkan data tekanan darah anda',
    normal: 'Pertahankan gaya hidup sehat dan lakukan aktifitas fisik secara teratur',
    hipertensi:
      'Terapkan gaya hidup sehat dan lakukan aktifitas fisik secara teratur serta konsumsi obat secara teratur'
  };

  const description =
    status === 'normal'
      ? wording.normal
      : status === 'hipertensi'
        ? wording.hipertensi
        : wording.cta;

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Tekanan darah</Text>
      <Card containerStyle={styles.cardStyle}>
        <View style={styles.bloodPressureContainerStyle}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.bloodPressureStyle}>{bloodPressure}</Text>
            <Text style={styles.unitBloodPressureStyle}>mm/Hg</Text>
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
    justifyContent: 'space-around',
    marginTop: 10.25
  },
  cardStyle: {
    // height: '41.74%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 10,
    paddingRight: 5,
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
        elevation: 3.5
      }
    })
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    fontWeight: '900',
    color: '#252C68',
    bottom: 3
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: '500',
    color: '#556299',
    paddingLeft: 3.02,
    bottom: 5
  },
  bloodPressureContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  bloodPressureStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE * 1.2,
    fontWeight: 'bold',
    color: '#556299',
    bottom: 3
  },
  unitBloodPressureStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: 'bold',
    color: '#556299',
    marginTop: 13,
    left: 1
  }
});

const mapStateToProps = state => ({
  history: state.historyEstimationReducer
});

export default connect(
  mapStateToProps,
  null
)(HistoryBloodPressure);
