import axios from 'axios';
import * as ActionTypes from './constants';
import { API_BASE } from '../utils/API';

const onBoarding = () => async dispatch => {
	function onSuccess(data) {
		return dispatch({
			type: ActionTypes.GET_ON_BOARDING,
			payload: data
		});
	}

	try {
		const instance = axios.create({
			baseURL: API_BASE
		});

    const { data: onboarding } = await instance.get('/api/onboarding');
    return onSuccess(onboarding);
	} catch (error) {
		onSuccess(error);
	}
};

export { onBoarding };
