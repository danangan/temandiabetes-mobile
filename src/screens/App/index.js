import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux';

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
import CartIcon from'../../assets/icons/cart.png'
import CartActiveIcon from'../../assets/icons/cart_active.png'
import EmergencyIcon from'../../assets/icons/emergency.png'
import EmergencyActiveIcon from'../../assets/icons/emergency_active.png'

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
  }

  componentDidMount() {
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

  render() {
    return(
      <View style={styles.container}>
        <Navigator navigator={this.props.navigator}/>
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
          <TopTabs title="rekaman" icon={InputTrackerIcon} activeIcon={InputTrackerActiveIcon}>
            <View title="MASUKKAN PELACAK" style={styles.content}>
              <InputTrackerTab navigator={this.props.navigator}/>
            </View>
            <View title="RIWAYAT DAN ESTIMASI" style={styles.content}>
              <HistoryTab navigator={this.props.navigator}/>
            </View>
          </TopTabs>
          <TopTabs title="belanja" icon={CartIcon} activeIcon={CartActiveIcon}>
            <View title="KATALOG" style={styles.content}>
              <ShopTab navigator={this.props.navigator}/>
            </View>
          </TopTabs>
          <TopTabs title="darurat" icon={EmergencyIcon} activeIcon={EmergencyActiveIcon}>
            <View title="KATALOG" style={styles.content}>
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
  deepLink: state.appReducer.deepLink
});

export default connect(mapStateToProps)(App);
