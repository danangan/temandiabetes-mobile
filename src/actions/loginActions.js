import { AsyncStorage, Platform, Alert } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

import * as ActionTypes from './constants';
import { authToken } from '../utils/constants';
import { guelogin } from '../utils/GueLogin';
import { API_CURRENT_USER } from '../utils/API';
import { updateFCMToken } from './authAction';

const loginManual = ({ email, password }) => async dispatch => {
  function onSuccess(currentUser) {
    dispatch({
      type: ActionTypes.LOGIN_MANUAL,
      payload: currentUser
    });
    return currentUser;
  }

  try {
    const loggedInUser = await guelogin
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password);

    if (loggedInUser) {
      const firebaseIdToken = await guelogin.auth().currentUser.getIdToken();
      const {
        data: {
          data: { currentUser }
        }
      } = await axios.get(API_CURRENT_USER, {
        headers: {
          Authentication: firebaseIdToken
        }
      });

      AsyncStorage.setItem(authToken, firebaseIdToken);
      onSuccess(currentUser);
    }
  } catch (error) {
    const parsed = JSON.parse(JSON.stringify(error));
    onSuccess(parsed);
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
    // set loading to true
    dispatch({
      type: ActionTypes.SET_LOGIN_LOADING,
      payload: { loading: true }
    });

    const data = await GoogleSignin.signIn();

    if (data) {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      const {
        additionalUserInfo: { profile, isNewUser }
      } = await guelogin.auth().signInAndRetrieveDataWithCredential(credential);

      const firebaseIdToken = await guelogin.auth().currentUser.getIdToken();
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

      // set this flag to redirect user to onboarding when user kills apps
      await AsyncStorage.setItem('isNewUser', String(isNewUser));

      onSuccess(payloadData);
    }
  } catch (error) {
    if (error.message === 'DEVELOPER_ERROR') {
      Alert.alert('Error', 'Login via Google gagal.');
    }
    dispatch({
      type: ActionTypes.SET_LOGIN_LOADING,
      payload: { loading: false }
    });
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

const signWithFacebook = () => async dispatch => {
  function onSuccess(user) {
    return dispatch({
      type: ActionTypes.SIGN_WITH_FACEBOOK,
      payload: user
    });
  }

  function onError() {
    Alert.alert('Error', 'Login via Facebook gagal.');
    dispatch({
      type: ActionTypes.SET_LOGIN_LOADING,
      payload: { loading: false }
    });
  }

  try {
    // set loading to true
    dispatch({
      type: ActionTypes.SET_LOGIN_LOADING,
      payload: { loading: true }
    });

    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      dispatch({
        type: ActionTypes.SET_LOGIN_LOADING,
        payload: { loading: false }
      });
      return Promise.reject(new Error('The user cancelled the request'));
    }

    const data = await AccessToken.getCurrentAccessToken();
    const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
    const {
      additionalUserInfo: { profile, isNewUser }
    } = await guelogin.auth().signInAndRetrieveDataWithCredential(credential);

    const firebaseIdToken = await guelogin.auth().currentUser.getIdToken();
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

    // set this flag to redirect user to onboarding when user kills apps
    await AsyncStorage.setItem('isNewUser', String(isNewUser));

    onSuccess(payloadData);
  } catch (error) {
    onError();
  }
};

const onSignOut = ({ userId }) => async dispatch => {
  function onSuccess() {
    return dispatch({
      type: ActionTypes.USER_LOGOUT,
      payload: true
    });
  }

  const callback = async () => {
    try {
      Promise.all([
        GoogleSignin.signOut(),
        LoginManager.logOut(),
        guelogin.auth().signOut(),
        AsyncStorage.removeItem(authToken)
      ]);
      return onSuccess();
    } catch (error) {
      if (error) throw error;
    }
  };

  dispatch(updateFCMToken({
    userId,
    callback,
    token: {
      messagingRegistrationToken: '',
    },
  }));
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

export { loginManual, signWithGoogle, setupGoogleSignIn, onSignOut, resetState, signWithFacebook };
