import React, { Component } from 'react';
import { View, Platform, TouchableOpacity, Text } from 'react-native';

import color from '../../../style/color';
import { Card, Button } from '../../../components';
import MenuButton from './MenuButton';
import Style from '../../../style/defaultStyle';

class InputTracker extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {}

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'notification') {
        alert('Development');
      }
      if (event.id === 'sideMenu') {
        this.props.navigator.showModal({
          screen: 'TemanDiabets.ProfileScreen',
          title: 'Modal',
          animationType: 'none'
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Card containerStyle={styles.cardStyle}>
          <MenuButton />
        </Card>
        <View style={styles.buttonContainerStyle}>
          <Button buttonStyle={styles.buttonStyle} textStyle={styles.textButtonStyle}>
            KIRIM
          </Button>
          <Button
            buttonStyle={[styles.buttonStyle, styles.buttonReset]}
            textStyle={[styles.textButtonStyle, styles.textReset]}
          >
            ATUR ULANG
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: color.solitude
  },
  cardStyle: {
    borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 19.44,
    marginLeft: 8.8,
    marginRight: 8.8,
    marginBottom: 22.59,
    paddingLeft: 29.2,
    paddingTop: 25.6,
    paddingBottom: 24.85,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      android: {
        elevation: 0.05
      }
    })
  },
  buttonContainerStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    width: 125.41,
    height: 46.95,
    borderRadius: 0,
    borderWidth: 2,
    paddingVertical: 5,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  textButtonStyle: {
    fontSize: Style.FONT_SIZE_SMALLER,
    fontFamily: 'Montserrat-Regular',
    color: color.white,
    fontWeight: '900'
  },
  buttonReset: {
    backgroundColor: color.white,
    borderColor: color.red,
    borderWidth: 1
  },
  textReset: {
    color: color.red
  }
};

export default InputTracker;
