import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { Card } from '../../../components';
import Style from '../../../style/defaultStyle';

const HistoryWeight = ({ history }) => {
  const weight = history.weight === null || history.weight === undefined ? 0 : history.weight;
  const wording = {
    cta: 'Masukkan data berat badan anda',
    weight: 'Jaga berat badan anda agar selalu ideal '
  };

  const description = weight === 0 ? wording.cta : wording.weight;

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>berat badan</Text>
      <Card containerStyle={styles.cardStyle}>
        <View style={styles.weightContainerStyle}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.weightStyle}>{weight}</Text>
            <Text style={styles.unitWeightStyle}>kg</Text>
          </View>
          <Text style={styles.textStyle}>{description}</Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: Style.DEVICE_WIDTH / 2.13,
    flexDirection: 'column',
    justifyContent: 'space-around',
    right: 35,
    marginTop: 10.25
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 10,
    paddingRight: 5,
    marginLeft: 5,
    marginRight: 0,
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
    marginLeft: 10,
    bottom: 3
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: '500',
    color: '#556299',
    paddingLeft: 3.02,
    bottom: 7
  },
  weightContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  weightStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE * 1.2,
    fontWeight: 'bold',
    color: '#556299',
    bottom: 3
  },
  unitWeightStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: 'bold',
    color: '#556299',
    marginTop: 10,
    left: 1
  }
});

const mapStateToProps = state => ({
  history: state.historyEstimationReducer
});

export default connect(mapStateToProps, null)(HistoryWeight);
