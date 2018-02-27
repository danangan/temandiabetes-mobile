import axios from 'axios';
import firebase from 'react-native-firebase';

import * as ActionTypes from './constants';
import { API_SIGN_UP, GET_ID_TOKEN } from '../utils/API';

const registerActionSuccess = data => ({
	type: ActionTypes.REGISTER_USER,
	payload: data
});

const registerAction = userData => {
	console.log('USER DATA ACTONS ', userData);
	return dispatch => {
		axios
			.post(API_SIGN_UP, userData)
			.then(res => {
				console.log('BALIKAN REGISTER ', res);
				dispatch(registerActionSuccess(res));
				dispatch(putTheSipAhli(res.data.idToken));
			})
			.catch(error => dispatch(registerActionSuccess(error)));
	};
};

const registerStepOne = data => ({
	type: ActionTypes.REGISTER_STEP_ONE,
	payload: data
});

const putTheSipSuccess = data => ({
	type: ActionTypes.GET_ID_TOKEN,
	payload: data
});

export const putTheSip = idToken => {
	firebase
		.auth()
		.signInWithCustomToken(idToken)
		.then(res => {
			console.log('BALIKAN AUTH FIREBASE ', res);
		})
		.catch(error => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log('BALIKAN AUTH FIREBASE ', error);
			// ...
		});
};

export { registerAction, registerStepOne };
