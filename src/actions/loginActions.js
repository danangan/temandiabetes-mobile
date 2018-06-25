import { AsyncStorage, Platform } from 'react-native';
import axios from 'axios';
import firebase from 'react-native-firebase';
import Config from 'react-native-config';
import { GoogleSignin } from 'react-native-google-signin';

import * as ActionTypes from './constants';
import { authToken } from '../utils/constants';
import { API_CURRENT_USER } from '../utils/API';

const loginManual = ({ email, password }) => async dispatch => {
  function onSuccess(currentUser) {
    dispatch({
      type: ActionTypes.LOGIN_MANUAL,
      payload: currentUser
    });
    return currentUser;
  }

  try {
    const loggedInUser = await firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password);

    if (loggedInUser) {
      const firebaseIdToken = await firebase.auth().currentUser.getIdToken();
      const {
        data: {
          data: { currentUser }
        }
      } = await axios.get(API_CURRENT_USER, {
        headers: {
          Authentication: firebaseIdToken
        }
      });

      AsyncStorage.setItem(authToken, firebaseIdToken, error => onSuccess(error));
      return onSuccess(currentUser);
    }
  } catch (error) {
    return onSuccess(error);
  }
};

const signWithGoogle = () => async dispatch => {
  function onSuccess(userFirebase) {
    dispatch({
      type: ActionTypes.SIGN_WITH_GOOGLE,
      payload: userFirebase
    });
    return userFirebase;
  }

  try {
    const data = await GoogleSignin.signIn();

    if (data) {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );
      const {
        additionalUserInfo: { profile, isNewUser }
      } = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      const firebaseIdToken = await firebase.auth().currentUser.getIdToken();
      const {
        data: {
          data: { currentUser }
        }
        // get current user
      } = await axios.get(API_CURRENT_USER, {
        headers: {
          Authentication: firebaseIdToken
        }
      });

      const payloadData = {
        firebaseIdToken,
        profile,
        isNewUser,
        currentUser
      };

      onSuccess(payloadData);

      AsyncStorage.setItem(authToken, firebaseIdToken, error => console.log(error));
      AsyncStorage.setItem('isNewUser', String(isNewUser), error => console.log(error));
    }
  } catch (error) {
    onSuccess(error);
  }
};

const setupGoogleSignIn = () => async () => {
  try {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    const configPlatform = {
      ...Platform.select({
        ios: {
          iosClientId: Config.IOS_GOOGLE_CLIENT_ID
        },
        android: {}
      })
    };

    await GoogleSignin.configure({
      ...configPlatform,
      webClientId: Config.ANDROID_GOOGLE_CLIENT_ID,
      offlineAccess: false
    });
  } catch (err) {
    if (err) throw err.message;
  }
};

const onSignOut = () => async dispatch => {
  function onSuccess() {
    return dispatch({
      type: ActionTypes.USER_LOGOUT,
      payload: true
    });
  }

  try {
    Promise.all([
      GoogleSignin.signOut(),
      firebase.auth().signOut(),
      AsyncStorage.removeItem(authToken)
    ]);

    return onSuccess();
  } catch (error) {
    if (error) throw error;
  }
};

const resetState = () => async dispatch => {
  function onReset() {
    dispatch({
      type: 'RESET_STATE',
      payload: true
    });

    return true;
  }

  try {
    onReset();
  } catch (error) {
    onReset(error);
  }
};

export { loginManual, signWithGoogle, setupGoogleSignIn, onSignOut, resetState };
