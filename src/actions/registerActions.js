import axios from 'axios';
import firebase from 'react-native-firebase';

import * as ActionTypes from './constants';
import { API_SIGN_UP, GET_ID_TOKEN } from '../utils/API';

const registerActionSuccess = data => ({
	type: ActionTypes.REGISTER_USER,
	payload: data
});

const registerAction = userData => {
	return dispatch => {
			fetch(API_SIGN_UP, {
				body: JSON.stringify(userData),
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST'
			})
			.then(res => res.json())
			.then(res => {
				dispatch(registerActionSuccess(res));
				// dispatch(putTheSipAhli(res.data.idToken));
			})
			.catch(error => {
				dispatch(registerActionSuccess(error));
			});
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

export const putTheSip = idToken => dispatch => {
	firebase
		.auth()
		.signInWithCustomToken(idToken)
		.then(res => {
			dispatch(putTheSipSuccess(res));
		})
		.catch(error => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			dispatch(putTheSipSuccess(error.response));
			// ...
		});
};

export { registerAction, registerStepOne };
