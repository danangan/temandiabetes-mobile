import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { GET_CURRENT_USER } from './constants';
import { API_BASE } from '../utils/API';
import { authToken } from '../utils/constants';

export const getCurrentUser = () => async dispatch => {
  const token = await AsyncStorage.getItem(authToken);

  function onSuccess(data) {
		dispatch({
			type: GET_CURRENT_USER,
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
    const request = await instance.get('api/users/getcurrentuser');
    console.log('RESPONSE CURRENT USER', request);
    onSuccess(request.data.data);
  } catch (error) {
    onSuccess(error);
  }
};
