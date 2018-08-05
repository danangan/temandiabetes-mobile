import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import Config from 'react-native-config';

const iosConfig = {
    clientId: '127784416281-4dik7n346f48opmidta6ueh8k7n42fvd.apps.googleusercontent.com',
    appId: '1:434697670779:ios:4066eed5cff1a069',
    apiKey: 'AIzaSyD2XA3Yg5khVade5Z6pavKptnq3CYAlBj8',
    databaseURL: 'x',
    storageBucket: 'x',
    messagingSenderId: 'x',
    projectId: 'gue-login',
    // enable persistence by adding the below flag
    persistence: true,
};

  // pluck values from your `google-services.json` file you created on the firebase console
const androidConfig = {
    clientId: '127784416281-epnvn2n12te5amjekdoeki5rbn4vkc4m.apps.googleusercontent.com',
    // appId: '1:127784416281:android:feace3a7c1886f1a',
    appId: '1:127784416281:android:29dfe4ef3b1c9465',
    apiKey: 'AIzaSyD2XA3Yg5khVade5Z6pavKptnq3CYAlBj8',
    databaseURL: 'x',
    storageBucket: 'x',
    messagingSenderId: 'x',
    projectId: 'gue-login',
    // enable persistence by adding the below flag
    persistence: true,
};

// use guelogin auth for production only
export const guelogin = Config.ENV === 'production' ? firebase.initializeApp(
  // use platform specific firebase config
  Platform.OS === 'ios' ? iosConfig : androidConfig,
  // name of this app
  'guelogin',
) : firebase;
