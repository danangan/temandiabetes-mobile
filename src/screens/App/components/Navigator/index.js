import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

import defaultStyle from '../../../../style/defaultStyle'

import Menu from '../../../../assets/icons/menu.png'
import Notification from '../../../../assets/icons/notification.png'

export default class Navigator extends Component {
  constructor(props) {
    super(props)
    this.openScreen = this.openScreen.bind(this)
  }

  openScreen(screen) {
    this.props.navigator.push({
      screen,
      animated: true,
      animationType: 'slide-up',
      navigatorStyle: {
        tabBarHidden: true,
        navBarHidden: true,
      },
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {this.openScreen('TemanDiabets.ProfileSettings')}}>
          <Image
            style={styles.iconStyle}
            source={Menu}
          />
        </TouchableOpacity>
        <Text style={styles.navbarText}>Teman Diabetes</Text>
        <TouchableOpacity onPress={() => {this.openScreen('TemanDiabets.Notification')}}>
          <Image
            style={styles.iconStyle}
            source={Notification}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // App container
  container: {
    height: 60,
    backgroundColor: '#EF434F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignContent: 'center',
  },
  iconStyle: {
    height: 25,
    width: 25,
    marginHorizontal: 15,
  },
  navbarText: {
    fontFamily: 'Arista-Pro-Alternate-Light-trial',
    color: '#fff',
    fontSize: defaultStyle.FONT_SIZE_TITLE*1.3,
  }
})
