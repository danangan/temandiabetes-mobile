import { API_CALL } from '../utils/ajaxRequestHelper';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { GET_CURRENT_USER, UPDATE_FCM_TOKEN } from './constants';
import { API_BASE } from '../utils/API';
import { authToken } from '../utils/constants';

export const addNotificationCount = () => dispatch => {
  dispatch({
    type: 'ADD_NOTIFICATION_COUNT'
  })
}

export const getCurrentUser = () => async dispatch => {
  function onSuccess(data) {
		dispatch({
			type: GET_CURRENT_USER,
			payload: data
		});

		return data;
	}

  try {
    const option = {
      method: 'get',
      url: 'api/users/getcurrentuser'
    };
    const { data : { data }} = await API_CALL(option);
    onSuccess(data);

    // dispatch action to get notification count here
    if (data.currentUser) {
      dispatch(getNotificationCount(data.currentUser._id))
    }
  } catch (error) {
    onSuccess(error);
  }
};

/**
 * Update FCM Token
 */
export const updateFCMToken = (params) => async dispatch => {
  // console.log('PARAMETER FCM ', params);
  const token = await AsyncStorage.getItem(authToken);

  function onSuccess(data) {
		dispatch({
			type: UPDATE_FCM_TOKEN,
			payload: data
		});

		return data;
	}

  try {

    const option = {
      method: 'put',
      url: `api/users/${params.idUser || params.userId}`,
      data: params.token
    };

    const {data: { data }} = await API_CALL(option)
    onSuccess(data);
  } catch (error) {
    onSuccess(error);
  }
};

export const getNotificationCount = (userId) => async dispatch => {
  try {
    const option = {
      method: 'get',
      url: `/api/notification/${userId}/count/is-new`,
    };

    const { data: { data : { totalNewNotification }} } = await API_CALL(option);

    dispatch({
      type: 'SET_NOTIFICATION_COUNT',
      payload: totalNewNotification
    })
  } catch (error) {
    console.log(error)
  }
}

export const resetNotificationCount = (userId) => async dispatch => {
  try {
    const option = {
      method: 'put',
      url: `/api/notification/${userId}/update-count-new`,
    };

    await API_CALL(option);

    dispatch({
      type: 'RESET_NOTIFICATION_COUNT',
    })
  } catch (error) {
    console.log(error)
  }
}

