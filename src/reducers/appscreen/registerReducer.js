import * as ActionTypes from '../../actions/constants';

const initialState = {
  dataUser: {
    id: '',
    nama: '',
    email: '',
    tipe_user: '',
    sip: '',
    message: '',
    password: '',
    confirmPassword: '',
    status_code: 0,
    emailValid: {
      message: '',
      status_code: 0
    }
  }
};

const registerFinalStep = (state, payload) => {
  if (payload.response === undefined) {
    const { currentUser, message } = payload;
    if (payload.status_code === 500) {
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          message: 'Email Sudah digunakan',
          status_code: 500
        }
      };
    }
    return {
      ...state,
      dataUser: {
        ...state.dataUser,
        id: currentUser._id,
        nama: currentUser.nama,
        email: currentUser.email,
        tipe_user: currentUser.tipe_user,
        message,
        status_code: 200
      }
    };
  } else if (payload.response.status === 400) {
    const { data } = payload.response;
    return {
      ...state,
      dataUser: { ...state.dataUser, message: data.message, status_code: 400 }
    };
  }
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PENDING_REGISTER_USER': {
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          status_code: 0,
          message: ''
        }
      };
    }
    case ActionTypes.REGISTER_USER:
      return registerFinalStep(state, action.payload);
    case ActionTypes.USER_LOGOUT:
      return {
        ...state,
        dataUser: initialState.dataUser
      };
    case 'REGISTER_NAMA':
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          nama: action.payload
        }
      };
    case 'REGISTER_EMAIL':
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          email: action.payload
        }
      };
    case 'REGISTER_PASSWORD': {
      if (action.payload.typePassword === 'FIRST') {
        return {
          ...state,
          dataUser: {
            ...state.dataUser,
            password: action.payload.password
          }
        };
      }
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          confirmPassword: action.payload.password
        }
      };
    }
    case 'REGISTER_SIP': {
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          sip: action.payload
        }
      };
    }

    case 'CLEAR_DATA_REGISTER': {
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          id: '',
          nama: '',
          email: '',
          tipe_user: '',
          message: '',
          password: '',
          confirmPassword: '',
          sip: '',
          status_code: 0
        }
      };
    }

    case 'PENDING_EMAIL_ALREADY_REGISTERED': {
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          emailValid: {
            ...state.dataUser.emailValid,
            message: '',
            status_code: 0
          }
        }
      };
    }

    case ActionTypes.EMAIL_ALREADY_REGISTERED: {
      const { data } = action.payload;
      if (data.doesEmailExist) {
        return {
          ...state,
          dataUser: {
            ...state.dataUser,
            emailValid: {
              ...state.dataUser.emailValid,
              message: 'INVALID',
              status_code: 201
            }
          }
        };
      }
      return {
        ...state,
        dataUser: {
          ...state.dataUser,
          emailValid: {
            ...state.dataUser.emailValid,
            message: 'VALID',
            status_code: 201
          }
        }
      };
    }
    default:
      return state;
  }
};

export { registerReducer };
