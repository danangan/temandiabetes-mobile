import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

import { startApp, mainApp } from '../../App';
import { authToken } from '../utils/constants';
import { API_CALL } from './ajaxRequestHelper';

const appInitialized = async () => {
  startApp();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
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
              const typeUser = res.data.data.currentUser.tipe_user;
              if (typeUser === 'non-diabetesi') {
                mainApp(0);
              } else if (typeUser === 'diabetesi') {
                mainApp(2);
              } else {
                mainApp(0);
              }
            });
          });
        });
    }
  });
};

export default appInitialized;
