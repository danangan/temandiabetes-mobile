import * as ActionTypes from '../../actions/constants';

const initialState = {
  name: null,
  email: null,
  password: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER_USER:
      return Object.assign({}, state, {});
    default:
      return state;
  }
};

export { registerReducer };
