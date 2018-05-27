import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Style from '../../../style/defaultStyle';
import color from '../../../style/color';

class TabVideo extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'notification') {
        this.props.navigator.push({
          screen: 'TemanDiabets.Notification',
          navigatorStyle: {
            navBarHidden: true
          }
        });
      }
      if (event.id === 'sideMenu') {
        this.props.navigator.push({
          screen: 'TemanDiabets.ProfileScreen',
          animated: true,
          animationType: 'slide-up',
					navigatorStyle: {
						tabBarHidden: true
					},
        });
      }
    }
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
        <Text style={styles.titleStyle}>Coming Soon</Text>
        <Text style={styles.descStyle}>
          Ikut event kesehatan diabetes dan dapatkan jadwal dengan mudah
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
