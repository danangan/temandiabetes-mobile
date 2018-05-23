import { combineReducers } from 'redux';

import {
	appReducer,
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
	appReducer,
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
