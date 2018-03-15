import { AsyncStorage } from 'react-native';
import axios from 'axios';
import firebase from 'react-native-firebase';
import * as ActionTypes from './constants';

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

// 	try {
// 		const data = await axios.post('API_URL', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			}
// 		});
// 		return onSuccess(data);
// 	} catch (error) {
// 		// return onError(error);
// 		console.log(error);
// 	}
// };

// const onSuccess = data => ({
// 	type: ActionTypes.LOGIN_MANUAL,
// 	payload: data
// });

const loginManual = ({ email, password }) => async dispatch => {
	try {
		const loggedInUser = await firebase
			.auth()
			.signInAndRetrieveDataWithEmailAndPassword(email, password);

		if (loggedInUser) {
			const firebaseIdToken = await firebase.auth().currentUser.getIdToken();
			const options = {
				headers: {
					Authentication: firebaseIdToken
				}
			};

			const { data: { data: { currentUser } } } = await axios.get(
				'https://development-dot-temandiabetes.appspot.com/api/users/getcurrentuser',
				options
			);
			AsyncStorage.setItem('idToken', firebaseIdToken);
			dispatch({
				type: ActionTypes.LOGIN_MANUAL,
				payload: currentUser
			});
		}
	} catch (error) {
		console.log('Login fail with error:', error);
	}
};

const loginOauth = (mail, pass) => async dispatch => {
	function onSuccess(data) {
		dispatch({
			type: ActionTypes.LOGIN_OAUTH,
			payload: { email: mail, password: pass }
		});
		return data;
	}

	function onError(error) {
		dispatch({ type: ActionTypes.ERROR_GENERATED, payload: error });
		return error;
	}

	try {
		const data = await axios('API_URL', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return onSuccess(data);
	} catch (error) {
		return onError(error);
	}
};

export { loginManual, loginOauth };
