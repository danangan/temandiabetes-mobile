import { API_CALL } from '../utils/ajaxRequestHelper';
import {
	INPUT_TRACKER_MANUALLY,
} from './constants';

/**
 * 
 * @param {*} idToken
 */
export const inputTrackerManually = ({ method, value }) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_INPUT_TRACKER_MANUALLY',
      payload: true
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: INPUT_TRACKER_MANUALLY,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method,
      url: 'api/blood-pressure-tracker',
      data: value
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};

