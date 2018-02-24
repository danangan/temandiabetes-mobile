import axios from 'axios';

import * as ActionTypes from './constants';
import { API_SIGN_UP } from '../utils/API';

const registerActionSuccess = data => ({
	type: ActionTypes.REGISTER_USER,
	payload: data
});

const registerAction = userData => {
	return dispatch => {
		axios
			.post(API_SIGN_UP, userData)
			.then(res => dispatch(registerActionSuccess(res)))
			.catch(error => dispatch(registerActionSuccess(error)));
	};
};

const registerStepOne = data => ({
	type: ActionTypes.REGISTER_STEP_ONE,
	payload: data
});

export { registerAction, registerStepOne };
