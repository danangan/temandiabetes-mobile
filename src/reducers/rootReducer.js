import { combineReducers } from 'redux';

import { loginReducer, registerReducer, threadsReducer } from './appscreen';

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  threadsReducer
});

export default rootReducer;
