import * as ActionTypes from './constants';
import { API_CALL } from '../utils/ajaxRequestHelper';

/**
 * 
 * @param {*}  REGISTER ACTION
 */
export const registerAction = (value) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_REGISTER_USER',
      payload: value
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: ActionTypes.REGISTER_USER,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'POST',
      url: 'api/sign-up',
      data: value
    };

		const res = await API_CALL(option);
		console.log('REGISTER BALIKAN ', res);
		return onSuccess(res.data);
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

