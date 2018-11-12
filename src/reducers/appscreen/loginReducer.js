import * as ActionTypes from '../../actions/constants';

const initialState = {
  email: null,
  password: null,
  message: null,
  typeUser: null,
  statusCode: 0,
  loading: false,
  is_active: false
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
  } else if (payloadCode === 'auth/unknown') {
    return {
      ...state,
      message: 'Kata sandi salah.',
      statusCode: 500
    };
  }

  return {
    ...state,
    message: payload.is_active === false ? 'inactive' : messages,
    statusCode: payload.is_active === false ? 400 : 200,
    ...payload
  };
};

const onLoginSSO = (state, payload) => {
  if (payload === null) {
    return {
      ...state
    };
  }

  return {
    ...state,
    isNewUser: payload.isNewUser,
    email: payload.currentUser.email,
    name: payload.currentUser.name,
    currentUser: payload.currentUser,
    message: messages,
    statusCode: 200,
    is_active: payload.currentUser.is_active
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
    message: messages,
    statusCode: 200,
    is_active: payload.currentUser.is_active
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
    message: messages,
    statusCode: 200
  };
};

const loginManualNewUser = (state, payload) => {
  if (payload === null) {
    return {
      ...state
    };
  }

  return {
    ...state,
    isNewUser: true,
    email: payload.profile.email,
    name: payload.profile.displayName,
    currentUser: payload.currentUser,
    message: messages,
    statusCode: 200
  };
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return initialState;
    case ActionTypes.LOGIN_MANUAL:
      return onLogin(state, action.payload);
      case ActionTypes.LOGIN_MANUAL_SSO:
        return onLoginSSO(state, action.payload);
    case ActionTypes.SIGN_WITH_GOOGLE:
      return signWithGoogle(state, action.payload);
      case ActionTypes.LOGIN_MANUAL_NEWUSER:
        return loginManualNewUser(state, action.payload);
    case ActionTypes.USER_LOGOUT:
      return {
        ...initialState,
        statusCode: 400
      };
    case ActionTypes.SIGN_WITH_FACEBOOK:
      return signWithFacebook(state, action.payload);
    case ActionTypes.SET_LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
};

export { loginReducer };
