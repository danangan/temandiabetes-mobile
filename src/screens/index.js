import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import OnBoardingScreen from './onboarding';
import LoginScreen from './login';
import RegisterScreen from './register';
import RegisterScreenSecond from './register/registersecond';
import RegisterScreenThird from './register/registerthird';
import RegisterScreenFourth from './register/registerfourth';

export function registerScreens() {
	Navigation.registerComponent('TemanDiabets.OnBoardingScreen', () => OnBoardingScreen);
	Navigation.registerComponent('TemanDiabets.LoginScreen', () => LoginScreen);
	Navigation.registerComponent('TemanDiabets.RegisterScreen', () => RegisterScreen);
	Navigation.registerComponent('TemanDiabets.RegisterScreenSecond', () => RegisterScreenSecond);
	Navigation.registerComponent('TemanDiabets.RegisterScreenThird', () => RegisterScreenThird);
	Navigation.registerComponent('TemanDiabets.RegisterScreenFourth', () => RegisterScreenFourth);
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
