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
    data: [],
    page: 0
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

function getUserRecentActivityResponse(state, payload) {
  const initialData = payload.page === 1 ? [] :  state.recentResponse.data
  return {
    ...state,
    recentResponse: {
      ...state.recentResponse,
        data: [
          ...initialData,
          ...payload.response
        ],
      status_code: payload.response.length === 0 && payload.status_code === 201 ? 400 : 201,
      page: payload.pages
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
    // case 'PENDING_GET_USER_RECENT_RESPONSES': {
    //   return {
    //     ...state,
    //     recentResponse: {
    //       ...state.recentResponse, status_code: 0, data: []
    //     }
    //   };
    // }
    case ActionTypes.GET_USER_RECENT_RESPONSES:
      return getUserRecentActivityResponse(state, action.payload);
		default:
			return state;
	}
};

export { recentActivityReducer };
