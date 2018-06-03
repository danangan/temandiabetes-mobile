import * as ActionTypes from '../../actions/constants';

const initialState = {
  email: null,
  password: null,
  message: null,
  typeUser: null,
  statusCode: 0
};

const messages = 'success login';

const onLogin = (state, payload) => {
  const payloadCode = payload !== null ? payload.code : 'null';

  if (payloadCode === 'auth/wrong-password') {
    return {
      ...state,
      message: 'Kata sandi tidak salah',
      statusCode: 500
    };
  } else if (payloadCode === 'auth/user-not-found') {
    return {
      ...state,
      message: 'Data pengguna tidak ditemukan',
      statusCode: 500
    };
  } else if (payloadCode === 'auth/invalid-email') {
    return {
      ...state,
      message: 'Format email salah',
      statusCode: 500
    };
  }

  return {
    ...state,
    message: messages,
    statusCode: 200,
    ...payload
  };
};

const oAuthLogin = (state, payload) => ({
  ...state
  // isNewUser: userFirebase.additionalUserInfo.isNewUser,
  // email: userFirebase.additionalUserInfo.profile.email,
  // name: userFirebase.additionalUserInfo.profile.name,
});

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_STATE:
      return { ...state, message: null, statusCode: null };
    case ActionTypes.LOGIN_MANUAL:
      return onLogin(state, action.payload);
    case ActionTypes.LOGIN_OAUTH:
      return oAuthLogin(state, action.payload);
    case ActionTypes.USER_LOGOUT:
      return {
        ...initialState,
        statusCode: 400
      };
    default:
      return state;
  }
};

export { loginReducer };
