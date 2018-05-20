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
	ecommerceReducer,
	historyEstimationReducer
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
	ecommerceReducer,
	historyEstimationReducer
});

export default rootReducer;
