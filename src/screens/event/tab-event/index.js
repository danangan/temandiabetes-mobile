import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Config from 'react-native-config';

import Style from '../../../style/defaultStyle';
import color from '../../../style/color';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';

class TabVideo extends Component {
  constructor(props) {
    super(props);
  }

  omponentWillMount() {
    let adjustConfig = new AdjustConfig("k08xj3mdm680", Config.ENV == 'development' ? AdjustConfig.EnvironmentSandbox : AdjustConfig.EnvironmentProduction);
    Adjust.create(adjustConfig);
  }

  componentWillUnmount() {
    Adjust.componentWillUnmount();
  }

  adjustTrack = (token) => {
    let adjustEvent = new AdjustEvent(token);
    Adjust.trackEvent(adjustEvent);
  }

  componentDidMount() {
      this.adjustTrack("qt19vp");
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.iconContainerStyle}>
          <Image
            source={require('../../../assets/icons/event_active.png')}
            style={styles.iconStyle}
          />
          <Text style={styles.subTitleStyle}>Event</Text>
        </View>
        <Text style={styles.titleStyle}>Segera Hadir!</Text>
        <Text style={styles.descStyle}>
          Ikut event kesehatan seputar diabetes dan dapatkan jadwal dengan mudah
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: color.solitude,
    padding: Style.PADDING
  },
  iconContainerStyle: {
    flexDirection: 'column',
    alignSelf: 'center'
  },
  iconStyle: {
    width: 70,
    height: 70,
    alignSelf: 'center'
  },
  titleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE_TITLE * 2,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: color.black,
    alignSelf: 'center',
    opacity: 0.6,
    marginTop: Style.PADDING * 1.7,
    marginBottom: Style.PADDING
  },
  descStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    justifyContent: 'center',
    textAlign: 'center'
  },
  subTitleStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: Style.FONT_SIZE,
    justifyContent: 'center',
    color: color.red,
    marginTop: 3,
    textAlign: 'center'
  }
});

export default TabVideo;
