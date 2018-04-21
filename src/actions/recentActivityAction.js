import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { API_BASE } from '../utils/API';
import {
  GET_USER_RECENT_THREADS,
  GET_USER_RECENT_COMMENTS,
} from './constants';
import { authToken } from '../utils/constants';

export const getUserRecentThread = (userId) => async dispatch => {
  const token = await AsyncStorage.getItem(authToken);

  const isPending = () => {
    dispatch({
      type: 'PENDING_GET_USER_RECENT_THREADS',
      payload: true
    });
    return true;
  };

  function onSuccess(data) {
		dispatch({
			type: GET_USER_RECENT_THREADS,
			payload: data
		});

		return data;
  }
  
  isPending();

  try {
    const instance = axios.create({
      baseURL: API_BASE,
      headers: {
        authentication: token
      }
    });
    const request = await instance.get(`api/users/${userId}/recent-activity/thread?page=1&limit=10&`);
    console.log('RESPONSE CURRENT USER', request);
    onSuccess(request.data.data);
  } catch (error) {
    onSuccess(error);
  }
}

export const getUserRecentComment = (userId) => async dispatch => {
  const token = await AsyncStorage.getItem(authToken);

  const isPending = () => {
    dispatch({
      type: 'PENDING_GET_USER_RECENT_COMMENTS',
      payload: true
    });
    return true;
  };

  function onSuccess(data) {
		dispatch({
			type: GET_USER_RECENT_COMMENTS,
			payload: data
		});

		return data;
  }
  
  isPending();

  try {
    const instance = axios.create({
      baseURL: API_BASE,
      headers: {
        authentication: token
      }
    });
    const request = await instance.get(`api/users/${userId}/recent-activity/comment?page=1&limit=10&`);
    console.log('RESPONSE CURRENT USER', request);
    onSuccess(request.data.data);
  } catch (error) {
    onSuccess(error);
  }
}