import * as ActionTypes from './constants';
import { API_CALL } from '../utils/ajaxRequestHelper';

export const getHistoryHba1c = () => async dispatch => {
  function onSuccess(hba1c) {
    dispatch({
      type: ActionTypes.GET_HISTORY_HBA1C,
      payload: hba1c
    });

    return hba1c;
  }

  try {
    const option = {
      method: 'GET',
      url: '/api/hba1c-tracker'
    };

    const {
      data: {
        data: { hba1c }
      }
    } = await API_CALL(option);
    return onSuccess(hba1c);
  } catch (error) {
    return onSuccess(error);
  }
};

export const getHistoryActivity = () => async dispatch => {
  function onSuccess(activity) {
    dispatch({
      type: ActionTypes.GET_HISTORY_ACTIVITY,
      payload: activity
    });

    return activity;
  }

  try {
    const option = {
      method: 'GET',
      url: 'api/body-activity-tracker'
    };

    const {
      data: {
        data: { bodyActivity }
      }
    } = await API_CALL(option);
    return onSuccess(bodyActivity);
  } catch (error) {
    return onSuccess(error);
  }
};

export const getHistoryBloodPressure = () => async dispatch => {
  function onSuccess(bloodPressure) {
    dispatch({
      type: ActionTypes.GET_HISTORY_BLOOD_PRESSURE,
      payload: bloodPressure
    });

    return bloodPressure;
  }

  try {
    const option = {
      method: 'GET',
      url: 'api/blood-pressure-tracker'
    };

    const {
      data: {
        data: { bloodPressure }
      }
    } = await API_CALL(option);
    return onSuccess(bloodPressure);
  } catch (error) {
    return onSuccess(error);
  }
};

export const getHistoryWeight = () => async dispatch => {
  function onSuccess(weight) {
    dispatch({
      type: ActionTypes.GET_HISTORY_WEIGHT,
      payload: weight
    });

    return weight;
  }

  try {
    const option = {
      method: 'GET',
      url: 'api/body-weight-tracker'
    };

    const {
      data: {
        data: { bodyWeight }
      }
    } = await API_CALL(option);
    return onSuccess(bodyWeight);
  } catch (error) {
    return onSuccess(error);
  }
};

export const getHistoryFoods = () => async dispatch => {
  function onSuccess(foods) {
    dispatch({
      type: ActionTypes.GET_HISTORY_FOODS,
      payload: foods
    });

    return foods;
  }

  try {
    const option = {
      method: 'GET',
      url: 'api/food-tracker'
    };

    const {
      data: {
        data: { food }
      }
    } = await API_CALL(option);
    return onSuccess(food);
  } catch (error) {
    return onSuccess(error);
  }
};

export const getHistoryBloodSugarLevels = () => async dispatch => {
  function onSuccess(bloods) {
    dispatch({
      type: ActionTypes.GET_BLOOD_GLUCOSE_GRAPH,
      payload: bloods
    });

    return bloods;
  }

  try {
    const option = {
      method: 'GET',
      url: 'api/blood-glucose-tracker/graph?scroll=12'
    };

    const {
      data: { data }
    } = await API_CALL(option);
    onSuccess(data);
  } catch (error) {
    return onSuccess(error);
  }
};

export const resetStateHistory = () => async dispatch => {
  function onReset() {
    dispatch({
      type: 'RESET_STATE',
      payload: true
    });

    return true;
  }

  try {
    onReset();
  } catch (error) {
    onReset(error);
  }
};
