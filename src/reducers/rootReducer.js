import { combineReducers } from 'redux';

import { loginReducer, registerReducer } from './appscreen';

const rootReducer = combineReducers({
  loginReducer,
  registerReducer
});

export default rootReducer;
