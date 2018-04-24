import { AsyncStorage } from 'react-native';
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
import { keywordRecent } from '../utils/constants';

/**
 * Get Static Thread
 * @param {*} idToken
 */
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

/**
 * Get All Threads
 * @param {*} token
 */
export const getThreads = token => async dispatch => {
  const getThreadsSuccess = data => ({
    type: GET_THREADS,
    payload: data
  });

  try {
    const option = {
      method: 'get',
      url: 'api/threads'
    }

    const res = await API_CALL(option)
    const threadsPayload = {
      status_code: res.status,
      message: res.data.data.message,
      threads: res.data.data.threads
    };
    dispatch(getThreadsSuccess(threadsPayload));
  } catch(err) {
    dispatch(getThreadsSuccess(err))
  }
}

/**
 * Get Thread Details
 * @param {*} threadId
 */
export const getThreadDetails = threadId => async dispatch => {
  const isPending = () => {
    dispatch({
      type: 'PENDING_THREAD_DETAILS',
      payload: true
    });
    return true;
  };

  const onSuccess = data => {
    dispatch({
			type: GET_THREAD_DETAILS,
			payload: data
		});
		return data;
  };

  isPending();

  try {
    const option = {
      method: 'get',
      url: `api/threads/${threadId}`
    }
    const { data: { data } } = await API_CALL(option);
    onSuccess(data);
  } catch (error) {
    onSuccess(error);
  }
};

/**
 * Post new Thread
 * @param {*} token
 * @param {*} dataThread
 */
export const userPostThread = (token, dataThread) => async dispatch => {
  const postThredsSuccess = data => ({
    type: POST_THREDS,
    payload: data
  });

  const option = {
    method: 'post',
    url: 'api/threads',
    data: dataThread
  }

  try {
    const res = await API_CALL(option)
    const threadsPayload = {
      status_code: res.status,
      message: res.data.message
    };
    dispatch(postThredsSuccess(threadsPayload));
  } catch(err) {
    dispatch(postThredsSuccess(err));
  }
}

/**
 * Search Thread
 * @param {*} searchKeyword
 * @param {*} token
 */
export const searchThread = (searchKeyword, token) => async dispatch => {
  const option = {
    method: 'get',
    url: `api/threads?search=${searchKeyword}`
  }

  try {
    const res = await API_CALL(option)
    const threadsPayload = {
      status_code: res.status,
      message: res.data.data.message,
      threads: res.data.data.threads
    };
    dispatch({ type: SEARCH_THREADS, payload: threadsPayload });
  } catch (error) {
    dispatch({ type: SEARCH_THREADS, payload: err });
  }
};

/**
 * SAVE USER SEARCH IN ASYNC STORAGE
 * @param {*} keyword
 */
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
    console.log(error);
  }
};

/**
 * REPORT THREAD
 * @param {*} dataThreads
 * @param {*} token
 */
export const userReport = (dataThreads, token) => async dispatch => {
  // console.log('SEARCH KEYWORD DI ACTION ', searchKeyword);
  const dataReport = {
    reason: dataThreads.reason,
    description: dataThreads.description
  };

  const option = {
    method: 'post',
    url: `api/reports/${dataThreads.id}`,
    data: dataReport
  }

  try {
    const result = await API_CALL(option)
    const reportPayload = {
      status_code: result.status,
      message: result.data.message,
    };
    dispatch({ type: REPORT_THREAD, payload: reportPayload });
  } catch (error) {
    dispatch({ type: REPORT_THREAD, payload: err });
  }
};

/**
 * CREATE BOOKMARK
 * @param {*} idThread
 * @param {*} token
 */
export const makeBookmark = (idThread, token) => async dispatch => {
  const option = {
    method: 'post',
    url: `api/bookmarks/${idThread}`
  }

  try {
    const res = await API_CALL(option)
    const reportPayload = {
      status_code: res.status,
      message: res.data.message,
    };
    dispatch({ type: BOOKMARK_THREAD, payload: reportPayload });
  } catch (error) {
    dispatch({ type: BOOKMARK_THREAD, payload: err });
  }
};

/**
 * POST COMMENT
 * @param {*} comment
 */
export const createComment = (comment) => async dispatch => {
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
    const request = await API_CALL({
      method: 'post',
      url: `api/threads/${comment.idThread}/comment`,
      data: comment.params
    })
    onSuccess(request);
  } catch (error) {
    onSuccess(error);
  }
};

/**
 * Comment To Reply
 */
export const commentToReply = (comment) => async dispatch => {

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
    const request = await API_CALL({
      method: 'post',
      url: `api/threads/${comment.idComment}/reply`,
      data: comment.params
    })
    onSuccess(request);
  } catch (error) {
    onSuccess(error);
  }
}

