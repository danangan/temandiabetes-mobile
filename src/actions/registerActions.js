import firebase from 'react-native-firebase';
import axios from 'axios';

import * as ActionTypes from './constants';
import { API_SIGN_UP, API_SIGN_IN } from '../utils/API';

// const signAction = idToken => {
// 	firebase
// 		.auth()
// 		.signInWithCustomToken(idToken)
// 		.then(res => {
// 			console.log("BALIKAN FIREBASE ", res)
// 		})
// 		.catch(error => {
// 			// Handle Errors here.
// 			const errorCode = error.code;
// 			const errorMessage = error.message;
// 			console.log("ERROR FIREBASE ", error)
// 			console.log('TOKEN : ', token, idToken);
// 			// ...
// 		});
// };

const registerActionSuccess = data => ({
	type: ActionTypes.REGISTER_USER,
	payload: data
});

const registerAction = userData => {
	console.log('ADAA... ', userData);
	return dispatch => {
		axios
			.post(API_SIGN_UP, userData)
			.then(res => {
				console.log('ADA TOKEN ', res);
				dispatch(registerActionSuccess(res));
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

export { registerAction, registerStepOne };
