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
  submitThreads: {
    message: '',
    status_code: 0,
  },
  searchResult: {
    data: [],
    message: '',
    status_code: 0
  }
};

const getThreads = (state, payload) => {
  const { threads, status_code, message } = payload;
  return {
    ...state, 
    listThreads: { ...state.listThreads, 
      item: { ...state.listThreads.item, data: threads.docs, total: threads.total }, 
      message, 
      status_code 
    }
  };
};

const postThreads = (state, payload) => {
  const { message, status_code } = payload;
  return {
    ...state, submitThreads: { ...state.submitThreads, message, status_code }
  };
};

const handleSearch = (state, payload) => {
  const { threads, status_code, message } = payload;
  return {
    ...state, searchResult: { ...state.searchResult, data: threads.docs, status_code, message }
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
		default:
			return state;
	}
};

export { threadsReducer };
