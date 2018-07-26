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
      message: 'Kata sandi salah',
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

const signWithGoogle = (state, payload) => {
  if (payload === null) {
    return {
      ...state
    };
  }

  return {
    ...state,
    isNewUser: payload.isNewUser,
    email: payload.profile.email,
    name: payload.profile.name,
    currentUser: payload.currentUser,
    message: 'login success',
    statusCode: 200
  };
};

const signWithFacebook = (state, payload) => {
  if (payload === null) {
    return {
      ...state
    };
  }

  return {
    ...state,
    isNewUser: payload.isNewUser,
    email: payload.profile.email,
    name: payload.profile.name,
    currentUser: payload.currentUser,
    message: 'login success',
    statusCode: 200
  };
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return initialState;
    case ActionTypes.LOGIN_MANUAL:
      return onLogin(state, action.payload);
    case ActionTypes.SIGN_WITH_GOOGLE:
      return signWithGoogle(state, action.payload);
    case ActionTypes.USER_LOGOUT:
      return {
        ...initialState,
        statusCode: 400
      };
    case ActionTypes.SIGN_WITH_FACEBOOK:
      return signWithFacebook(state, action.payload);
    default:
      return state;
  }
};

export { loginReducer };
