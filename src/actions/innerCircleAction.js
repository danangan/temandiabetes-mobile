import axios from 'axios';

import * as ActionTypes from './constants';
import { API_BASE } from '../utils/API';

export const getInnerCircle = (userID, idToken) => async dispatch => {
	function onSuccess(innerCircles) {
		dispatch({
			type: ActionTypes.GET_INNER_CIRCLE,
			payload: innerCircles
		});

		return innerCircles;
	}

	try {
		const instance = axios.create({
			baseURL: API_BASE,
			headers: {
				authentication: idToken,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		const { data } = await instance.get(
			`api/users/${userID}/innercircles`
		);

		return onSuccess(data);
	} catch (error) {
		return onSuccess(error);
	}
};
