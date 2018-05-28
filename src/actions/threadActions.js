import { AsyncStorage } from 'react-native';
import { API_CALL } from '../utils/ajaxRequestHelper';

import {
	GET_THREADS,
	POST_THREDS,
	SEARCH_THREADS,
  GET_THREADS_STATIC,
  GET_LATEST_THREADS,
  GET_BOOKMARKED_THREADS,
	REPORT_THREAD,
  BOOKMARK_THREAD,
  BOOKMARK_LATEST_THREAD,
  BOOKMARK_SEARCH_THREAD,
  BOOKMARK_FEATURED_THREAD,
  DELETE_BOOKMARKED_THREAD,
  CREATE_COMMENT,
  GET_THREAD_DETAILS,
  COMMENT_TO_REPLY,
  // SAVE_USERS_SEARCH,
  FOLLOW_THREADS,
  UNFOLLOW_THREADS,
  GET_COMMENT_DETAILS,
  RESET_SAVE_BOOKMARK
} from './constants';

// import * as ActionTypes from './constants';
import { keywordRecent } from '../utils/constants';

/**
 * Get Static Thread
 * @param {*} idToken
 */
export const getThreadStatic = (page = 1, refresh = false) => async dispatch => {
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
      url: `api/threads?threadType=static&page=${page}`
    };

    const res = await API_CALL(option);
    const threadsPayload = {
      message: res.data.message,
      threadStatic: res.data.data.threads,
      refresh
    };

		dispatch(onSuccess(threadsPayload));
	} catch (error) {
		dispatch(onSuccess(error));
	}
};

/**
 * Get All Threads
 * @param {*} token
 */
export const getThreads = (page = 1, refresh = false) => async dispatch => {
  const getThreadsSuccess = data => ({
    type: GET_THREADS,
    payload: data
  });

  try {
    const option = {
      method: 'get',
      url: `api/threads/feed?page=${page}`
    };

    const res = await API_CALL(option);
    const threadsPayload = {
      status_code: res.status,
      message: res.data.data.message,
      threads: res.data.data.threads,
      refresh
    };
    dispatch(getThreadsSuccess(threadsPayload));
  } catch (err) {
    dispatch(getThreadsSuccess(err));
  }
};

/**
 * Get Latest Threads
 * @param {*} token
 */
export const getLatestThreads = (page = 1, refresh = false) => async dispatch => {
  const getLatestThreadsSuccess = data => ({
    type: GET_LATEST_THREADS,
    payload: data
  });

  try {
    const option = {
      method: 'get',
      url: `api/threads?threadType=question&threadType=sharing&page=${page}`
    };

    const res = await API_CALL(option);
    const threadsPayload = {
      status_code: res.status,
      message: res.data.data.message,
      threads: res.data.data.threads,
      refresh
    };
    dispatch(getLatestThreadsSuccess(threadsPayload));
  } catch (err) {
    dispatch(getLatestThreadsSuccess(err));
  }
};

/**
 * Get Bookmarked Threads
 * @param {*} token
 */
export const getBookmarkedThreads = (page = 1, refresh = false) => async dispatch => {
  const getBookmarkedThreadsSuccess = data => ({
    type: GET_BOOKMARKED_THREADS,
    payload: data
  });

  try {
    const option = {
      method: 'get',
      url: `api/bookmarks?page=${page}`
    };

    const res = await API_CALL(option);
    const threadsPayload = {
      status_code: res.status,
      message: res.data.data.message,
      bookmarks: res.data.data.bookmarks,
      refresh
    };
    dispatch(getBookmarkedThreadsSuccess(threadsPayload));
  } catch (err) {
    // dispatch(getBookmarkedThreadsSuccess(err));
  }
};

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
    };

    const request = await API_CALL(option);

    const threadItem = {
      thread: {
        ...request.data.data.thread,
        isSubscriber: request.data.data.isSubscriber
      }
    };
    onSuccess(threadItem);
  } catch (error) {
    onSuccess(error);
  }
};

