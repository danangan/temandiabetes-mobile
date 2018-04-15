import * as ActionTypes from '../../actions/constants';

const initialState = {
	recentThreads: {
    status_code: 0,
    data: []
  },
  recentComments: {
    status_code: 0,
    data: []
  },
  recentResponse: {
    status_code: 0,
    data: []
  }
};

function getUserRecentThread(state, payload) {
  return {
    ...state,
    recentThreads: { 
      ...state.recentThreads, status_code: 201, data: payload 
    }
  };
}

function getUserRecentComment(state, payload) {
  return {
    ...state,
    recentComments: {
      ...state.recentComments, data: payload, status_code: 201
    }
  };
}

const recentActivityReducer = (state = initialState, action) => {
	switch (action.type) {
    case 'PENDING_GET_USER_RECENT_THREADS': 
      return {
        ...state, 
        recentThreads: {
          ...state.recentThreads, status_code: 0, data: []
        }
      };
		case ActionTypes.GET_USER_RECENT_THREADS:
      return getUserRecentThread(state, action.payload);
    case 'PENDING_GET_USER_RECENT_COMMENTS': {
      return {
        ...state, 
        recentThreads: {
          ...state.recentComments, status_code: 0, data: []
        }
      };
    }
    case ActionTypes.GET_USER_RECENT_COMMENTS: 
      return getUserRecentComment(state, action.payload);
		default:
			return state;
	}
};

export { recentActivityReducer };
