import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { API_CALL } from '../utils/ajaxRequestHelper';

import {
	GET_THREADS,
	POST_THREDS,
	SEARCH_THREADS,
	GET_THREADS_STATIC,
	REPORT_THREAD,
  BOOKMARK_THREAD,
  CREATE_COMMENT,
  GET_THREAD_DETAILS,
  COMMENT_TO_REPLY,
  SAVE_USERS_SEARCH
} from './constants';
// import * as ActionTypes from './constants';
import { API_BASE } from '../utils/API';
import { authToken, keywordRecent } from '../utils/constants';

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
    const option = {
      method: 'get',
      url: 'api/threads?threadType=static'
    }

    const res = await API_CALL(option)
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

// GET THREAD DETAILS
export const getThreadDetails = (threadId) => async dispatch => {
  const token = await AsyncStorage.getItem(authToken);

  const isPending = () => {
    dispatch({
      type: 'PENDING_THREAD_DETAILS',
      payload: true
    });
    return true;
  };

  const onSuccess = (data) => {
    dispatch({
			type: GET_THREAD_DETAILS,
			payload: data
		});
		return data;
  };

  isPending();

  try {
    const instance = axios.create({
      baseURL: API_BASE,
      headers: {
        authentication: token
      }
    });
    const request = await instance.get(`api/threads/${threadId}`);
    onSuccess(request.data.data);
  } catch (error) {
    onSuccess(error);
  }
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

export const saveUserSearch = (keyword) => async dispatch => {
  try {
    const value = await AsyncStorage.getItem(keywordRecent);
    if (value === null) {
      let dataSearch = '';
      dataSearch += keyword;
      await AsyncStorage.setItem(keywordRecent, dataSearch);
    } else {
      const data = value;
      const toSetValue = data.split(',');
      if (toSetValue.length === 3) {
        // kalau keyword sudah 3
        toSetValue.pop();
        toSetValue.unshift(keyword);
        const done = toSetValue.join(',');
        await AsyncStorage.setItem(keywordRecent, done);
      } else {
        // kalau keyword < 3
        // tambah keyword ke index paling awal
        toSetValue.unshift(keyword);
        const done = toSetValue.join(',');
        await AsyncStorage.setItem(keywordRecent, done);
      }
    }
  } catch (error) {
    console.log('ERROR', error);
  }
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

// CREATE COMMENT
export const createComment = (comment) => async dispatch => {
  const token = await AsyncStorage.getItem(authToken);

  const isPending = () => {
    dispatch({
      type: 'PENDING_CREATE_COMMENT',
      payload: true
    });
    return true;
  };

  function onSuccess(data) {
		dispatch({
			type: CREATE_COMMENT,
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
    const request = await instance.post(`api/threads/${comment.idThread}/comment`, comment.params);
    console.log('RESPONSE CURRENT USER', request);
    onSuccess(request);
  } catch (error) {
    onSuccess(error);
  }
};

/**
 * Comment To Reply
 */
export const commentToReply = (comment) => async dispatch => {
  const token = await AsyncStorage.getItem(authToken);

  const isPending = () => {
    dispatch({
      type: 'PENDING_COMMENT_TO_REPLY',
      payload: true
    });
    return true;
  };

  function onSuccess(data) {
		dispatch({
			type: COMMENT_TO_REPLY,
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
    const request = await instance.post(`api/threads/${comment.idComment}/reply`, comment.params);
    console.log('RESPONSE CREATE COMMENT TO REPLY', request);
    onSuccess(request);
  } catch (error) {
    onSuccess(error);
  }
}

