import * as ActionTypes from '../../actions/constants';

const initialState = {
  email: null,
  password: null, 
  status_code: 0,
  message: null
};

const messages = 'success login';

const onLogin = (state, payload) => {
  console.log('DATA FROM REDUCER: ', payload);
  return {
    ...state,
    message: messages,
    status_code: 200,
    ...payload,
  };
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_MANUAL:
      return onLogin(state, action.payload);
    default:
      return state;
  }
};

export { loginReducer };
