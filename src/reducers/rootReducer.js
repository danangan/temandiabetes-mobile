import { combineReducers } from 'redux';

import { loginReducer, registerReducer, threadsReducer, onBoardingReducer } from './appscreen';

const rootReducer = combineReducers({
	loginReducer,
	registerReducer,
	threadsReducer,
	onBoardingReducer
});

export default rootReducer;
