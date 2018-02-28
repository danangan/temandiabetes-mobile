import { Platform } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens, registerScreenVisibilityListener } from './src/screens';
import appInitialized from './src/utils/appInitialized';
import configureStore from './src/store/configureStore';
import color from './src/style/color';

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

const tabs = [
	{
		label: 'Forum',
		screen: 'TemanDiabets.ForumScreen',
		icon: require('./src/assets/icons/forum.png'),
		selectedIcon: require('./src/assets/icons/forum_active.png'),
		title: 'Forum'
	},
	{
		label: 'Event',
		screen: 'TemanDiabets.EventScreen',
		icon: require('./src/assets/icons/event.png'),
		selectedIcon: require('./src/assets/icons/event_active.png'),
		title: 'Event'
	},
	{
		label: 'Rekaman',
		screen: 'TemanDiabets.InputTrackerScreen',
		icon: require('./src/assets/icons/event.png'),
		selectedIcon: require('./src/assets/icons/event_active.png'),
		title: 'Rekaman'
	},
	{
		label: 'Belanja',
		screen: 'TemanDiabets.ChartScreen',
		icon: require('./src/assets/icons/cart.png'),
		selectedIcon: require('./src/assets/icons/cart_active.png'),
		title: 'Belanja'
	},
	{
		label: 'Darurat',
		screen: 'TemanDiabets.EmergencyScreen',
		icon: require('./src/assets/icons/emergency.png'),
		selectedIcon: require('./src/assets/icons/emergency_active.png'),
		title: 'Darurat'
	}
];

export function mainApp() {
	Navigation.startTabBasedApp({
		tabs,
		animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
		tabsStyle: {
			tabBarBackgroundColor: 'white',
			tabBarButtonColor: color.white,
			tabBarSelectedButtonColor: color.red,
			tabFontFamily: 'Montserrat-Regular'
		},
		appStyle: {
			// tabBarBackgroundColor: '#003a66',
			// navBarButtonColor: '#ffffff',
			// tabBarButtonColor: '#ffffff',
			// navBarTextColor: '#ffffff',
			tabBarSelectedButtonColor: color.red,
			// navigationBarColor: 'yellow',
			// navBarBackgroundColor: '#003a66',
			// statusBarColor: '#002b4c',
			tabBarBackgroundColor: color.white,
			tabBarButtonColor: color.gray,
			tabBarTranslucent: false,
			tabFontFamily: 'Montserrat-Regular',
			tabFontSize: 10,
			selectedTabFontSize: 12,
			initialTabIndex: 2,
			forceTitlesDisplay: true
		},
		drawer: {
			left: {}
		}
	});
}

export function appRegistry() {
	appInitialized();
}
