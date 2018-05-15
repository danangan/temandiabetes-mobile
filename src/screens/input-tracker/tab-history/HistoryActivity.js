import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

import { Card } from '../../../components';
import Style from '../../../style/defaultStyle';

const HistoryActivity = () => (
  <View style={styles.containerStyle}>
    <Text style={styles.titleStyle}>aktifitas</Text>
    <Card containerStyle={styles.cardStyle}>
      <View style={styles.activityContainerStyle}>
        <Image
          source={require('../../../assets/icons/activity.png')}
          style={styles.iconActivityStyle}
          tintColor={'#252C68'}
        />
        <Text style={styles.statusActivityStyle}>(sedang)</Text>
      </View>
      <Text style={styles.textStyle}>
        Lorem ipsum dolor sit amet, cum dicunt epicuri efficiendi cuaca
      </Text>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    width: Style.DEVICE_WIDTH / 2.13,
    flexDirection: 'column',
    justifyContent: 'space-around',
    right: 35
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingLeft: 11.18,
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
    marginLeft: 10
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: '500',
    color: '#556299',
    paddingLeft: 3.02
  },
  activityContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  iconActivityStyle: {
    width: 34,
    height: 35
  },
  statusActivityStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_SMALLER,
    fontWeight: 'bold',
    color: '#556299',
  }
});

export default HistoryActivity;