/**
 * Post new Thread
 * @param {*} token
 * @param {*} dataThread
 */
export const userPostThread = (dataThread, cb) => async dispatch => {
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
    const res = await API_CALL(option);
    const threadsPayload = {
      status_code: res.status,
      message: res.data.message
    };
    dispatch(postThredsSuccess(threadsPayload));
    cb()
  } catch (err) {
    dispatch(postThredsSuccess(err));
  }
};

/**
 * Search Thread
 * @param {*} searchKeyword
 * @param {*} token
 */
export const searchThread = (searchKeyword, threadType = 'thread') => async dispatch => {
  const option = {
    method: 'get',
    url: `api/${threadType ===  'bookmark' ? 'bookmarks' : 'threads'}?search=${searchKeyword}`
  };

  try {
    const res = await API_CALL(option);

    let threadsPayload = {
      status_code: res.status,
      message: res.data.data.message,
    }
    if (threadType === 'bookmark') {
      let threads = {
        ...res.data.data.bookmarks,
        docs: res.data.data.bookmarks.docs.map(item => {
          item.thread.isBookmarked = true
          return item.thread
        })
      }
      threadsPayload.threads = threads
    } else {
      threadsPayload.threads = res.data.data.threads
    }

    dispatch({ type: SEARCH_THREADS, payload: threadsPayload });
  } catch (error) {
    dispatch({ type: SEARCH_THREADS, payload: error });
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
export const userReport = (dataThreads) => async dispatch => {
  // console.log('SEARCH KEYWORD DI ACTION ', searchKeyword);
  const dataReport = {
    reason: dataThreads.reason,
    description: dataThreads.description
  };

  const option = {
    method: 'post',
    url: `api/reports/${dataThreads.id}`,
    data: dataReport
  };

  try {
    const result = await API_CALL(option);
    const reportPayload = {
      status_code: result.status,
      message: result.data.message,
    };
    dispatch({ type: REPORT_THREAD, payload: reportPayload });
  } catch (error) {
    dispatch({ type: REPORT_THREAD, payload: error });
  }
};

/**
 * CREATE BOOKMARK
 * @param {*} idThread
 * @param {*} token
 */
export const makeBookmark = (thread, threadIndex) => async dispatch => {
  dispatch({ type: RESET_SAVE_BOOKMARK });

  const option = {
    method: thread.isBookmarked ? 'delete' : 'post',
    url: `api/bookmarks/${thread.isBookmarked ? 'deleteByThreadId/' : ''}${thread._id}`
  };

  try {
    const res = await API_CALL(option);
    const reportPayload = {
      status_code: res.status,
      message: res.data.message,
      threadIndex
    };

    dispatch({ type: BOOKMARK_THREAD, payload: reportPayload });
  } catch (error) {
    dispatch({ type: BOOKMARK_THREAD, payload: error });
  }
};

/**
 * CREATE BOOKMARK ON LATEST THREADS
 * @param {*} idThread
 * @param {*} token
 */
export const makeBookmarkLatestThreads = (thread, threadIndex) => async dispatch => {
  dispatch({ type: RESET_SAVE_BOOKMARK });

  const option = {
    method: thread.isBookmarked ? 'delete' : 'post',
    url: `api/bookmarks/${thread.isBookmarked ? 'deleteByThreadId/' : ''}${thread._id}`
  };

  try {
    const res = await API_CALL(option);
    const reportPayload = {
      status_code: res.status,
      message: res.data.message,
      threadIndex
    };
    dispatch({ type: BOOKMARK_LATEST_THREAD, payload: reportPayload });
  } catch (error) {
    dispatch({ type: BOOKMARK_LATEST_THREAD, payload: error });
  }
};

/**
 * CREATE BOOKMARK ON LATEST THREADS
 * @param {*} idThread
 * @param {*} token
 */
export const makeBookmarkSearhedThread = (thread, threadIndex) => async dispatch => {
  const option = {
    method: thread.isBookmarked ? 'delete' : 'post',
    url: `api/bookmarks/${thread.isBookmarked ? 'deleteByThreadId/' : ''}${thread._id}`
  };

  try {
    const res = await API_CALL(option);
    const reportPayload = {
      status_code: res.status,
      message: res.data.message,
      threadIndex
    };
    dispatch({ type: BOOKMARK_SEARCH_THREAD, payload: reportPayload });
  } catch (error) {
    dispatch({ type: BOOKMARK_SEARCH_THREAD, payload: error });
  }
};

/**
 * CREATE BOOKMARK ON FEATURED THREADS
 * @param {*} idThread
 * @param {*} token
 */
export const makeBookmarkFeaturedThreads = (thread, threadIndex) => async dispatch => {
  dispatch({ type: RESET_SAVE_BOOKMARK });

  const option = {
    method: thread.isBookmarked ? 'delete' : 'post',
    url: `api/bookmarks/${thread.isBookmarked ? 'deleteByThreadId/' : ''}${thread._id}`
  };

  try {
    const res = await API_CALL(option);
    const reportPayload = {
      status_code: res.status,
      message: res.data.message,
      threadIndex
    };
    dispatch({ type: BOOKMARK_FEATURED_THREAD, payload: reportPayload });
  } catch (error) {
    dispatch({ type: BOOKMARK_FEATURED_THREAD, payload: error });
  }
};

/**
 * CREATE BOOKMARK ON BOOKMARKED THREADS
 * @param {*} idThread
 * @param {*} token
 */
export const deleteBookmarkedThread = (thread, threadIndex) => async dispatch => {
  dispatch({ type: RESET_SAVE_BOOKMARK });

  const option = {
    method: 'delete',
    url: `api/bookmarks/deleteByThreadId/${thread._id}`
  };

  try {
    const res = await API_CALL(option);
    const reportPayload = {
      status_code: res.status,
      message: res.data.message,
      threadIndex
    };
    dispatch({ type: DELETE_BOOKMARKED_THREAD, payload: reportPayload });
  } catch (error) {
    dispatch({ type: DELETE_BOOKMARKED_THREAD, payload: error });
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
    });

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
    });

    onSuccess(request);
  } catch (error) {
    onSuccess(error);
  }
};

