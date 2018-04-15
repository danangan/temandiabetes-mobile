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

function getUserRecentActivity(state, payload) {
  return {
    ...state,
    recentThreads: { 
      ...state.recentThreads, status_code: 201, data: payload 
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
			return getUserRecentActivity(state, action.payload);
		default:
			return state;
	}
};

export { recentActivityReducer };
