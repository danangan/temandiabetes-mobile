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
	historyEstimationReducer,
	reminderReducer
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
	historyEstimationReducer,
	reminderReducer
});

export default rootReducer;
