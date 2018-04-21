import { combineReducers } from 'redux';

import { 
	loginReducer, 
	registerReducer, 
	threadsReducer, 
	onBoardingReducer, 
	authReducer,
	// innerCircleReducer,
	recentActivityReducer 
} from './appscreen';

const rootReducer = combineReducers({
	loginReducer,
	registerReducer,
	threadsReducer,
	onBoardingReducer,
	authReducer,
	// innerCircleReducer,
	recentActivityReducer
});

export default rootReducer;
