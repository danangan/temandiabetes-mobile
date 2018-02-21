import * as ActionTypes from '../../actions/constants';

const initialState = {
  dataUser: {
    name: null,
    email: null,
    password: null,
    message: '',
  }
};

const registerStepOne = (state, payload) => {
  console.log("REDUCER PERTAMA ", payload);
  return {
    ...state, dataUser: {...state.dataUser, name: payload }
  };
}

const registerFinalStep = (state, payload) => {
  return {
    ...initialState
  };
};

const registerReducer = (state = initialState, action) => {
  console.log("REDUCERS .... ", action.payload)
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
