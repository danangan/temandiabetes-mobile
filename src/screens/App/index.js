import React, { Component } from 'react';
import { View, StyleSheet, Platform, Linking, NativeModules, Alert, AppState } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { debounce } from 'lodash';
import FCM, {
  FCMEvent,
  NotificationType,
  WillPresentNotificationResult,
  RemoteNotificationResult
} from 'react-native-fcm';

// ACTIONS
import {
  updateNotificationCount,
  resetNotificationCount,
  getCurrentUser,
  updateFCMToken,
  addNotificationCount,
  resetDeepLink
} from '../../actions';

// COMPONENTS
import Navigator from './components/Navigator';
import TopTabs from './components/TopTabs';
import BottomTabs from './components/BottomTabs';

// STYLE
import color from '../../style/color';

// ICONS FOR NAVIGATOR
import ForumIcon from '../../assets/icons/forum.png';
import ForumActiveIcon from '../../assets/icons/forum_active.png';
import EventIcon from '../../assets/icons/event.png';
import EventActiveIcon from '../../assets/icons/event_active.png';
import InputTrackerIcon from '../../assets/icons/explorer_icon.png';
import InputTrackerActiveIcon from '../../assets/icons/explorer_icon.png';
import CartIcon from '../../assets/icons/cart.png';
import CartActiveIcon from '../../assets/icons/cart_active.png';
import EmergencyIcon from '../../assets/icons/emergency.png';
import EmergencyActiveIcon from '../../assets/icons/emergency_active.png';

// FORUM TAb
import HomeTab from '../forum/tab-home';
import LatestTab from '../forum/tab-latest';
import FeaturedTab from '../forum/tab-featured';
import BookmarkTab from '../forum/tab-bookmarks';

// EVENT TAB
import EventTab from '../event/tab-event';
import VideoTab from '../event/tab-video';

// INPUT TRACKER
import InputTrackerTab from '../input-tracker/tab-input-tracker';
import HistoryTab from '../input-tracker/tab-history';

// SHOP
import ShopTab from '../chart';

// INSURANCE CATALOG
import InsuranceCatalog from '../insuranceCatalog';

// EMERGENCY
import EmergencyTab from '../emergency';

import landingPageURL from '../../config/landingPageURL';

import axios from 'axios';

