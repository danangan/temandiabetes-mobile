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
import { updateNotificationCount, resetNotificationCount, getCurrentUser } from '../../actions';

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

  async componentDidMount() {
    // get current user
    this.props.getCurrentUser()

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
    let title = ''
    let body = 'Sentuh untuk info lebih lanjut'
    switch (notif.type) {
      case 'comment':
        title = `${notif.commentator} memberikan komentar di thread Anda`
        break;
      case 'reply':
        title = `${notif.commentator} membalas komentar di thread Anda`
        break;
      case 'followed':
        title = `User mengikuti thread Anda`
        break;
      case 'drug_reminder':
        title = `Pengingat obat`
        break;
      default:
        break;
    }

    if (notif.opened_from_tray) {
      // do the redirect here
      alert('handle dong redirect nya')


    } else {
      FCM.presentLocalNotification({
        title,
        body,
        priority: 'high',
        show_in_foreground: true,
        local: true
      });

      // increment the notif
      this.props.dispatch({ type: 'ADD_NOTIFICATION_COUNT' })
    }
  }

  onResetNotificationCount() {
    this.props.resetNotificationCount(this.props.currentUser._id)
  }

  render() {
    return(
      <View style={styles.container}>
        <Navigator
          navigator={this.props.navigator}
          onResetNotificationCount={this.onResetNotificationCount}
          notificationCount={this.props.notificationCount}
          />
        <BottomTabs>
          <TopTabs title="forum" icon={ForumIcon} activeIcon={ForumActiveIcon}>
            <View title="BERANDA" style={styles.content}>
              <HomeTab navigator={this.props.navigator} />
            </View>
            <View title="TERBARU" style={styles.content}>
              <LatestTab navigator={this.props.navigator} />
            </View>
            <View title="TERPILIH" style={styles.content}>
              <FeaturedTab navigator={this.props.navigator}/>
            </View>
            <View title="BOOKMARK" style={styles.content}>
              <BookmarkTab navigator={this.props.navigator}/>
            </View>
          </TopTabs>
          <TopTabs title="event" icon={EventIcon} activeIcon={EventActiveIcon}>
            <View title="EVENT" style={styles.content}>
              <EventTab />
            </View>
            <View title="VIDEO" style={styles.content}>
              <VideoTab />
            </View>
          </TopTabs>

          {
            // only render if the user is a diabetesi
            this.props.currentUser.tipe_user === 'diabetesi' ?
            <TopTabs title="rekaman" icon={InputTrackerIcon} activeIcon={InputTrackerActiveIcon}>
              <View title="MASUKKAN PELACAK" style={styles.content}>
                <InputTrackerTab navigator={this.props.navigator}/>
              </View>
              <View title="RIWAYAT DAN ESTIMASI" style={styles.content}>
                <HistoryTab navigator={this.props.navigator}/>
              </View>
            </TopTabs>
            : null
          }
          <TopTabs title="belanja" icon={CartIcon} activeIcon={CartActiveIcon}>
            <View title="KATALOG" style={styles.content}>
              <ShopTab navigator={this.props.navigator}/>
            </View>
          </TopTabs>
          <TopTabs title="darurat" icon={EmergencyIcon} activeIcon={EmergencyActiveIcon}>
            <View title="DARURAT" style={styles.content}>
              <EmergencyTab navigator={this.props.navigator}/>
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
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(getCurrentUser()),
  updateNotificationCount: currentUserId => dispatch(updateNotificationCount(currentUserId)),
  resetNotificationCount : currentUserId => dispatch(resetNotificationCount(currentUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
