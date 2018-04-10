import { combineReducers } from 'redux';

import { 
	loginReducer, 
	registerReducer, 
	threadsReducer, 
	onBoardingReducer, 
	authReducer 
} from './appscreen';

const rootReducer = combineReducers({
	loginReducer,
	registerReducer,
	threadsReducer,
	onBoardingReducer,
	authReducer
});

export default rootReducer;
