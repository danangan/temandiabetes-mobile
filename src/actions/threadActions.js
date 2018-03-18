import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { GET_THREADS, POST_THREDS } from './constants';
import { API_BASE_DEVELOPMENT } from '../utils/API';
import { authToken } from '../utils/constants';

const getToken = async () => {
  const token = await AsyncStorage.getItem(authToken);
  return token;
};


const getThreadsSuccess = (data) => ({
  type: GET_THREADS,
  payload: data
});

export const getThreads = (token) => {
  // const tokenAda = await getToken();
  // console.log('ADA TOKEN INI ', tokenAda);
  const instance = axios.create({
    baseURL: API_BASE_DEVELOPMENT,
    headers: {
      'authentication': token
    }
  });

  return dispatch => (
    instance.get('/api/threads')
      .then(res => {
        const threadsPayload = {
          status_code: res.status,
          message: res.data.data.message,
          threads: res.data.data.threads
        };
        console.log("ini balikan dari GET THREADS", threadsPayload);
        dispatch(getThreadsSuccess(threadsPayload))
      })
      .catch(err => dispatch(getThreadsSuccess(err)))
  );
};

const postThredsSuccess = (data) => ({
  type: POST_THREDS,
  payload: data
})

export const userPostThread = (token, dataThread) => {
  const instance = axios.create({
    baseURL: API_BASE_DEVELOPMENT,
    headers: {
      'authentication': token
    }
  });

  return dispatch => (
    instance.post('/api/threads', dataThread)
      .then(res => {
        const threadsPayload = {
          status_code: res.status,
          message: res.data.message,
        };
        console.log("ini balikan dari GET THREADS", res);
        dispatch(postThredsSuccess(threadsPayload));
      })
      .catch(err => dispatch(postThredsSuccess(err)))
  );
}