/**
 * Subsribe threads
 */

export const toFollowThread = (idThread) => async dispatch => {
  const isPending = () => {
    dispatch({
      type: 'PENDING_FOLLOW_THREADS',
      payload: true
    });
    return true;
  };

  function onSuccess(data) {
		dispatch({
			type: FOLLOW_THREADS,
			payload: data
		});

		return data;
  }

  isPending();

  try {
    const option = {
      method: 'post',
      url: `api/threads/${idThread}/threadsubscribers`
    };

    const request = await API_CALL(option);
    onSuccess(request);
  } catch (error) {
    onSuccess(error);
  }
};

export const toUnFollowThread = (idThread) => async dispatch => {
  const isPending = () => {
    dispatch({
      type: 'PENDING_UNFOLLOW_THREADS',
      payload: true
    });
    return true;
  };

  function onSuccess(data) {
		dispatch({
			type: UNFOLLOW_THREADS,
			payload: data
		});

		return data;
  }

  isPending();

  try {
    const option = {
      method: 'DELETE',
      url: `api/threads/${idThread}/threadsubscribers`
    };

    const request = await API_CALL(option);
    onSuccess(request);
  } catch (error) {
    onSuccess(error);
  }
};

export const getCommentDetails = (idComment) => async dispatch => {
  const isPending = () => {
    dispatch({
      type: 'PENDING_GET_COMMENT_DETAILS',
      payload: true
    });
    return true;
  };

  function onSuccess(data) {
		dispatch({
			type: GET_COMMENT_DETAILS,
			payload: data
		});

		return data;
  }

  isPending();

  try {
    const option = {
      method: 'GET',
      url: `api/threads/${idComment}/comment`
    };

    const request = await API_CALL(option);
    onSuccess(request);
  } catch (error) {
    onSuccess(error);
  }
};

