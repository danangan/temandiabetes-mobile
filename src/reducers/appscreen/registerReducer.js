import * as ActionTypes from '../../actions/constants';

const initialState = {
  dataUser: {
    nama: null,
    email: null,
    message: '',
    status_code: 0,
  }
};

const registerStepOne = (state, payload) => {
  return {
    ...state, dataUser: {...state.dataUser, nama: payload }
  };
}

const registerFinalStep = (state, payload) => {
  if (payload['response'] === undefined) {
    const { currentUser, idToken, message } = payload.data;
    return {
      ...state, 
      dataUser: {...state.dataUser, nama: currentUser.nama, email: currentUser.email, message, status_code: 200},
    }
  } else if (payload.response.status === 400) {
    const { data } = payload.response;
    return {
      ...state, dataUser: {...state.dataUser, message: data.message, status_code: 400 } 
    }
  }
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_USER:
      return registerFinalStep(state, action.payload);
    case ActionTypes.REGISTER_STEP_ONE: 
      return registerStepOne(state, action.payload);
    default:
      return state;
  }
};

export { registerReducer };
