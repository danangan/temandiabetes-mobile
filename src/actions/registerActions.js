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
		return onSuccess(res.data);
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

export const registerNama = (nama) => async dispatch => {
	function onSuccess(data) {
		dispatch({
			type: 'REGISTER_NAMA',
			payload: data
		});

		return data;
	}

	try {
		return onSuccess(nama);
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

export const registerEmail = (email) => async dispatch => {
	function onSuccess(data) {
		dispatch({
			type: 'REGISTER_EMAIL',
			payload: data
		});

		return data;
	}

	try {
		return onSuccess(email);
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

export const registerPassword = (password, typePassword) => async dispatch => {
	function onSuccess(data) {
		dispatch({
			type: 'REGISTER_PASSWORD',
			payload: data
		});

		return data;
	}

	try {
		return onSuccess({ password, typePassword });
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

export const registerSip = (sip) => async dispatch => {
	function onSuccess(data) {
		dispatch({
			type: 'REGISTER_SIP',
			payload: data
		});

		return data;
	}

	try {
		onSuccess(sip);
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

export const clearDataRegister = (type) => async dispatch => {
	function onSuccess(data) {
		dispatch({
			type,
			payload: true
		});

		return data;
	}
	onSuccess();
};

export const emailAlreadyRegistered = (emailCheck) => async dispatch => {
	const isPending = () => {
		dispatch({
			type: 'PENDING_EMAIL_ALREADY_REGISTERED',
			payload: emailCheck
		});
		return true;
	};

	function onSuccess(data) {
		dispatch({
			type: ActionTypes.EMAIL_ALREADY_REGISTERED,
			payload: data
		});

		return data;
	}

	isPending();

	try {
		const option = {
			method: 'GET',
			url: `api/users/does-email-exist/${emailCheck}`,
		};

		const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		const errMsg = {
			err: error,
			status_code: 500
		};
		onSuccess(errMsg);
	}
};

