import React, { Component } from 'react';
import { StatusBar, Platform, Linking } from 'react-native';
import { connect } from 'react-redux';
import FCM, { NotificationActionType, FCMEvent } from 'react-native-fcm';

import Screen from './Screen';
import { onBoarding, updateDeepLink } from '../../actions';

class OnBoardingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
      token: ''
		}
		this._displayNotificationAndroid = this._displayNotificationAndroid.bind(this);
	}

	async componentDidMount() {
		try {
      let result = await FCM.requestPermissions({ badge: true, sound: true, alert: true });
      // FCM.getInitialNotification()
      //   .then(notif => {
      //     console.log('INITIAL NOTIFICATION ', notif);
      //   });
      this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
        if (Platform.OS === 'android') {
          this._displayNotificationAndroid(notif);
        }
      });
      FCM.getFCMToken().then(token => {
        this.setState({ token: token || '' });
      });
    } catch (e) {
      console.error(e);
		}

		StatusBar.setHidden(true);
    this.props.onBoarding();

    // handling deeplink here
    // save to store to handle later in main app
    let url = Linking.getInitialURL().then(url => {
      // check if it is a reset password
      // if not save it to redux store
      if (url.includes('reset-password')) {
        let pathname = url.replace('https://temandiabetes.com/', '');
        pathname = pathname.split('/')
        this.props.navigator.push({
          screen: 'TemanDiabets.ForgotPasswordInputNewPassword',
          navigatorStyle: {
            navBarHidden: true
          },
          animated: true,
          animationType: 'fade',
          passProps: {
            token: pathname[1]
          }
        });
      } else {
        this.props.updateDeepLink(url)
      }
    });
	}

	_displayNotificationAndroid(notif) {
    // console.log('ISI NOTIF DARI ANDROID ', notif);
    const { topic, commentator } = notif;
    FCM.presentLocalNotification({
      title: topic,
      body: commentator,
      priority: 'high',
      click_action: notif.fcm.click_action, // click action dari menu bar ke root yang uniq
      show_in_foreground: true,
      local: true
    });
  }

	render() {
		return <Screen navigation={this.props.navigator} fcmToken={this.state.token} />;
	}
}

const mapDispatchToProps = dispatch => ({
	onBoarding: () => dispatch(onBoarding()),
	updateDeepLink: (deepLink) => dispatch(updateDeepLink(deepLink)),
});

export default connect(null, mapDispatchToProps)(OnBoardingScreen);
