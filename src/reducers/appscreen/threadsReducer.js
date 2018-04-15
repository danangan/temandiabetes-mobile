import * as ActionTypes from '../../actions/constants';

const initialState = {
	listThreads: {
		item: {
			data: [],
			recentData: [],
			total: 0
		},
		threadDetails: null,
		message: '',
		status_code: 0,

	},
	listThreadStatic: {
		item: {
			data: [],
			total: 0
		},
		message: null,
		status_code: 0
	},
	submitThreads: {
		message: '',
		status_code: 0
	},
	reportThread: {
		message: '',
		status_code: 0,
	},
	saveBookmark: {
		message: '',
		status_code: 0
	},
	searchResult: {
		data: [],
		message: '',
		status_code: 0
	},
	createComment: {
		status_code: 0,
		commentToReply: {
			status_code: 0
		}
	},
	isFetch: false
};

const getThreadStatic = (state, payload) => {
	const { threadStatic, message, status_code } = payload;
	return {
		...state,
		listThreadStatic: {
			...state.listThreadStatic,
			item: { ...state.listThreadStatic.item, data: threadStatic.docs, total: threadStatic.total },
			message,
			status_code
		}
	};
};

const getThreads = (state, payload) => {
  const { threads, status_code, message } = payload;
  const { docs } = threads;
  const threadRecent = docs.sort((a, b) => Date.parse(new Date(b.createdAt) - new Date(a.createdAt)));

  return {
    ...state, 
    listThreads: { ...state.listThreads, 
      item: { ...state.listThreads.item, 
        data: threads.docs, 
        recentData: threadRecent, 
        total: threads.total 
      }, 
      message, 
      status_code 
    },
  };
};

const postThreads = (state, payload) => {
	const { message, status_code } = payload;
	return {
		...state,
		submitThreads: { ...state.submitThreads, message, status_code }
	};
};

const handleSearch = (state, payload) => {
	const { threads, status_code, message } = payload;
	return {
		...state,
		searchResult: { ...state.searchResult, data: threads.docs, status_code, message }
	};
};

const handleReport = (state, payload) => {
  const { status_code, message } = payload;
  return {
    ...state, reportThread: { ...state.reportThread, message, status_code } 
  };
};

const postBookmark = (state, payload) => {
	const { status_code, message } = payload;
  return {
    ...state, saveBookmark: { ...state.saveBookmark, message, status_code } 
  };
};

/**
 * 
 * @param {*} state object
 * @param {*} payload object
 * Setelah post comment dan comment to reply
 * set default create comment to initialState
 */
const getThreadsDetails = (state, payload) => {
	return {
		...state, 
		listThreads: {
			...state.listThreads, 
			threadDetails: payload.thread,
			status_code: 200
		},
		createComment: {
			...state.createComment,
			status_code: 0,
			commentToReply: { 
				...state.createComment.commentToReply,
				status_code: 0
			}
		},
		isFetch: false
	};
};

const createComment = (state, payload) => {
	return {
		...state, 
		createComment: { ...state.createComment, status_code: payload.status },
		isFetch: false
	};
};

const commentToReply = (state, payload) => {
	return {
		...state,
		createComment: { 
			...state.createComment, 
			commentToReply: {
				...state.createComment.commentToReply, status_code: payload.status
			}
		}
	};
};

const threadsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_THREADS:
			return getThreads(state, action.payload);
		case ActionTypes.POST_THREDS:
			return postThreads(state, action.payload);
		case ActionTypes.SEARCH_THREADS:
			return handleSearch(state, action.payload);
		case ActionTypes.REPORT_THREAD:
			return handleReport(state, action.payload);
		case ActionTypes.GET_THREADS_STATIC:
			return getThreadStatic(state, action.payload);
		case ActionTypes.BOOKMARK_THREAD:
			return postBookmark(state, action.payload);
		case 'PENDING_THREAD_DETAILS':
			return {
				...state, 
				listThreads: {
					...state.listThreads, 
					threadDetails: null,
					status_code: 0
				},
			};
		case `${ActionTypes.GET_THREAD_DETAILS}`:
			return getThreadsDetails(state, action.payload);
		case 'PENDING_CREATE_COMMENT':
			return {
				...state, 
				listThreads: {
					...state.listThreads, 
					threadDetails: null,
					status_code: 0
				},
				createComment: {
					...state.createComment,
					status_code: 0
				}
			};
		case ActionTypes.CREATE_COMMENT: 
			return createComment(state, action.payload);
		case 'PENDING_COMMENT_TO_REPLY':
			return {
				...state, 
				listThreads: {
					...state.listThreads, 
					threadDetails: null,
					status_code: 0
				},
				createComment: {
					...state.createComment,
					commentToReply: { 
						...state.createComment.commentToReply,
						status_code: 0
					}
				}
			};
		case ActionTypes.COMMENT_TO_REPLY:
			return commentToReply(state, action.payload);
		default:
			return state;
	}
};

export { threadsReducer };
