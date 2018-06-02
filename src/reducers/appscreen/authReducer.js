import * as ActionTypes from '../../actions/constants';

const initialState = {
  currentUser: {},
  notificationCount: 0
};

const getCurrentUser = (state, payload) => {
  let { currentUser } = payload;
  currentUser = currentUser || payload;
  return {
    ...state,
    currentUser
  };
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_CURRENT_USER:
      return getCurrentUser(state, action.payload);
      break;
    case 'SET_NOTIFICATION_COUNT':
      return {
        ...state,
        notificationCount: action.payload
      };
      break;
    case 'ADD_NOTIFICATION_COUNT':
      return {
        ...state,
        notificationCount: state.notificationCount + 1
      };
      break;
    case 'RESET_NOTIFICATION_COUNT':
      return {
        ...state,
        notificationCount: 0
      }
    default:
			return state;
	}
};

export { authReducer };
