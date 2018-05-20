import { combineReducers } from 'redux';

import {
	loginReducer,
	registerReducer,
	threadsReducer,
	onBoardingReducer,
	authReducer,
	innerCircleReducer,
	recentActivityReducer,
	userReducer,
	ecommerceReducer
} from './appscreen';

const rootReducer = combineReducers({
	loginReducer,
	registerReducer,
	threadsReducer,
	onBoardingReducer,
	authReducer,
	innerCircleReducer,
	recentActivityReducer,
	userReducer,
	ecommerceReducer
});

export default rootReducer;
