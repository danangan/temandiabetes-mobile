import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { registerScreens, registerScreenVisibilityListener } from './src/screens';

import appInitialized from './src/utils/appInitialized';
console.disableYellowBox = true;

registerScreens();
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
	// icon: require(''),
	// selectedIcon: require(''),
	title: 'Forum'
}, {
	label: 'Event',
	screen: 'TemanDiabets.EventScreen',
	// icon: require(),
	// selectedIcon: require(''),
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
	// icon: require(),
	// selectedIcon: require(''),
	title: 'Belanja'
}, {
	label: 'Darurat',
	screen: 'TemanDiabets.DaruratScreen',
	// icon: require(),
	// selectedIcon: require(''),
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
