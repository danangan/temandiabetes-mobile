import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import OnBoardingScreen from './onboarding';
import LoginScreen from './login';
import RegisterScreen from './register';
import RegisterScreenSecond from './register/registersecond';
import RegisterScreenThird from './register/registerthird';
import RegisterScreenFourth from './register/registerfourth';
import RegisterFive from './register/registerfive';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('TemanDiabets.OnBoardingScreen', () => OnBoardingScreen);
	Navigation.registerComponent('TemanDiabets.LoginScreen', () => LoginScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterScreen', () => RegisterScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterScreenSecond', () => RegisterScreenSecond);
	Navigation.registerComponent('TemanDiabets.RegisterScreenThird', () => RegisterScreenThird);
	Navigation.registerComponent('TemanDiabets.RegisterScreenFourth', () => RegisterScreenFourth, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterFive', () => RegisterFive, store, Provider);
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
