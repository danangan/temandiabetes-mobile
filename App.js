import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
import appInitialized from './src/utils/appInitialized';
import configureStore from './src/store/configureStore';

const store = configureStore();
console.disableYellowBox = true;

registerScreens(store, Provider);

export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabets.OnBoardingScreen',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    animationType: 'fade'
  });
};

export const startLoginPage = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabets.LoginScreen',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    animationType: 'fade'
  });
};

export const mainApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabets.AppContainer',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    animationType: 'fade'
  });
};

export const mainLoader = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabets.AppLoader',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    animationType: 'fade'
  });
};

export const appRegistry = () => {
  appInitialized();
};
