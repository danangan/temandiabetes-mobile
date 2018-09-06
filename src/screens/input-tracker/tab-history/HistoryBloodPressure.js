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
  const itemBlood = bloodPressure.split('/');
  const systolic = parseInt(itemBlood[0]);
  const diastolic = parseInt(itemBlood[1]);

  let wording = 'Masukkan data tekanan darah Anda';
  switch (true) {
    case systolic <= 139 && diastolic >= 61 && diastolic <= 89:
      wording = 'Hindari stres dan terapkan pola hidup sehat';
      break;
    case systolic >= 140 && systolic <= 190 && diastolic >= 90:
      wording =
        'Terapkan gaya hidup sehat dan lakukan aktivitas fisik secara teratur serta konsumsi obat secara teratur';
      break;
    case systolic <= 139 && diastolic >= 61 && diastolic >= 90:
      wording =
        'Terapkan gaya hidup sehat dan lakukan aktivitas fisik secara teratur serta konsumsi obat secara teratur';
      break;
    case systolic >= 140 && systolic <= 190 && diastolic >= 61 && diastolic <= 89:
      wording =
        'Terapkan gaya hidup sehat dan lakukan aktivitas fisik secara teratur serta konsumsi obat secara teratur';
      break;
    default:
      break;
  }

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Tekanan darah</Text>
      <Card containerStyle={styles.cardStyle}>
        <View style={styles.bloodPressureContainerStyle}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.bloodPressureStyle}>{bloodPressure}</Text>
            <Text style={styles.unitBloodPressureStyle}>mm/Hg</Text>
          </View>
          <Text style={styles.textStyle}>{wording}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: Style.CARD_WIDTH / 2,
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 10.25
  },
  cardStyle: {
    height: Style.CARD_WIDTH / 4.1,
    width: Style.CARD_WIDTH / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 6.42,
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
    fontSize: Platform.OS === 'android' ? Style.FONT_SIZE : Style.FONT_SIZE*0.9,
    fontWeight: '900',
    color: '#252C68',
    bottom: 3
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'android' ? Style.FONT_SIZE_SMALLER : Style.FONT_SIZE_SMALLER*0.8,
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
    fontSize: Style.FONT_SIZE_TITLE * 1.1,
    fontWeight: 'bold',
    color: '#556299',
    bottom: 3
  },
  unitBloodPressureStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'android' ? Style.FONT_SIZE_SMALLER : Style.FONT_SIZE_SMALLER*0.8,
    fontWeight: 'bold',
    color: '#556299',
    marginTop: 7,
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
