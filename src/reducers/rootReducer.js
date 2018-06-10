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
	reminderReducer,
  inputTrackerReducer,
  appNavigatorReducer
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
	reminderReducer,
  inputTrackerReducer,
  appNavigatorReducer
});

export default rootReducer;
