import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

import AppContainer from './App';
import OnBoardingScreen from './onboarding';
import LoginScreen from './login';
import RegisterScreen from './register';
import RegisterScreenSecond from './register/registersecond';
import RegisterScreenThird from './register/registerthird';
import RegisterScreenFourth from './register/registerfourth';
import RegisterFive from './register/registerfive';
import ThreadDetails from '../screens/forum/threadDetails';
import ModalSearch from '../screens/modalSearch';
import ModalPostThread from '../screens/modalPostThread';
import ModalPostComment from '../screens/modalPostComment';
import FeatureDetail from '../screens/forum/tab-featured/FeaturedDetail';
import ModalReport from '../screens/modalReport';
import ProfileScreen from '../screens/profileScreen';
import ProfileDetails from '../screens/profileScreen/profileDetails';
import TabInnerCircle from './tab-innerCircle';
import ProfileSettings from './profileScreen/profileSettings';
import EditProfile from './profileScreen/profileSettings/editProfile';
import AboutScreen from '../screens/profileScreen/about';
import FaqScreen from '../screens/profileScreen/faq';
import ProductDetail from '../screens/chart/ProductDetail';
import LightBox from '../screens/chart/LightBox';
import InnerCircle from '../screens/profileScreen/innerCircle';
import InnerCircleList from '../screens/profileScreen/innerCircle/innerCircleList';
import ThreadTopic from '../screens/profileScreen/threadTopic';
import ModalReplyComment from '../screens/forum/threadDetails/modalReplyComment';
import CommentDetails from '../screens/forum/commentDetails';
import StepOne from '../screens/input-tracker/tab-input-tracker/TutorialDnurse/StepOne';
import StepTwo from '../screens/input-tracker/tab-input-tracker/TutorialDnurse/StepTwo';
import StepThree from '../screens/input-tracker/tab-input-tracker/TutorialDnurse/StepThree';
import DnurseResult from '../screens/input-tracker/tab-input-tracker/DnurseResult';
import HistoryHba1c from '../screens/input-tracker/tab-history/HistoryHba1c';
import HistoryActivity from '../screens/input-tracker/tab-history/HistoryActivity';
import HistoryBloodPressure from '../screens/input-tracker/tab-history/HistoryBloodPressure';
import HistoryWeight from '../screens/input-tracker/tab-history/HistoryWeight';
import HistoryFoods from '../screens/input-tracker/tab-history/HistoryFoods';
import HistoryBloodSugarLevels from '../screens/input-tracker/tab-history/HistoryBloodSugarLevels';
import DrugReminder from '../screens/input-tracker/DrugReminder';
import Notification from '../screens/notification';
import ForgotPasswordInputEmail from '../screens/forgotPassword/inputEmail';
import ForgotPasswordInputNewPassword from '../screens/forgotPassword/inputNewPassword';
import PreviewSearchMakanan from '../screens/input-tracker/tab-input-tracker/PreviewSearchMakanan';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('TemanDiabets.AppContainer', () => AppContainer, store, Provider);
	Navigation.registerComponent('TemanDiabets.OnBoardingScreen', () => OnBoardingScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.LoginScreen', () => LoginScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterScreen', () => RegisterScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterScreenSecond', () => RegisterScreenSecond);
	Navigation.registerComponent('TemanDiabets.RegisterScreenThird', () => RegisterScreenThird);
	Navigation.registerComponent('TemanDiabets.RegisterScreenFourth', () => RegisterScreenFourth, store, Provider);
	Navigation.registerComponent('TemanDiabets.RegisterFive', () => RegisterFive, store, Provider);
	Navigation.registerComponent('TemanDiabets.ThreadDetails', () => ThreadDetails, store, Provider);
	Navigation.registerComponent('TemanDiabets.ModalSearch', () => ModalSearch, store, Provider);
	Navigation.registerComponent('TemanDiabets.ModalPostThread', () => ModalPostThread, store, Provider);
	Navigation.registerComponent('TemanDiabets.ModalPostComment', () => ModalPostComment, store, Provider);
	Navigation.registerComponent('TemanDiabets.ModalReport', () => ModalReport, store, Provider);
	Navigation.registerComponent('TemanDiabets.FeaturedDetail', () => FeatureDetail);
	Navigation.registerComponent('TemanDiabets.ProfileScreen', () => ProfileScreen, store, Provider);
	Navigation.registerComponent('TemanDiabets.ProfileDetails', () => ProfileDetails, store, Provider);
	Navigation.registerComponent('TemanDiabets.TabInnerCircle', () => TabInnerCircle, store, Provider);
	Navigation.registerComponent('TemanDiabets.ProfileSettings', () => ProfileSettings, store, Provider);
	Navigation.registerComponent('TemanDiabets.EditProfile', () => EditProfile, store, Provider);
	Navigation.registerComponent('TemanDiabets.AboutScreen', () => AboutScreen);
	Navigation.registerComponent('TemanDiabets.FaqScreen', () => FaqScreen);
	Navigation.registerComponent('TemanDiabets.ProductDetail', () => ProductDetail);
	Navigation.registerComponent('TemanDiabets.LightBox', () => LightBox);
  Navigation.registerComponent('TemanDiabets.InnerCircle', () => InnerCircle, store, Provider);
	Navigation.registerComponent('TemanDiabets.InnerCircleList', () => InnerCircleList, store, Provider);
	Navigation.registerComponent('TemanDiabets.ThreadTopic', () => ThreadTopic, store, Provider);
	Navigation.registerComponent('TemanDiabets.ModalReplyComment', () => ModalReplyComment, store, Provider);
	Navigation.registerComponent('TemanDiabets.CommentDetails', () => CommentDetails, store, Provider);
	Navigation.registerComponent('TemanDiabets.StepOne', () => StepOne);
	Navigation.registerComponent('TemanDiabets.StepTwo', () => StepTwo);
	Navigation.registerComponent('TemanDiabets.StepThree', () => StepThree);
	Navigation.registerComponent('TemanDiabets.DnurseResult', () => DnurseResult);
	Navigation.registerComponent('TemanDiabets.HistoryHba1c', () => HistoryHba1c, store, Provider);
	Navigation.registerComponent('TemanDiabets.HistoryActivity', () => HistoryActivity, store, Provider);
	Navigation.registerComponent('TemanDiabets.HistoryBloodPressure', () => HistoryBloodPressure, store, Provider);
	Navigation.registerComponent('TemanDiabets.HistoryWeight', () => HistoryWeight, store, Provider);
	Navigation.registerComponent('TemanDiabets.HistoryFoods', () => HistoryFoods, store, Provider);
	Navigation.registerComponent('TemanDiabets.HistoryBloodSugarLevels', () => HistoryBloodSugarLevels, store, Provider);
	Navigation.registerComponent('TemanDiabets.DrugReminder', () => DrugReminder, store, Provider);
	Navigation.registerComponent('TemanDiabets.Notification', () => Notification, store, Provider);
	Navigation.registerComponent('TemanDiabets.ForgotPasswordInputEmail', () => ForgotPasswordInputEmail);
	Navigation.registerComponent('TemanDiabets.ForgotPasswordInputNewPassword', () => ForgotPasswordInputNewPassword);
	Navigation.registerComponent('TemanDiabets.PreviewSearchMakanan', () => PreviewSearchMakanan, store, Provider);
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
