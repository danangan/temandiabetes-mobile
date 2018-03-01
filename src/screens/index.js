import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import OnBoardingScreen from './onboarding';
import LoginScreen from './login';
import RegisterScreen from './register';
import RegisterScreenSecond from './register/registersecond';
import RegisterScreenThird from './register/registerthird';
import RegisterScreenFourth from './register/registerfourth';
import RegisterFive from './register/registerfive';
import ForumScreen from './forum';
import EventScreen from './event';
import InputTrackerScreen from './input-tracker';
import ChartScreen from './chart';
import EmergencyScreen from './emergency';
import TabHome from './tab-home';
import TabLatest from './tab-latest';
import TabFeatured from './tab-featured';
import TabBookmarks from './tab-bookmarks';
import TabVideo from './tab-video';
import TabEvent from './tab-event';
import TabInputTracker from './tab-input-tracker';
import TabHistory from './tab-history';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('TemanDiabets.OnBoardingScreen', () => OnBoardingScreen);
	Navigation.registerComponent('TemanDiabets.LoginScreen', () => LoginScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterScreen', () => RegisterScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterScreenSecond', () => RegisterScreenSecond);
	Navigation.registerComponent('TemanDiabets.RegisterScreenThird', () => RegisterScreenThird);
	Navigation.registerComponent('TemanDiabets.RegisterScreenFourth', () => RegisterScreenFourth, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterFive', () => RegisterFive, store, Provider);
	Navigation.registerComponent('TemanDiabets.ForumScreen', () => ForumScreen);
	Navigation.registerComponent('TemanDiabets.EventScreen', () => EventScreen);
	Navigation.registerComponent('TemanDiabets.InputTrackerScreen', () => InputTrackerScreen);
	Navigation.registerComponent('TemanDiabets.ChartScreen', () => ChartScreen);
	Navigation.registerComponent('TemanDiabets.EmergencyScreen', () => EmergencyScreen);
	Navigation.registerComponent('TemanDiabets.TabHome', () => TabHome);
	Navigation.registerComponent('TemanDiabets.TabLatest', () => TabLatest);
	Navigation.registerComponent('TemanDiabets.TabFeatured', () => TabFeatured);
	Navigation.registerComponent('TemanDiabets.TabBookmarks', () => TabBookmarks);
	Navigation.registerComponent('TemanDiabets.TabVideo', () => TabVideo);
	Navigation.registerComponent('TemanDiabets.TabEvent', () => TabEvent);
	Navigation.registerComponent('TemanDiabets.TabInputTracker', () => TabInputTracker);
	Navigation.registerComponent('TemanDiabets.TabHistory', () => TabHistory);
}

export function registerScreenVisibilityListener() {
	new ScreenVisibilityListener({
		willAppear: ({ screen }) => console.log(`Displaying screen ${screen}`),
		didAppear: ({ screen, startTime, endTime, commandType }) => {
			console.log('screenVisibility',
				`Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`
			);
		},
		willDisappear: ({ screen }) => console.log(`Screen will disappear ${screen}`),
		didDisappear: ({ screen }) => console.log(`Screen disappeared ${screen}`)
	}).register();
}
