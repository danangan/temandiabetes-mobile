import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native'
import { connect } from 'react-redux';
import FCM, { NotificationActionType, FCMEvent } from 'react-native-fcm';

// ACTIONS
import { updateNotificationCount, resetNotificationCount, getCurrentUser, updateFCMToken, addNotificationCount } from '../../actions';

// COMPONENTS
import Navigator from './components/Navigator'
import TopTabs from './components/TopTabs'
import BottomTabs from './components/BottomTabs'

// STYLE
import color from '../../style/color';

// ICONS FOR NAVIGATOR
import ForumIcon from '../../assets/icons/forum.png'
import ForumActiveIcon from '../../assets/icons/forum_active.png'
import EventIcon from '../../assets/icons/event.png'
import EventActiveIcon from '../../assets/icons/event_active.png'
import InputTrackerIcon from '../../assets/icons/explorer_icon.png'
import InputTrackerActiveIcon from '../../assets/icons/explorer_icon.png'
import CartIcon from '../../assets/icons/cart.png'
import CartActiveIcon from '../../assets/icons/cart_active.png'
import EmergencyIcon from '../../assets/icons/emergency.png'
import EmergencyActiveIcon from '../../assets/icons/emergency_active.png'

// FORUM TAb
import HomeTab from '../forum/tab-home'
import LatestTab from '../forum/tab-latest'
import FeaturedTab from '../forum/tab-featured'
import BookmarkTab from '../forum/tab-bookmarks'

// EVENT TAB
import EventTab from '../event/tab-event'
import VideoTab from '../event/tab-video'

// INPUT TRACKER
import InputTrackerTab from '../input-tracker/tab-input-tracker'
import HistoryTab from '../input-tracker/tab-history'

// SHOP
import ShopTab from '../chart'

