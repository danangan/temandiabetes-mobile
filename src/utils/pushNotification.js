import React from 'react';
import { Platform, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { debounce } from 'lodash';
import { randomizer } from './helpers';
import { connect } from 'react-redux';

import { resetNotification } from '../actions';

// Notification Channel ID
const notificationChannelId = 'TDNotifChannel';

class PushNotification extends React.Component {
  async componentDidMount() {
    this.setNotificationChannel();
    this.checkPermission();
    this.createNotificationListeners(); //add this line
    this.checkNotificationClosedApp();
  }

  async componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.currentUserId && this.props.currentUserId !== nextProps.currentUserId) {
        this.getToken(nextProps.currentUserId);
      }
    } catch (e) {
      console.log(e);
    }
  }

  ////////////////////// Add these methods //////////////////////

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }

  checkNotificationClosedApp() {
    if (this.props.notificationLink._data) {
      this.openNotification(this.props.notificationLink._data);
      this.props.resetNotification();
    }
  }

  setNotificationChannel() {
    // Build a channel
    const channel = new firebase.notifications.Android.Channel(
      notificationChannelId,
      'TD Channel',
      firebase.notifications.Android.Importance.Max
    ).setDescription('Teman Diabetes App Channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase.notifications().onNotification(notification => {
      this.checkNotificationValid(notification);
    });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        this.openNotification(notificationOpen.notification._data);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    // const notificationOpen = await firebase.notifications().getInitialNotification();
    // if (notificationOpen) {
    //   this.openNotification(notificationOpen.notification._data);
    // }

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      // display notification
      this.checkNotificationValid(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(title, body, [{ text: 'OK', onPress: () => console.log('OK Pressed') }], {
      cancelable: false
    });
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken && this.props.currentUserId) {
      // user has a device token
      this.props.updateFCMToken({
        userId: this.props.currentUserId,
        token: {
          messagingRegistrationToken: fcmToken
        }
      });
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  checkNotificationValid(rawNotification) {
    const notification = rawNotification._data;

    if (notification.activityType === 'drug_reminder') {
      this.displayNotification(rawNotification);
    } else if (notification.receiver) {
      const receiver = JSON.parse(notification.receiver);
      if (receiver.id === this.props.currentUserId) {
        this.displayNotification(rawNotification);
      }
    } else if (notification.targetUser) {
      if (notification.targetUser === this.props.currentUserId) {
        this.displayNotification(rawNotification);
      }
    } else if (notification.userId) {
      if (notification.userId === this.props.currentUserId) {
        this.displayNotification(rawNotification);
      }
    } else {
      this.displayNotification(rawNotification);
    }
  }

  async displayNotification(notif) {
    let displayNotif = true;
    if (notif.activityType === 'comment' || notif.activityType === 'reply_comment') {
      if (notif.commentatorId === this.props.currentUserId) {
        displayNotif = false;
      }
    }

    if (displayNotif) {
      if (Platform.OS === 'ios') {
        const notificationId = `TD_notif_${randomizer()}`;

        const notification = new firebase.notifications.Notification()
          .setNotificationId(notificationId)
          .setTitle(notif._title)
          .setBody(notif._body)
          .setSound('default')
          .setData({
            ...notif._data,
            show_in_foreground: true,
            groupSummary: true
          });

        firebase.notifications().displayNotification(notification);

        this.props.addNotificationCount();
      }

      if (Platform.OS === 'android') {
        const notificationId = `TD_notif_${randomizer()}`;

        const notification = new firebase.notifications.Notification()
          .setNotificationId(notificationId)
          .setTitle(notif._title)
          .setBody(notif._body)
          .setSound('default')
          .android.setAutoCancel(true)
          .android.setChannelId(notificationChannelId)
          .android.setSmallIcon('ic_launcher')
          .android.setPriority(firebase.notifications.Android.Priority.Max)
          .setData({
            ...notif._data,
            show_in_foreground: true,
            groupSummary: true
          });

        firebase.notifications().displayNotification(notification);

        this.props.addNotificationCount();
      }
    }
  }

  openNotification(notification) {
    let screen = '';
    let passProps = {};
    switch (notification.activityType) {
      case 'comment':
        screen = 'TemanDiabetes.ThreadDetails';
        passProps = { item: { _id: notification.threadId } };
        break;
      case 'reply_comment':
        screen = 'TemanDiabetes.CommentDetails';
        passProps = { commentId: notification.commentId };
        break;
      case 'followed':
        passProps = { item: { _id: notification.threadId } };
        screen = 'TemanDiabetes.ThreadDetails';
        break;
      case 'drug_reminder':
        screen = 'TemanDiabetes.DrugReminder';
        break;
      case 'receiver_innercircle':
        screen = 'TemanDiabetes.InnerCircleList';
        passProps = { tab: 1 };
        break;
      case 'sender_innercircle':
        screen = 'TemanDiabetes.InnerCircleList';
        break;
      default:
        break;
    }
    if (screen && screen !== '') {
      // reset the state while
      debounce(
        () => {
          this.props.navigator.push({
            screen,
            passProps,
            navigatorStyle: {
              navBarHidden: true
            }
          });
        },
        300,
        { leading: true, trailing: false }
      )();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  notificationLink: state.appReducer.notification
});

const mapDispatchToProps = dispatch => ({
  resetNotification: () => dispatch(resetNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PushNotification);
