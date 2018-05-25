import { API_CALL } from '../utils/ajaxRequestHelper';
import {
	INPUT_TRACKER_BLOOD_PREASURE,
	INPUT_TRACKER_BLOOD_GLUCOSE,
	INPUT_TRACKER_HBA1C,
	INPUT_TRACKER_FOOD,
	INPUT_TRACKER_ACTIVITY,
	INPUT_TRACKER_WEIGHT,
	GET_FOOD_SUGGESTION
} from './constants';

/**
 * 
 * @param {*} BLOOD PREASURE
 */
export const inputTrackerBloodPressure = (value) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_INPUT_TRACKER_BLOOD_PREASURE',
      payload: value
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: INPUT_TRACKER_BLOOD_PREASURE,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'POST',
      url: 'api/blood-pressure-tracker',
      data: value
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};

/**
 * 
 * @param {*} BLOOD PREASURE
 */
export const inputTrackerBloodGlucose = (value) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_INPUT_TRACKER_BLOOD_GLUCOSE',
      payload: true
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: INPUT_TRACKER_BLOOD_GLUCOSE,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'POST',
      url: 'api/blood-glucose-tracker',
      data: value
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};

/**
 * 
 * @param {*} HBA1C TRACKER
 */
export const inputTrackerHba1c = (value) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_INPUT_TRACKER_HBA1CE',
      payload: true
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: INPUT_TRACKER_HBA1C,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'POST',
      url: 'api/hba1c-tracker',
      data: value
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};

/**
 * 
 * @param {*} FOOD TRACKER
 */
export const inputTrackerFood = (value) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_INPUT_TRACKER_FOOD',
      payload: value
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: INPUT_TRACKER_FOOD,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'POST',
      url: 'api/food-tracker',
      data: value
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};

/**
 * 
 * @param {*} ACTIVITY TRACKER
 */
export const inputTrackerActivity = (value) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_INPUT_TRACKER_ACTIVITY',
      payload: value
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: INPUT_TRACKER_ACTIVITY,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'POST',
      url: 'api/body-activity-tracker',
      data: value
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};

/**
 * 
 * @param {*}  WIGHT TRACKER
 */
export const inputTrackerWeight = (value) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_INPUT_TRACKER_WEIGHT',
      payload: value
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: INPUT_TRACKER_WEIGHT,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'POST',
      url: 'api/body-weight-tracker',
      data: value
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};


/**
 * 
 * get suggetion
 */
export const getFoodSuggetion = (keyword) => async dispatch => {
	const isPending = () => {
    dispatch({
      type: 'PENDING_GET_FOOD_SUGGESTION',
      payload: true
    });
    return true;
	};
	
	function onSuccess(data) {
		dispatch({
			type: GET_FOOD_SUGGESTION,
			payload: data
		});

		return data;
	}

	isPending();

	try {
    const option = {
      method: 'GET',
      url: `api/food/suggest?name=${keyword}`,
    };

    const res = await API_CALL(option);
		return onSuccess(res.data);
	} catch (error) {
		onSuccess(error);
	}
};

