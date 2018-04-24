import React from 'react';

import { View, Text, Platform, TouchableOpacity } from 'react-native';

import FCM, { NotificationActionType, FCMEvent } from 'react-native-fcm';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };

    this._displayNotificationAndroid = this._displayNotificationAndroid.bind(this);
  }

  async componentDidMount() {
    try {
      let result = await FCM.requestPermissions({ badge: true, sound: true, alert: true });
      FCM.getInitialNotification()
        .then(notif => {
          console.log('INITIAL NOTIFICATION ', notif);
        });
      // console.log('REQUEST ', result);
      this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
        console.log('NOTIFICATION BRA ', notif);
        if (Platform.OS === 'android') {
          this._displayNotificationAndroid(notif);
        }
      });

      FCM.getFCMToken().then(token => {
        console.log('TOKEN (getFCMToken)', token);
        this.setState({ token: token || '' });
      });
    } catch (e) {
      console.error(e);
    }
  }

  _displayNotificationAndroid(notif) {
    console.log('ISI NOTIF DARI ANDROID ', notif);
    // FCM.presentLocalNotification({
    //   title: notif.topic,
    //   body: {
    //     commentator: notif.commentator
    //   },
    //   priority: 'high',
    //   click_action: notif.fcm.click_action, // click action dari menu bar ke root yang uniq
    //   show_in_foreground: true,
    //   local: true
    // });
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
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => this._displayNotificationAndroid}
        >
          <Text>Notification</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

export default Notification;
