import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import Config from 'react-native-config';

const androidGueLoginProd = {
  clientId: '127784416281-epnvn2n12te5amjekdoeki5rbn4vkc4m.apps.googleusercontent.com',
  appId: '1:127784416281:android:29dfe4ef3b1c9465',
  apiKey: 'AIzaSyD2XA3Yg5khVade5Z6pavKptnq3CYAlBj8',
  databaseURL: 'x',
  storageBucket: 'x',
  messagingSenderId: 'x',
  projectId: 'gue-login',
  // enable persistence by adding the below flag
  persistence: true
};

const androidGueLoginDev = {
  clientId: '213564219561-3l1pvr9vtovaa74gdrsvlhctdngj2j9i.apps.googleusercontent.com',
  appId: '1:213564219561:android:29dfe4ef3b1c9465',
  apiKey: 'AIzaSyBJECcyRZgYOKgIeAaIMSswwHJM2nTvRiU',
  databaseURL: 'x',
  projectId: 'gue-login-dev',
  storageBucket: 'x',
  messagingSenderId: 'x',
  // enable persistence by adding the below flag
  persistence: true
};

const iosGueLoginProd = {
  clientId: '127784416281-4dik7n346f48opmidta6ueh8k7n42fvd.apps.googleusercontent.com',
  appId: '1:434697670779:ios:4066eed5cff1a069',
  apiKey: 'AIzaSyD2XA3Yg5khVade5Z6pavKptnq3CYAlBj8',
  databaseURL: 'x',
  storageBucket: 'x',
  messagingSenderId: 'x',
  projectId: 'gue-login',
  // enable persistence by adding the below flag
  persistence: true
};

const iosGueLoginDev = {
  clientId: '213564219561-qj2i7484l67jfddut6c037b7q8qqlkqj.apps.googleusercontent.com',
  appId: '1:213564219561:ios:75f4d557732b78b6',
  apiKey: 'AIzaSyCdLLmCInzUsgxTpQypL6IlA448xmckRmQ',
  databaseURL: 'x',
  storageBucket: 'x',
  messagingSenderId: 'x',
  projectId: 'gue-login-dev',
  // enable persistence by adding the below flag
  persistence: true
};

// Managing Environment firebase
const managingEnv = () => {
  switch (Config.ENV) {
    case 'production':
      return firebase.initializeApp(
        // use platform specific firebase config
        Platform.OS === 'ios' ? iosGueLoginProd : androidGueLoginProd,
        // name of this app
        'guelogin'
      );
    case 'development':
      return firebase.initializeApp(
        // use platform specific firebase config
        Platform.OS === 'ios' ? iosGueLoginDev : androidGueLoginDev,
        // name of this app
        'gueLoginDev'
      );
    default:
      break;
  }
};

export const guelogin = managingEnv();
