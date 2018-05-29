import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens, registerScreenVisibilityListener } from './src/screens';
import appInitialized from './src/utils/appInitialized';
import configureStore from './src/store/configureStore';

const store = configureStore();
console.disableYellowBox = true;

registerScreens(store, Provider);
registerScreenVisibilityListener();

export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabets.OnBoardingScreen',
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
};

export const mainApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'TemanDiabets.AppContainer',
      navigatorStyle: {
        navBarHidden: true
      }
    }
  });
};

export const appRegistry = () => {
  appInitialized();
};