const activityStarter = NativeModules.ActivityStarter;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      appState: AppState.currentState
    };
    this.onResetNotificationCount = this.onResetNotificationCount.bind(this);
    this._displayNotificationAndroid = this._displayNotificationAndroid.bind(this);
    this.redirectByUrl = this.redirectByUrl.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.currentUser._id && this.props.currentUser._id !== nextProps.currentUser._id) {
        const token = await FCM.getFCMToken();
        this.props.updateFCMToken({
          userId: nextProps.currentUser._id,
          token: {
            messagingRegistrationToken: token
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getBundleIntent(){
    if(Platform.OS === "android"){
      var temp = await activityStarter.getBundleIntent();

      if(temp.ClientID != null && temp.MemberType != null){
        this.testgetURL('Nama=' + temp.Nama + '&' + 'ClientID=' + temp.ClientID + '&' + 'MemberType=' + temp.MemberType +  "&FWD");
      }
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.redirectByUrl);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this.getBundleIntent()
    }
    this.setState({appState: nextAppState});
  }

  async componentDidMount() {
    // set the loading in login page to false
    this.props.resetLoginLoader();

    // get current user
    this.props.getCurrentUser();

    // this.getInitialURL();

    // add event listener for direct incoming deeplink
    Linking.addEventListener('url', this.redirectByUrl);

    AppState.addEventListener('change', this._handleAppStateChange);

    this.getBundleIntent() //android

    try {
      await FCM.requestPermissions({
        badge: true,
        sound: true,
        alert: true,
        'content-available': 1
      });

      this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
        // checking if the receiver is the correct person

        if (Platform.OS === 'ios') {
          switch (notif._notificationType) {
            case NotificationType.Remote:
              notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
              break;
            case NotificationType.NotificationResponse:
              notif.finish();
              break;
            case NotificationType.WillPresent:
              notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
              break;
          }
        }

        if (notif.activityType === 'drug_reminder') {
          this._displayNotificationAndroid(notif);
        } else if (notif.receiver) {
          const receiver = JSON.parse(notif.receiver);
          if (receiver.id === this.props.currentUser._id) {
            this._displayNotificationAndroid(notif);
          }
        } else if (notif.targetUser) {
          if (notif.targetUser === this.props.currentUser._id) {
            this._displayNotificationAndroid(notif);
          }
        } else if (notif.userId) {
          if (notif.userId === this.props.currentUser._id) {
            this._displayNotificationAndroid(notif);
          }
        } else {
          this._displayNotificationAndroid(notif);
        }
      });
    } catch (e) {
      console.error(e);
    }

    // analyze the deeplink
    const { deepLink } = this.props;
    if (deepLink.currentDeepLink !== '' && !deepLink.expired) {
      this.redirectByUrl({
        url: deepLink.currentDeepLink
      });

      // set the deeplink to expired
      this.props.resetDeepLink();
    }

    FCM.on(FCMEvent.RefreshToken, token => {
      console.log(token);
    });
  }

  getInitialURL() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          // Alert.alert('GET INIT URL','initial url  ' + url)
          this.redirectByUrl(url);
        }
      })
      .catch(e => {});
  }

  redirectByUrl(res) {
    const url = res.url;
    let pathname = url.replace(`${landingPageURL}/`, '');

    // let pathname = url.replace(`https://temandiabetes.com/`, '');
    pathname = pathname.split('/');
    let screen = null;
    switch (pathname[0]) {
      case 'thread':
        screen = 'TemanDiabetes.ThreadDetails';
        break;
      case 'thread-static':
        screen = 'TemanDiabetes.FeaturedDetail';
        break;
      case 'fwdmax':
        this.testgetURL(decodeURI(pathname[1]) + "&FWD")
        break;
      default:
        break;
    }

    if (screen) {
      this.props.navigator.push({
        screen,
        navigatorStyle: {
          navBarHidden: true
        },
        passProps: {
          item: {
            _id: pathname[1]
          }
        }
      });
    }
  }

  async _displayNotificationAndroid(notif) {
    let displayNotif = true;
    let title = '';
    let body = 'Sentuh untuk info lebih lanjut';
    let screen = '';
    let id = '';
    let passProps = {};
    switch (notif.activityType) {
      case 'comment':
        // if the thread commentator is the same as the current user then do not display the notification
        if (notif.commentatorId === this.props.currentUser._id) {
          displayNotif = false;
        } else {
          if (notif.authorId === this.props.currentUser._id) {
            title = `${notif.commentator} memberikan komentar di thread Anda "${notif.topic}"`;
          } else {
            title = `${notif.commentator} memberikan komentar di thread yang Anda ikuti "${
              notif.topic
            }"`;
          }
          screen = 'TemanDiabetes.ThreadDetails';
          passProps = { item: { _id: notif.threadId } };
        }
        break;
      case 'reply_comment':
        if (notif.commentatorId === this.props.currentUser._id) {
          displayNotif = false;
        } else {
          if (notif.authorId === this.props.currentUser._id) {
            title = `${notif.commentator} membalas komentar di thread Anda "${notif.topic}"`;
          } else {
            title = `${notif.commentator} membalas komentar di thread yang Anda ikuti "${
              notif.topic
            }"`;
          }
          screen = 'TemanDiabetes.CommentDetails';
          passProps = { commentId: notif.commentId };
        }
        break;
      case 'followed':
        title = `${JSON.parse(notif.subscriber).nama ||
          JSON.parse(notif.subscriber).name} mengikuti thread Anda "${notif.topic}"`;
        passProps = { item: { _id: notif.threadId } };
        screen = 'TemanDiabetes.ThreadDetails';
        break;
      case 'drug_reminder':
        title = 'Pengingat obat';
        body = `${notif.drugName} - ${new moment(new Date(notif.datetimeConsume)).format(
          'HH:mm'
        )}. Sentuh untuk info lebih lanjut`;
        screen = 'TemanDiabetes.DrugReminder';
        break;
      case 'receiver_innercircle':
        title = `${JSON.parse(notif.sender).name} mengirimkan permintaan inner circle`;
        screen = 'TemanDiabetes.InnerCircleList';
        passProps = { tab: 1 };
        id = JSON.parse(notif.sender).id;
        break;
      case 'sender_innercircle':
        title = `${JSON.parse(notif.sender).name ||
          JSON.parse(notif.sender).nama} menerima permintaan innercircle Anda`;
        screen = 'TemanDiabetes.InnerCircleList';
        id = JSON.parse(notif.sender).id;
        break;
      default:
        break;
    }

    if (notif.opened_from_tray) {
      if (notif.screen && notif.screen !== '') {
        // reset the state while
        debounce(
          () => {
            this.props.navigator.push({
              screen: notif.screen,
              passProps: notif.passProps,
              navigatorStyle: {
                navBarHidden: true
              }
            });
          },
          300,
          { leading: true, trailing: false }
        )();
      }
    } else if (displayNotif) {
      if (Platform.OS === 'android' || (Platform.OS === 'ios' && notif.aps)) {
        const notificationChannelId = 'default';
        await FCM.createNotificationChannel({
          id: notificationChannelId,
          name: notificationChannelId,
          priority: 'max'
        });

        FCM.presentLocalNotification({
          title,
          body,
          screen,
          passProps,
          priority: 'high',
          sound: 'default',
          show_in_foreground: true,
          groupSummary: true,
          channel: notificationChannelId
        });
        this.props.addNotificationCount();
      }
    }
  }

  onResetNotificationCount() {
    this.props.resetNotificationCount(this.props.currentUser._id);
  }

  render() {
    const { activeTopTab, activeBottomTab, navigator, notificationCount, currentUser } = this.props;
    return (
      <View style={styles.container}>
        <Navigator
          navigator={navigator}
          onResetNotificationCount={this.onResetNotificationCount}
          notificationCount={notificationCount}
        />
        <BottomTabs activeTab={activeBottomTab} updateActiveTab={this.props.updateBottomTab}>
          <TopTabs
            title="Forum"
            icon={ForumIcon}
            activeIcon={ForumActiveIcon}
            activeTab={activeTopTab}
            updateActiveTab={this.props.updateTopTab}
          >
            <View title="BERANDA" style={styles.content}>
              <HomeTab navigator={navigator} />
            </View>
            <View title="TERBARU" style={styles.content}>
              <LatestTab navigator={navigator} />
            </View>
            <View title="ARTIKEL" style={styles.content}>
              <FeaturedTab navigator={this.props.navigator} />
            </View>
            <View title="BOOKMARK" style={styles.content}>
              <BookmarkTab navigator={navigator} />
            </View>
          </TopTabs>
          <TopTabs
            title="Event"
            icon={EventIcon}
            activeIcon={EventActiveIcon}
            activeTab={activeTopTab}
            updateActiveTab={this.props.updateTopTab}
          >
            <View title="EVENT" style={styles.content}>
              <EventTab />
            </View>
            <View title="VIDEO" style={styles.content}>
              <VideoTab />
            </View>
          </TopTabs>

          {/* {// only render if the user is a diabetesi
          currentUser.tipe_user === 'diabetesi' || currentUser.tipe_user === 'non-diabetesi' ? ( */}
          <TopTabs
            title="Rekaman"
            icon={InputTrackerIcon}
            activeIcon={InputTrackerActiveIcon}
            activeTab={activeTopTab}
            updateActiveTab={this.props.updateTopTab}
          >
            <View title="MASUKKAN DATA" style={styles.content}>
              <InputTrackerTab navigator={navigator} />
            </View>
            <View title="REKAMAN" style={styles.content}>
              <HistoryTab navigator={navigator} />
            </View>
          </TopTabs>
          {/* ) : null} */}
          <TopTabs
            title="Belanja"
            icon={CartIcon}
            activeIcon={CartActiveIcon}
            activeTab={activeTopTab}
            updateActiveTab={this.props.updateTopTab}
          >
            <View title="KATALOG" style={styles.content}>
              <ShopTab navigator={navigator} />
            </View>
            <View title="ASURANSI" style={styles.content}>
              <InsuranceCatalog navigator={navigator} />
            </View>
          </TopTabs>
          <TopTabs
            title="Darurat"
            icon={EmergencyIcon}
            activeIcon={EmergencyActiveIcon}
            activeTab={activeTopTab}
            updateActiveTab={this.props.updateTopTab}
          >
            <View title="DARURAT" style={styles.content}>
              <EmergencyTab navigator={navigator} />
            </View>
          </TopTabs>
        </BottomTabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.solitude
  },
  content: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  deepLink: state.appReducer.deepLink,
  currentUser: state.authReducer.currentUser,
  notificationCount: state.authReducer.notificationCount,
  activeTopTab: state.appNavigatorReducer.activeTopTab,
  activeBottomTab: state.appNavigatorReducer.activeBottomTab
});

const mapDispatchToProps = dispatch => ({
  addNotificationCount: () => dispatch(addNotificationCount()),
  updateTopTab: activeTab => dispatch({ type: 'UPDATE_ACTIVE_TOP_TAB', payload: activeTab }),
  updateBottomTab: activeTab => dispatch({ type: 'UPDATE_ACTIVE_BOTTOM_TAB', payload: activeTab }),
  getCurrentUser: () => dispatch(getCurrentUser()),
  updateNotificationCount: currentUserId => dispatch(updateNotificationCount(currentUserId)),
  resetNotificationCount: currentUserId => dispatch(resetNotificationCount(currentUserId)),
  updateFCMToken: param => dispatch(updateFCMToken(param)),
  resetDeepLink: () => dispatch(resetDeepLink()),
  resetLoginLoader: () => dispatch({ type: 'SET_LOGIN_LOADING', payload: { loading: false } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
