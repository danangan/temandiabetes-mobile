import axios from 'axios';
import { API_CALL } from '../utils/ajaxRequestHelper';
import {
	GET_LIST_REMINDER,
	CREATE_DRUG_REMINDER,
	UPDATE_DRUG_REMINDER,
	GET_DETAILS_REMINDER
} from './constants';

/**
 * 
 * @param {*} idToken
 */
export const getListReminder = () => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_GET_LIST_REMINDER',
      payload: true
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: GET_LIST_REMINDER,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'get',
      url: 'api/drugs-reminder/all?page=1&limit=12'
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};


/**
 * 
 * @param {*} idToken
 */
export const createDrugReminder = (reminder) => async dispatch => {
	console.log('reminder CREATED ', reminder);
	const isPending = () => {
    dispatch({
      type: 'PENDING_CREATE_DRUG_REMINDER',
      payload: reminder
    });
    return reminder;
	};
	
	function onSuccess(data) {
		dispatch({
			type: CREATE_DRUG_REMINDER,
			payload: data
		});

		return data;
	}

	isPending();
	
	try {
    const option = {
      method: 'post',
			url: 'api/drugs-reminder',
			data: reminder
    };

		const res = await API_CALL(option);
		console.log('BALIKAN CREATE REMINDER ', res);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};

export const updateDrugReminder = (reminder, index) => async dispatch => {
	// console.log('UPDATE REMINDER ', reminder);
	// console.log('indexNYaaa.... ', index);
	const isPending = () => {
    dispatch({
      type: 'PENDING_UPDATE_DRUG_REMINDER',
      payload: reminder
    });
    return reminder;
	};
	
	function onSuccess(data) {
		dispatch({
			type: UPDATE_DRUG_REMINDER,
			payload: { ...data, index }
		});

		return data;
	}

	isPending();
	
	try {
    const option = {
      method: 'put',
			url: 'api/drugs-reminder',
			data: reminder
    };

		const res = await API_CALL(option);
		console.log('BALIKAN UPDATE REMINDER ', res);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};


export const getDetailsReminder = (idReminder) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_GET_DETAILS_REMINDER',
      payload: true
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: GET_DETAILS_REMINDER,
			payload: data
		});

		return data;
	}

	isPending();
	
	try {
    const option = {
      method: 'GET',
			url: `api/drugs-reminder/${idReminder}`,
    };

		const res = await API_CALL(option);
		console.log('BALIKAN DETAILS REMINDER ', res);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};