// EMERGENCY
import EmergencyTab from '../emergency'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: ''
    }
    this.onResetNotificationCount = this.onResetNotificationCount.bind(this)
		this._displayNotificationAndroid = this._displayNotificationAndroid.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    try {
      if (nextProps.currentUser._id && this.props.currentUser._id !== nextProps.currentUser._id) {
        const token = await FCM.getFCMToken()
        this.props.updateFCMToken({
          userId: nextProps.currentUser._id,
          token: {
            messagingRegistrationToken: token
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  async componentDidMount() {
    // get current user
    this.props.getCurrentUser()

		try {
      let result = await FCM.requestPermissions({ badge: true, sound: true, alert: true });
      this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
        if (Platform.OS === 'android') {
          this._displayNotificationAndroid(notif);
        }
      });
    } catch (e) {
      console.error(e);
		}

    // analyze the deeplink
    const { deepLink } = this.props;
    if (deepLink.currentDeepLink !== '' && !deepLink.expired) {
      let pathname = deepLink.currentDeepLink.replace(`${landingPageURL}/`, '');
      pathname = pathname.split('/')
      let screen
      switch (pathname[0]) {
        case 'thread':
          screen = 'TemanDiabets.ThreadDetails';
          break;
        case 'thread-static':
          screen = 'TemanDiabets.FeaturedDetail';
          break;
        default:
          break;
      }

      this.props.navigator.push({
        screen,
        navigatorStyle: {
          navBarHidden: true
        },
        passProps: {
          item: {
            _id: pathname[1],
          }
        }
      });
    }
  }

	_displayNotificationAndroid(notif) {
    console.log(notif)
    let title = ''
    let body = 'Sentuh untuk info lebih lanjut'
    let screen = ''
    let id = ''
    let passProps = {}
    switch (notif.activityType) {
      case 'comment':
        title = `${notif.commentator} memberikan komentar di thread Anda`
        screen = 'TemanDiabets.ThreadDetails'
        // passProps = { item: JSON.parse(notif.thread) }
        break;
      case 'reply_comment':
        title = `${notif.commentator} membalas komentar di thread Anda`
        screen = 'TemanDiabets.CommentDetails'
        // passProps = { commentId: JSON.parse(activity.commentId) }
        id = notif.commentatorId
        break;
      case 'followed':
        title = `${JSON.parse(notif.subscriber).nama || JSON.parse(notif.subscriber).name} mengikuti thread Anda "${notif.topic}"`
        passProps = { id: JSON.parse(notif.subscriber)._id }
        screen = 'TemanDiabets.ProfileDetails'
        break;
      case 'drug_reminder':
        title = `Pengingat obat`
        break;
      case "receiver_innercircle":
        title = `${JSON.parse(notif.sender).name} mengirimkan permintaan inner circle`
        screen = 'TemanDiabets.InnerCircleList'
        id = JSON.parse(notif.sender).id
        break;
      case 'sender_innercircle':
        title = `${JSON.parse(notif.sender).name || JSON.parse(notif.sender).nama } menerima permintaan innercircle Anda`
        screen = 'TemanDiabets.InnerCircleList'
        id =  JSON.parse(notif.sender).id
        break;
      default:
        break;
    }

    if (notif.opened_from_tray) {
      console.log('handle redirect dari fcm di sini gan')
      console.log('item notif', notif)
      if (notif.screen && notif.screen !== '') {
        // reset the state while
        this.props.navigator.push({
          screen: notif.screen,
          passProps: notif.passProps,
          navigatorStyle: {
            navBarHidden: true
          },
        });
      }
    } else {
      FCM.presentLocalNotification({
        title,
        body,
        screen,
        passProps,
        priority: 'high',
        sound: "default",
        show_in_foreground: true
      });

      this.props.addNotificationCount()
    }
  }

  onResetNotificationCount() {
    this.props.resetNotificationCount(this.props.currentUser._id)
  }

  render() {
    const { activeTopTab, activeBottomTab, navigator, notificationCount, currentUser } = this.props
    return(
      <View style={styles.container}>
        <Navigator
          navigator={navigator}
          onResetNotificationCount={this.onResetNotificationCount}
          notificationCount={notificationCount}
          />
        <BottomTabs activeTab={activeBottomTab} updateActiveTab={this.props.updateBottomTab}>
          <TopTabs
            title="forum"
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
            <View title="TERPILIH" style={styles.content}>
              <FeaturedTab navigator={this.props.navigator}/>
            </View>
            <View title="BOOKMARK" style={styles.content}>
              <BookmarkTab navigator={navigator}/>
            </View>
          </TopTabs>
          <TopTabs
            title="event"
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

          {
            // only render if the user is a diabetesi
            currentUser.tipe_user === 'diabetesi' ?
            <TopTabs
              title="rekaman"
              icon={InputTrackerIcon}
              activeIcon={InputTrackerActiveIcon}
              activeTab={activeTopTab}
              updateActiveTab={this.props.updateTopTab}
            >
              <View title="MASUKKAN PELACAK" style={styles.content}>
                <InputTrackerTab navigator={navigator}/>
              </View>
              <View title="RIWAYAT DAN ESTIMASI" style={styles.content}>
                <HistoryTab navigator={navigator}/>
              </View>
            </TopTabs>
            : null
          }
          <TopTabs
            title="belanja"
            icon={CartIcon}
            activeIcon={CartActiveIcon}
            activeTab={activeTopTab}
            updateActiveTab={this.props.updateTopTab}
          >
            <View title="KATALOG" style={styles.content}>
              <ShopTab navigator={navigator}/>
            </View>
          </TopTabs>
          <TopTabs
            title="darurat"
            icon={EmergencyIcon}
            activeIcon={EmergencyActiveIcon}
            activeTab={activeTopTab}
            updateActiveTab={this.props.updateTopTab}
          >
            <View title="DARURAT" style={styles.content}>
              <EmergencyTab navigator={navigator}/>
            </View>
          </TopTabs>
        </BottomTabs>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.solitude,
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
  activeBottomTab: state.appNavigatorReducer.activeBottomTab,
});

const mapDispatchToProps = dispatch => ({
  addNotificationCount: () => dispatch(addNotificationCount()),
  updateTopTab: (activeTab) => dispatch({type: 'UPDATE_ACTIVE_TOP_TAB', payload: activeTab}),
  updateBottomTab: (activeTab) => dispatch({type: 'UPDATE_ACTIVE_BOTTOM_TAB', payload: activeTab}),
  getCurrentUser: () => dispatch(getCurrentUser()),
  updateNotificationCount: currentUserId => dispatch(updateNotificationCount(currentUserId)),
  resetNotificationCount : currentUserId => dispatch(resetNotificationCount(currentUserId)),
  updateFCMToken: param => dispatch(updateFCMToken(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
