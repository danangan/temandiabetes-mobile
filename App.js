import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './src/screens';
import appInitialized from './src/utils/appInitialized';
import configureStore from './src/store/configureStore';

const store = configureStore();
console.disableYellowBox = true;

registerScreens(store, Provider);

export const startApp = (cb = () => {}) => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabetes.OnBoardingScreen',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    animationType: 'fade'
  });

  cb();
};

export const startLoginPage = (cb = () => {}) => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabetes.LoginScreen',
      navigatorStyle: {
        navBarHidden: true
      }
    },
    animationType: 'fade'
  });

  cb();
};

export const mainApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabetes.AppContainer',
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
      screen: 'TemanDiabetes.AppLoader',
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
