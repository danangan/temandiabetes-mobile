import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

import { debounce } from 'lodash';

import defaultStyle from '../../../../style/defaultStyle'

import Menu from '../../../../assets/icons/menu.png'
import Notification from '../../../../assets/icons/notification.png'

export default class Navigator extends Component {
  constructor(props) {
    super(props)

    this.openScreen = this.openScreen.bind(this)
    this.onPressNofiticationIcon = this.onPressNofiticationIcon.bind(this)
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

  onPressNofiticationIcon() {

    this.props.onResetNotificationCount()
    this.openScreen('TemanDiabets.Notification')
  }

  render() {
    const { notificationCount } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={debounce(() => {this.openScreen('TemanDiabets.ProfileScreen')}, 500, { leading: true, trailing: false })}>
          <Image
            style={styles.iconStyle}
            source={Menu}
          />
        </TouchableOpacity>
        <Text style={styles.navbarText}>Teman Diabetes</Text>
        <TouchableOpacity onPress={debounce(this.onPressNofiticationIcon, 500, { leading: true, trailing: false })}>
          <View style={styles.notificationContainer}>
            {
              notificationCount > 0 &&
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{notificationCount}</Text>
              </View>
            }
            <Image
              style={styles.iconStyle}
              source={Notification}
            />
          </View>
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
  notificationBadge: {
    position:'absolute',
    top: 5,
    right:5,
    padding: 0,
    minWidth:20,
    zIndex: 999,
    height: 25,
    width: 25,
    borderRadius:15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  notificationText: {
    textAlign: 'center'
  },
  notificationContainer: {
    height: '100%',
    justifyContent: 'center'
  },
  iconStyle: {
    height: 25,
    width: 25,
    marginHorizontal: 18,
  },
  navbarText: {
    fontFamily: 'Arista-Pro-Alternate-Light-trial',
    color: '#fff',
    fontSize: defaultStyle.FONT_SIZE_TITLE*1.3,
  }
})
