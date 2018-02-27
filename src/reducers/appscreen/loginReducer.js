import * as ActionTypes from '../../actions/constants';

const initialState = {
  email: null,
  password: null, 
  idToken: null,
  accessToken: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_MANUAL:
      return onLoginManual(state, action.payload);
    default:
      return state;
  }
};

const onLoginManual = (state, payload) => {
  console.log('DATA FROM REDUCER: ', payload);
  return {
    ...state,
    user: {
      email: payload.email,
      password: payload.password
    }
  };
};

export { loginReducer };
