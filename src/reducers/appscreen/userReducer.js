import * as ActionTypes from '../../actions/constants';

const initialState = {
  status: null,
  message: null
};

const getUsers = (state, payload) => ({
  ...state,
  status: payload.status,
  message: payload.message,
  ...payload.data.data.users
});

const getOneUser = (state, payload) => {
  // console.log('GET ONE USER: ', payload);
  return {
    ...state,
    status: payload.status,
    message: payload.message,
    ...payload
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS:
      return getUsers(state, action.payload);
    case ActionTypes.GET_ONE_USER:
      return getOneUser(state, action.payload);
    default:
      return state;
  }
};

export { userReducer };
