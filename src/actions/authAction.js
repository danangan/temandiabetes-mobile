import { API_CALL } from '../utils/ajaxRequestHelper';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { GET_CURRENT_USER, UPDATE_FCM_TOKEN } from './constants';
import { API_BASE } from '../utils/API';
import { authToken } from '../utils/constants';

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
    const request = await API_CALL(option);
    onSuccess(request.data.data);
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
    const instance = axios.create({
      baseURL: API_BASE,
      headers: {
        authentication: token
      }
    });
    const request = await instance.put(`api/users/${params.idUser}`, params.token);
    console.log('RESPONSE UPDATE FCM TOKEN', request);
    onSuccess(request.data.data);
  } catch (error) {
    onSuccess(error);
  }
};
