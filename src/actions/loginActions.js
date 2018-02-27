import axios from 'axios';
import * as ActionTypes from './constants';
import { API_LOGIN } from '../utils/API';

// const loginManual = (mail, pass) => async (dispatch) => {
//   function onSuccess(data) {
//     dispatch({
//       type: ActionTypes.LOGIN_MANUAL,
//       payload: { email: mail, password: pass }
//     });
//     return data;
//   }

//   function onError(error) {
//     dispatch({ type: ActionTypes.ERROR_GENERATED, payload: error });
//     return error;
//   }

//   try {
//     const data = await axios.post('API_URL', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     return onSuccess(data);
//   } catch (error) {
//     return onError(error);
//   }
// };

const onSuccess = data => ({
	type: ActionTypes.LOGIN_MANUAL,
	payload: data
});

const loginManual = user => {
	console.log('DATA FROM ACTIONS: ', user);
	return dispatch => {
		axios
			.post(API_LOGIN, user)
			.then(res => {
				console.log('RESPONSE FORM ACTIONS: ', res);
				dispatch(onSuccess(res));
			})
			.catch(error => {
        console.log('ERROR FROM ACTIONS: ', error);
				dispatch(onSuccess(error));
			});
	};
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
