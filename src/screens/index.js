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
