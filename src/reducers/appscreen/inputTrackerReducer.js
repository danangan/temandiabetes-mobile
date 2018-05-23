import * as ActionTypes from '../../actions/constants';

const initialState = {
	suggetion: {
    food: [],
    status_code: 0
  },
  inputTracker: {
    message: '',
    status_code: 0
  } 
};

const inputTrackerReducer = (state = initialState, action) => {
	switch (action.type) {
    case ActionTypes.GET_FOOD_SUGGESTION:
      const { data: { food }, status } = action.payload;
			return {
        ...state, 
        suggetion: {
          ...state.suggetion, food, status_code: status
        }
      };
    case 'PENDING_INPUT_TRACKER_BLOOD_GLUCOSE': {
      return {
        ...state, 
        inputTracker: initialState.inputTracker
      };
    }
    case ActionTypes.INPUT_TRACKER_BLOOD_GLUCOSE:
      return {
        ...state, 
        inputTracker: {
          ...state.inputTracker, status_code: 200, message: 'Success'
        }
      };
		default:
			return state;
	}
};

export { inputTrackerReducer };
