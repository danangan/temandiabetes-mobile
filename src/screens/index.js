import { Navigation } from 'react-native-navigation';

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
import FeatureDetail from '../screens/forum/staticThreadDetail';
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
import Request from '../screens/profileScreen/innerCircle/innerCircleList/TabRequest';
import InviteFriend from '../screens/profileScreen/inviteFriends';
import AppLoader from '../screens/AppLoader';
import CreateAsuransi from '../screens/CreateAsuransi';
import InsuranceCatalogDetail from '../screens/insuranceCatalogDetail';

export function registerScreens(store, Provider) {
  Navigation.registerComponent('TemanDiabetes.AppLoader', () => AppLoader, store, Provider);
  Navigation.registerComponent('TemanDiabetes.AppContainer', () => AppContainer, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.OnBoardingScreen',
    () => OnBoardingScreen,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.LoginScreen', () => LoginScreen, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.RegisterScreen',
    () => RegisterScreen,
    store,
    Provider
  );
  Navigation.registerComponent(
    'TemanDiabetes.RegisterScreenSecond',
    () => RegisterScreenSecond,
    store,
    Provider
  );
  Navigation.registerComponent(
    'TemanDiabetes.RegisterScreenThird',
    () => RegisterScreenThird,
    store,
    Provider
  );
  Navigation.registerComponent(
    'TemanDiabetes.RegisterScreenFourth',
    () => RegisterScreenFourth,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.RegisterFive', () => RegisterFive, store, Provider);
  Navigation.registerComponent('TemanDiabetes.ThreadDetails', () => ThreadDetails, store, Provider);
  Navigation.registerComponent('TemanDiabetes.ModalSearch', () => ModalSearch, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.ModalPostThread',
    () => ModalPostThread,
    store,
    Provider
  );
  Navigation.registerComponent(
    'TemanDiabetes.ModalPostComment',
    () => ModalPostComment,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.ModalReport', () => ModalReport, store, Provider);
  Navigation.registerComponent('TemanDiabetes.FeaturedDetail', () => FeatureDetail);
  Navigation.registerComponent('TemanDiabetes.ProfileScreen', () => ProfileScreen, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.ProfileDetails',
    () => ProfileDetails,
    store,
    Provider
  );
  Navigation.registerComponent(
    'TemanDiabetes.ProfileSettings',
    () => ProfileSettings,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.EditProfile', () => EditProfile, store, Provider);
  Navigation.registerComponent('TemanDiabetes.AboutScreen', () => AboutScreen);
  Navigation.registerComponent('TemanDiabetes.FaqScreen', () => FaqScreen);
  Navigation.registerComponent('TemanDiabetes.ProductDetail', () => ProductDetail);
  Navigation.registerComponent('TemanDiabetes.LightBox', () => LightBox);
  Navigation.registerComponent('TemanDiabetes.InnerCircle', () => InnerCircle, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.InnerCircleList',
    () => InnerCircleList,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.ThreadTopic', () => ThreadTopic, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.ModalReplyComment',
    () => ModalReplyComment,
    store,
    Provider
  );
  Navigation.registerComponent(
    'TemanDiabetes.CommentDetails',
    () => CommentDetails,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.StepOne', () => StepOne);
  Navigation.registerComponent('TemanDiabetes.StepTwo', () => StepTwo);
  Navigation.registerComponent('TemanDiabetes.StepThree', () => StepThree);
  Navigation.registerComponent('TemanDiabetes.DnurseResult', () => DnurseResult, store, Provider);
  Navigation.registerComponent('TemanDiabetes.HistoryHba1c', () => HistoryHba1c, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.HistoryActivity',
    () => HistoryActivity,
    store,
    Provider
  );
  Navigation.registerComponent(
    'TemanDiabetes.HistoryBloodPressure',
    () => HistoryBloodPressure,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.HistoryWeight', () => HistoryWeight, store, Provider);
  Navigation.registerComponent('TemanDiabetes.HistoryFoods', () => HistoryFoods, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.HistoryBloodSugarLevels',
    () => HistoryBloodSugarLevels,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.DrugReminder', () => DrugReminder, store, Provider);
  Navigation.registerComponent('TemanDiabetes.Notification', () => Notification, store, Provider);
  Navigation.registerComponent(
    'TemanDiabetes.ForgotPasswordInputEmail',
    () => ForgotPasswordInputEmail
  );
  Navigation.registerComponent(
    'TemanDiabetes.ForgotPasswordInputNewPassword',
    () => ForgotPasswordInputNewPassword
  );
  Navigation.registerComponent(
    'TemanDiabetes.PreviewSearchMakanan',
    () => PreviewSearchMakanan,
    store,
    Provider
  );
  Navigation.registerComponent('TemanDiabetes.Notification', () => Notification, store, Provider);
  Navigation.registerComponent('TemanDiabetes.Request', () => Request, store, Provider);
  Navigation.registerComponent('TemanDiabetes.InviteFriends', () => InviteFriend);
  Navigation.registerComponent('TemanDiabetes.CreateAsuransi', () => CreateAsuransi);
  Navigation.registerComponent('TemanDiabetes.InsuranceCatalogDetail', () => InsuranceCatalogDetail);
}
