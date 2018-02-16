import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens, registerScreenVisibilityListener } from './src/screens';
import appInitialized from './src/utils/appInitialized';
import configureStore from './src/store/configureStore';

const store = configureStore();
console.disableYellowBox = true;

registerScreens(store, Provider);
registerScreenVisibilityListener();

export function startApp() {
  Navigation.startSingleScreenApp({
    screen: {
			screen: 'TemanDiabets.OnBoardingScreen',
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
}

const tabs = [{
	label: 'Forum',
	screen: 'TemanDiabets.ForumScreen',
	icon: require('./src/assets/icons/forum.png'),
	selectedIcon: require('./src/assets/icons/forum_active.png'),
	title: 'Forum'
}, {
	label: 'Event',
	screen: 'TemanDiabets.EventScreen',
	icon: require('./src/assets/icons/event.png'),
	selectedIcon: require('./src/assets/icons/event_active.png'),
	title: 'Event'
}, {
	label: 'Rekaman',
	screen: 'TemanDiabets.RekamanScreen',
	// icon: require(),
	// selectedIcon: require(''),
	title: 'Rekaman'
}, {
	label: 'Belanja',
	screen: 'TemanDiabets.BelanjaScreen',
	icon: require('./src/assets/icons/cart.png'),
	selectedIcon: require('./src/assets/icons/cart_active.png'),
	title: 'Belanja'
}, {
	label: 'Darurat',
	screen: 'TemanDiabets.DaruratScreen',
	icon: require('./src/assets/icons/emergency.png'),
	selectedIcon: require('./src/assets/icons/emergency_active.png'),
	title: 'Darurat'
}];

export function mainApp() {
  Navigation.startTabBasedApp({
    tabs,
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    tabsStyle: {
      tabBarBackgroundColor: '',
      tabBarButtonColor: '',
      tabBarSelectedButtonColor: '',
      tabFontFamily: '',
    },
    appStyle: {},
    drawer: {
      left: {}
    }
  });
}

export function appRegistry() {
	appInitialized();
}
