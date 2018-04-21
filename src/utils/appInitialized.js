import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

import { startApp, mainApp } from '../../App';
import { authToken } from '../utils/constants';



const appInitialized = async () => {
  startApp();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.auth().currentUser.getIdToken().then((firebaseIdToken) => {
        AsyncStorage.setItem(authToken, firebaseIdToken).then(() => {
          mainApp();
        })
      })
    }
  })

};

export default appInitialized;
