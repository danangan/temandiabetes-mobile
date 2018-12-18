import React, { Component } from 'react';
import { View, StyleSheet, Platform, Linking, NativeModules, AppState } from 'react-native';
import { connect } from 'react-redux';

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

// Push Notification Component
import PushNotification from '../../utils/pushNotification';

const activityStarter = NativeModules.ActivityStarter;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      appState: AppState.currentState
    };
    this.onResetNotificationCount = this.onResetNotificationCount.bind(this);
    this.redirectByUrl = this.redirectByUrl.bind(this);
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

    this.getBundleIntent(); //android

    // analyze the deeplink
    const { deepLink } = this.props;
    if (deepLink.currentDeepLink !== '' && !deepLink.expired) {
      this.redirectByUrl({
        url: deepLink.currentDeepLink
      });

      // set the deeplink to expired
      this.props.resetDeepLink();
    }
  }

  async getBundleIntent() {
    if (Platform.OS === 'android') {
      const temp = await activityStarter.getBundleIntent();

      if (temp.ClientID != null && temp.MemberType != null) {
        this.testgetURL(
          `Nama=${temp.Nama}&` + `ClientID=${temp.ClientID}&` + `MemberType=${temp.MemberType}&FWD`
        );
      }
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.redirectByUrl);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  getInitialURL() {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          this.redirectByUrl(url);
        }
      })
      .catch(e => {
        throw e;
      });
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.getBundleIntent();
    }
    this.setState({ appState: nextAppState });
  };

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
        this.testgetURL(`${decodeURI(pathname[1])}&FWD`);
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

  onResetNotificationCount() {
    this.props.resetNotificationCount(this.props.currentUser._id);
  }

  render() {
    const { activeTopTab, activeBottomTab, navigator, notificationCount, currentUser } = this.props;
    const content = (
      <View style={styles.container}>
        <PushNotification
          addNotificationCount={this.props.addNotificationCount}
          currentUserId={this.props.currentUser._id}
          navigator={this.props.navigator}
          updateFCMToken={this.props.updateFCMToken}
        />
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

    return content;
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
