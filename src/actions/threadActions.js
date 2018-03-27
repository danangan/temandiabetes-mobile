import { AsyncStorage } from 'react-native';
import axios from 'axios';

import { 
	GET_THREADS, 
	POST_THREDS, 
	SEARCH_THREADS, 
	GET_THREADS_STATIC,
	REPORT_THREAD,
	BOOKMARK_THREAD
} from './constants';
// import * as ActionTypes from './constants';
import { API_BASE } from '../utils/API';
import { authToken } from '../utils/constants';

const getToken = async () => {
	const token = await AsyncStorage.getItem(authToken);
	return token;
};

export const getThreadStatic = idToken => async dispatch => {
	function onSuccess(data) {
		dispatch({
			type: GET_THREADS_STATIC,
			payload: data
		});

		return data;
	}

	try {
    const instance = axios.create({
      baseURL: API_BASE,
      headers: {
        authentication: idToken
      }
    });

    const res = await instance.get('api/threads?threadType=static');
    const threadsPayload = {
      message: res.data.message,
      threadStatic: res.data.data.threads
    };
        
		return onSuccess(threadsPayload);
	} catch (error) {
		onSuccess(error);
	}
};

const getThreadsSuccess = data => ({
	type: GET_THREADS,
	payload: data
});

export const getThreads = token => {
	const instance = axios.create({
		baseURL: API_BASE,
		headers: {
			authentication: token
		}
	});

	return dispatch =>
		instance
			.get('/api/threads')
			.then(res => {
				const threadsPayload = {
					status_code: res.status,
					message: res.data.data.message,
					threads: res.data.data.threads
				};
				// console.log('ini balikan dari GET THREADS', threadsPayload);
				dispatch(getThreadsSuccess(threadsPayload));
			})
			.catch(err => dispatch(getThreadsSuccess(err)));
};

const postThredsSuccess = data => ({
	type: POST_THREDS,
	payload: data
});

export const userPostThread = (token, dataThread) => {
	const instance = axios.create({
		baseURL: API_BASE,
		headers: {
			authentication: token
		}
	});

	return dispatch =>
		instance
			.post('/api/threads', dataThread)
			.then(res => {
				const threadsPayload = {
					status_code: res.status,
					message: res.data.message
				};
				dispatch(postThredsSuccess(threadsPayload));
			})
			.catch(err => dispatch(postThredsSuccess(err)));
};

export const searchThread = (searchKeyword, token) => {
	console.log('SEARCH KEYWORD DI ACTION ', searchKeyword);
	const instance = axios.create({
		baseURL: API_BASE,
		headers: {
			authentication: token
		}
	});

  return dispatch => (
    instance.get(`/api/threads?search=${searchKeyword}`)
      .then(res => {
        const threadsPayload = {
          status_code: res.status,
          message: res.data.data.message,
          threads: res.data.data.threads
        };
        dispatch({ type: SEARCH_THREADS, payload: threadsPayload });
      })
      .catch(err => {
        dispatch({ type: SEARCH_THREADS, payload: err });
      })
    );
};

export const userReport = (dataThreads, token) => {
  // console.log('SEARCH KEYWORD DI ACTION ', searchKeyword);
  const dataReport = {
    reason: dataThreads.reason,
    description: dataThreads.description
  };

  const instance = axios.create({
    baseURL: API_BASE,
    headers: {
      authentication: token
    }
  });

  return dispatch => (
    instance.post(`/api/reports/${dataThreads.id}`, dataReport)
      .then(res => {
        const reportPayload = {
          status_code: res.status,
          message: res.data.message,
        };
        dispatch({ type: REPORT_THREAD, payload: reportPayload });
      })
      .catch(err => {
        dispatch({ type: REPORT_THREAD, payload: err });
      })
    );
};

export const makeBookmark = (idThread, token) => {
  // console.log('SEARCH KEYWORD DI ACTION ', searchKeyword);
  const instance = axios.create({
    baseURL: API_BASE,
    headers: {
      authentication: token
    }
  });

  return dispatch => (
    instance.post(`/api/bookmarks/${idThread}`)
      .then(res => {
        const reportPayload = {
          status_code: res.status,
          message: res.data.message,
        };
        console.log('ini balikan dari BOOKMARK THREADS', res);
        dispatch({ type: BOOKMARK_THREAD, payload: reportPayload });
      })
      .catch(err => {
        dispatch({ type: BOOKMARK_THREAD, payload: err });
      })
    );
};
