import * as ActionTypes from '../../actions/constants';

const initialState = {
	message: null
};

const onBoarding = (state, payload) => ({
	...state,
	message: payload.message,
	...payload.data
});

const onBoardingReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_ON_BOARDING:
			return onBoarding(state, action.payload);
		default:
			return state;
	}
};

export { onBoardingReducer };
