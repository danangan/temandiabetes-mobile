import { AsyncStorage } from 'react-native';
import axios from 'axios';
import firebase from 'react-native-firebase';
<<<<<<< HEAD
import Config from 'react-native-config';
import { GoogleSignin } from 'react-native-google-signin';
=======
import * as ActionTypes from './constants';
import { authToken } from '../utils/constants';

// const loginManual = ({ email, password }) => async dispatch => {
// 	const loggedInUser = await firebase
// 		.auth()
// 		.signInAndRetrieveDataWithEmailAndPassword(email, password);

// 	function onSuccess({ currentUser }) {
// 		dispatch({
// 			type: ActionTypes.LOGIN_MANUAL,
// 			payload: currentUser
// 		});
// 		return currentUser;
// 	}
>>>>>>> 353b37e9e2c9b544d467f10927a9e129f02e9f57

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

		console.log('DATA FROM ACTIONS: ', loggedInUser);
		if (loggedInUser) {
			const firebaseIdToken = await firebase.auth().currentUser.getIdToken();
			const { data: { data: { currentUser } } } = await axios.get(API_CURRENT_USER, {
				headers: {
					Authentication: firebaseIdToken
				}
<<<<<<< HEAD
=======
			};

			const { data: { data: { currentUser } } } = await axios.get(
				'https://development-dot-temandiabetes.appspot.com/api/users/getcurrentuser',
				options
			);
			AsyncStorage.setItem(authToken, firebaseIdToken);
			dispatch({
				type: ActionTypes.LOGIN_MANUAL,
				payload: currentUser
>>>>>>> 353b37e9e2c9b544d467f10927a9e129f02e9f57
			});

			console.log('CURRENT USER: ', currentUser);
			AsyncStorage.setItem(authToken, firebaseIdToken, error => onSuccess(error));
			return onSuccess(currentUser);
		}
	} catch (error) {
		return onSuccess(error);
	}
};

const loginOauth = () => async dispatch => {
	function onSuccess(userFirebase) {
		dispatch({
			type: ActionTypes.LOGIN_OAUTH,
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
			const userFirebase = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
			const firebaseIdToken = await firebase.auth().currentUser.getIdToken();
			// const { data: { data: { currentUser } } } = await axios.get(API_CURRENT_USER, {
			// 	headers: {
			// 			Authentication: firebaseIdToken
			// 		}
			// 	});
				
			// 	const payloadData = {
			// 			firebaseIdToken,
			// 			userFirebase
			// 			currentUser
			// 		};
			console.log('DATA FROM ACTIONS: ', firebaseIdToken);
			
			AsyncStorage.setItem(authToken, firebaseIdToken, error => onSuccess(error));
			return onSuccess(userFirebase);
		}

	} catch (error) {
		console.log(error);
		// return onSuccess(error);
	}
};

const setupGoogleSignIn = () => async () => {
	try {
		await GoogleSignin.hasPlayServices({ autoResolve: true });
		await GoogleSignin.configure({
			webClientId: Config.ANDROID_GOOGLE_CLIENT_ID,
			iosClientId: Config.IOS_GOOGLE_CLIENT_ID,
			offlineAccess: false
		});
	} catch (err) {
		if (err) throw err.message;
	}
};

const onFirebaseSignOut = () => async () => {
	try {
		await GoogleSignin.revokeAccess();
		await GoogleSignin.signOut();
		await firebase.auth().signOut();
		await AsyncStorage.removeItem(authToken);
	} catch (error) {
		if (error) throw error;
	}
};

export { loginManual, loginOauth, setupGoogleSignIn, onFirebaseSignOut };
