import { Platform, PixelRatio } from 'react-native';
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
		screen: 'TemanDiabets.TabHome',
		icon: require('./src/assets/icons/forum.png'),
		selectedIcon: require('./src/assets/icons/forum_active.png'),
		title: 'Teman Diabetes',
		navigatorStyle: {
			topBarCollapseOnScroll: true,
			navBarHideOnScroll: true,
			navBarHidden: false,
			topTabsScrollable: true
		},
		navigatorButtons: {
			rightButtons: [
				{
					icon: require('./src/assets/icons/notification.png'),
					id: 'notification'
				}
			],
			leftButtons: [
				{
					icon: require('./src/assets/icons/menu.png'),
					id: 'sideMenu'
				}
			]
		},
		topTabs: [
			{
				screenId: 'TemanDiabets.TabHome',
				title: 'BERANDA'
			},
			{
				screenId: 'TemanDiabets.TabLatest',
				title: 'TERBARU'
			},
			{
				screenId: 'TemanDiabets.TabFeatured',
				title: 'TERPILIH'
			},
			{
				screenId: 'TemanDiabets.TabBookmarks',
				title: 'BOOKMARK'
			}
		]
	},
	{
		label: 'Event',
		screen: 'TemanDiabets.TabVideo',
		icon: require('./src/assets/icons/event.png'),
		selectedIcon: require('./src/assets/icons/event_active.png'),
		title: 'Teman Diabetes',
		navigatorStyle: {
			topBarCollapseOnScroll: true,
			navBarHideOnScroll: true,
			navBarHidden: false,
			topTabsScrollable: true
		},
		navigatorButtons: {
			rightButtons: [
				{
					icon: require('./src/assets/icons/notification.png'),
					id: 'notification'
				}
			],
			leftButtons: [
				{
					icon: require('./src/assets/icons/menu.png'),
					id: 'sideMenu'
				}
			]
		},
		topTabs: [
			{
				screenId: 'TemanDiabets.TabVideo',
				title: 'VIDEO'
			},
			{
				screenId: 'TemanDiabets.TabEvent',
				title: 'EVENT'
			}
		]
	},
	{
		label: 'Rekaman',
		screen: 'TemanDiabets.TabInputTracker',
		icon: require('./src/assets/icons/explorer_icon.png'),
		selectedIcon: require('./src/assets/icons/explorer_icon.png'),
		title: 'Teman Diabetes',
		navigatorStyle: {
			topBarCollapseOnScroll: true,
			navBarHideOnScroll: true,
			navBarHidden: false,
			topTabsScrollable: true
		},
		navigatorButtons: {
			rightButtons: [
				{
					icon: require('./src/assets/icons/notification.png'),
					id: 'notification'
				}
			],
			leftButtons: [
				{
					icon: require('./src/assets/icons/menu.png'),
					id: 'sideMenu'
				}
			]
		},
		topTabs: [
			{
				screenId: 'TemanDiabets.TabInputTracker',
				title: 'MASUKAN PELACAK'
			},
			{
				screenId: 'TemanDiabets.TabHistory',
				title: 'RIWAYAT DAN ESTIMASI'
			}
		]
	},
	{
		label: 'Belanja',
		screen: 'TemanDiabets.ChartScreen',
		icon: require('./src/assets/icons/cart.png'),
		selectedIcon: require('./src/assets/icons/cart_active.png'),
		title: 'Teman Diabetes',
		navigatorStyle: {
			topBarCollapseOnScroll: true,
			navBarHideOnScroll: true,
			navBarHidden: false,
			topTabsScrollable: true
		},
		navigatorButtons: {
			rightButtons: [
				{
					icon: require('./src/assets/icons/notification.png'),
					id: 'notification'
				}
			],
			leftButtons: [
				{
					icon: require('./src/assets/icons/menu.png'),
					id: 'sideMenu'
				}
			]
		},
		topTabs: [
			{
				screenId: 'TemanDiabets.TabInputTracker',
				title: 'KATALOG'
			}
		]
	},
	{
		label: 'Darurat',
		screen: 'TemanDiabets.EmergencyScreen',
		icon: require('./src/assets/icons/emergency.png'),
		selectedIcon: require('./src/assets/icons/emergency_active.png'),
		title: 'Teman Diabetes',
		navigatorStyle: {
			topBarCollapseOnScroll: true,
			navBarHideOnScroll: true,
			navBarHidden: false,
			topTabsScrollable: true
		},
		navigatorButtons: {
			rightButtons: [
				{
					icon: require('./src/assets/icons/notification.png'),
					id: 'notification'
				}
			],
			leftButtons: [
				{
					icon: require('./src/assets/icons/menu.png'),
					id: 'sideMenu'
				}
			]
		},
		topTabs: [
			{
				screenId: 'TemanDiabets.TabInputTracker',
				title: 'TOMBOL DARURAT'
			}
		]
	}
];

export function mainApp() {
	Navigation.startTabBasedApp({
		tabs,
		animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
		tabsStyle: {
			tabBarBackgroundColor: color.red,
			tabBarButtonColor: color.white,
			tabFontFamily: 'Montserrat-Regular',
			drawUnderTabBar: true
		},
		appStyle: {
			tabBarSelectedButtonColor: color.red,
			navBarTextColor: color.white,
			navBarBackgroundColor: color.red,
			navBarTextFontSize: 22,
			navBarTextFontFamily: 'MontserratAlternates-Medium',
			navBarTextFontBold: true,
			tabBarBackgroundColor: color.white,
			tabBarButtonColor: color.gray,
			tabBarTranslucent: false,
			tabFontFamily: 'Montserrat-Regular',
			tabFontSize: 10,
			selectedTabFontSize: 12,
			initialTabIndex: 2,
			forceTitlesDisplay: true,

			topTabTextFontFamily: 'Montserrat-Regular',
			topTabTextColor: color.white,
			selectedTopTabTextColor: color.white,

			// // Tab indicator
			selectedTopTabIndicatorHeight: PixelRatio.get() * 4,
			selectedTopTabIndicatorColor: color.red,
			navBarTitleTextCentered: true
		},
		drawer: {
			left: {}
		}
	});
}

export function appRegistry() {
	appInitialized();
}
