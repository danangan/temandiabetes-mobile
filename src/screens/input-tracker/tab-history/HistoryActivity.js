import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

import { Card } from '../../../components';
import Style from '../../../style/defaultStyle';

const HistoryActivity = ({ history }) => {
  const activity =
    history.activity === null || history.activity === undefined ? 'cta' : history.activity;
  const wording = {
    cta: 'Masukan data aktivitas anda',
    light: 'Jalan kaki santai',
    medium: 'Jalan cepat, jogging, berenang, bersepeda santai',
    hard: 'Sepakbola, bulutangkis, basket'
  };

  const description =
    activity.toLowerCase() === 'ringan'
      ? wording.light
      : activity.toLowerCase() === 'sedang'
        ? wording.medium
        : activity.toLowerCase() === 'berat'
          ? wording.hard
          : wording.cta;

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Aktivitas</Text>
      <Card containerStyle={styles.cardStyle}>
        <View style={styles.activityContainerStyle}>
          <Image
            source={require('../../../assets/icons/activity.png')}
            style={styles.iconActivityStyle}
            tintColor={'#252C68'}
          />
          <Text style={styles.statusActivityStyle}>({activity})</Text>
        </View>
        <Text style={styles.textStyle}>{description}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 5,
    paddingTop: 5.42,
    paddingBottom: 10,
    paddingRight: 45,
    marginLeft: 5,
    marginRight: 0,
    marginTop: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 2
      },
      android: {
        elevation: 3.5
      }
    })
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'android' ? Style.FONT_SIZE : Style.FONT_SIZE * 0.9,
    fontWeight: '900',
    color: '#252C68',
    marginLeft: 10
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Platform.OS === 'android' ? Style.FONT_SIZE_SMALLER : Style.FONT_SIZE_SMALLER * 0.8,
    fontWeight: '500',
    color: '#556299',
    paddingLeft: 3.02
  },
  activityContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  iconActivityStyle: {
    width: 34,
    height: 35
  },
  statusActivityStyle: {
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
)(HistoryActivity);
