import * as ActionTypes from '../../actions/constants';

const initialState = {
	currentUser: {}
};

const getCurrentUser = (state, payload) => {
  const { currentUser } = payload;
  return {
    ...state,
    currentUser
  };
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_CURRENT_USER:
			return getCurrentUser(state, action.payload);
		default:
			return state;
	}
};

export { authReducer };
