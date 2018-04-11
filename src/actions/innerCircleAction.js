import { AsyncStorage } from 'react-native';
import axios from 'axios';

import * as ActionTypes from './constants';
import { authToken } from '../utils/constants';
import { API_BASE } from '../utils/API';

export const getInnerCirle = id => async dispatch => {
	function onSuccess(data) {
		dispatch({
			type: ActionTypes.GET_LIST_INNER_CIRCLE,
			payload: data
		});

		return data;
	}

	try {
		const instance = axios.create({
			baseURL: API_BASE,
			headers: {
				authentication: authToken,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		const userID = id;
    const { data: { innerCircles } } = await instance.get(`api/users/${userID}/innercircles`);
    
    return onSuccess(innerCircles);
	} catch (error) {
		return onSuccess(error);
	}
};
