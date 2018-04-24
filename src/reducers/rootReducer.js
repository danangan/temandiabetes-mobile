import { combineReducers } from 'redux';

import { 
	loginReducer, 
	registerReducer, 
	threadsReducer, 
	onBoardingReducer, 
	authReducer,
	innerCircleReducer,
	recentActivityReducer,
	userReducer
} from './appscreen';

const rootReducer = combineReducers({
	loginReducer,
	registerReducer,
	threadsReducer,
	onBoardingReducer,
	authReducer,
	innerCircleReducer,
	recentActivityReducer,
	userReducer
});

export default rootReducer;
