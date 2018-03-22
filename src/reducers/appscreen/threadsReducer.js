import * as ActionTypes from '../../actions/constants';

const initialState = {
	listThreads: {
		item: {
			data: [],
			total: 0
		},
		message: '',
		status_code: 0
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
	searchResult: {
		data: [],
		message: '',
		status_code: 0
	}
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
	return {
		...state,
		listThreads: {
			...state.listThreads,
			item: { ...state.listThreads.item, data: threads.docs, total: threads.total },
			message,
			status_code
		}
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
		default:
			return state;
	}
};

export { threadsReducer };
