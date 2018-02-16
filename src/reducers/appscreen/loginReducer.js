import * as ActionTypes from '../../actions/constants';

const initialState = {
  email: null,
  password: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_MANUAL:
      return Object.assign({}, state, {
        email: action.payload.email,
        password: action.payload.password
      });
    case ActionTypes.LOGIN_OAUTH:
      return Object.assign({}, state, {
        email: action.payload.email,
        password: action.payload.password
      });
    default:
      return state;
  }
};

export { loginReducer };
