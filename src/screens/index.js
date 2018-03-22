import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import OnBoardingScreen from './onboarding';
import LoginScreen from './login';
import RegisterScreen from './register';
import RegisterScreenSecond from './register/registersecond';
import RegisterScreenThird from './register/registerthird';
import RegisterScreenFourth from './register/registerfourth';
import RegisterFive from './register/registerfive';
import ChartScreen from './chart';
import EmergencyScreen from './emergency';
import TabHome from '../screens/forum/tab-home';
import TabLatest from '../screens/forum/tab-latest';
import TabFeatured from '../screens/forum/tab-featured';
import TabBookmarks from '../screens/forum/tab-bookmarks';
import TabVideo from '../screens/event/tab-video';
import TabEvent from '../screens/event/tab-event';
import TabInputTracker from '../screens/input-tracker/tab-input-tracker';
import TabHistory from '../screens/input-tracker/tab-history';
import ThreadDetails from '../screens/forum/threadDetails';
import ModalSearch from '../screens/modalSearch';
import ModalPostThread from '../screens/modalPostThread';
import ModalPostComment from '../screens/modalPostComment';
import FeatureDetail from '../screens/forum/tab-featured/FeaturedDetail';
import ModalReport from '../screens/modalReport';


export function registerScreens(store, Provider) {
	Navigation.registerComponent('TemanDiabets.OnBoardingScreen', () => OnBoardingScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.LoginScreen', () => LoginScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterScreen', () => RegisterScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterScreenSecond', () => RegisterScreenSecond);
	Navigation.registerComponent('TemanDiabets.RegisterScreenThird', () => RegisterScreenThird);
	Navigation.registerComponent('TemanDiabets.RegisterScreenFourth', () => RegisterScreenFourth, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterFive', () => RegisterFive, store, Provider);
	Navigation.registerComponent('TemanDiabets.ChartScreen', () => ChartScreen);
	Navigation.registerComponent('TemanDiabets.EmergencyScreen', () => EmergencyScreen);
	Navigation.registerComponent('TemanDiabets.TabHome', () => TabHome, store, Provider);
	Navigation.registerComponent('TemanDiabets.TabLatest', () => TabLatest);
	Navigation.registerComponent('TemanDiabets.TabFeatured', () => TabFeatured, store, Provider);
	Navigation.registerComponent('TemanDiabets.TabBookmarks', () => TabBookmarks);
	Navigation.registerComponent('TemanDiabets.TabVideo', () => TabVideo);
	Navigation.registerComponent('TemanDiabets.TabEvent', () => TabEvent);
	Navigation.registerComponent('TemanDiabets.TabInputTracker', () => TabInputTracker);
	Navigation.registerComponent('TemanDiabets.TabHistory', () => TabHistory);
	Navigation.registerComponent('TemanDiabets.ThreadDetails', () => ThreadDetails);
	Navigation.registerComponent('TemanDiabets.ModalSearch', () => ModalSearch, store, Provider);
	Navigation.registerComponent('TemanDiabets.ModalPostThread', () => ModalPostThread, store, Provider);
	Navigation.registerComponent('TemanDiabets.ModalPostComment', () => ModalPostComment);
	Navigation.registerComponent('TemanDiabets.ModalReport', () => ModalReport, store, Provider);
	Navigation.registerComponent('TemanDiabets.FeaturedDetail', () => FeatureDetail);
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
