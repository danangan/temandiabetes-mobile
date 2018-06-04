import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

import { startApp, mainApp, startLoginPage, mainLoader } from '../../App';
import { authToken } from '../utils/constants';
import { API_CALL } from './ajaxRequestHelper';

const initMainApp = async () => {
  try {
    const val = await AsyncStorage.getItem('goToLoginPage')
    if (val !== null) {
      startLoginPage()
    } else {
      AsyncStorage.setItem('goToLoginPage', 'true')
      startApp()
    }
  } catch (error) {
    await AsyncStorage.setItem('goToLoginPage', 'true')
    const val = await AsyncStorage.getItem('goToLoginPage')
    startApp()
  }
}

const appInitialized = () => {

  mainLoader()

  var timeout = setTimeout(() => {
    initMainApp()
  }, 1200)

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // clear the timeout
      clearTimeout(timeout)
      firebase
        .auth()
        .currentUser.getIdToken()
        .then(firebaseIdToken => {
          AsyncStorage.setItem(authToken, firebaseIdToken).then(() => {
            const option = {
              method: 'get',
              url: 'api/users/getcurrentuser'
            };

            API_CALL(option).then(res => {
              const { tipe_user, is_active } = res.data.data.currentUser;
              if (tipe_user === 'non-diabetesi' && is_active) {
                mainApp(0);
              } else if (tipe_user === 'diabetesi' && is_active) {
                mainApp(2);
              } else if (tipe_user === 'ahli' && is_active) {
                mainApp(0);
              } else {
                startApp();
              }
            });
          });
        });
    }
  });
};

export default appInitialized;
