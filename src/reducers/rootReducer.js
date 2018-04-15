import { combineReducers } from 'redux';

import { 
	loginReducer, 
	registerReducer, 
	threadsReducer, 
	onBoardingReducer, 
	authReducer,
	recentActivityReducer 
} from './appscreen';

const rootReducer = combineReducers({
	loginReducer,
	registerReducer,
	threadsReducer,
	onBoardingReducer,
	authReducer,
	recentActivityReducer
});

export default rootReducer;
