import * as ActionTypes from '../../actions/constants';

const initialState = {
	suggetion: {
    food: [],
    status_code: 0,
    message: ''
  },
  inputTracker: {
    message: '',
    status_code: 0
  } 
};

const inputTrackerReducer = (state = initialState, action) => {
	switch (action.type) {
    case 'PENDING_GET_FOOD_SUGGESTION': 
      return {
        ...state, 
          suggetion: {
            ...state.suggetion, 
              food: [], 
              status_code: 0,
              message: 'Loading'
          }
      };
    case ActionTypes.GET_FOOD_SUGGESTION:
    if (action.payload.status === 204) {
      return {
        ...state, 
        suggetion: {
          ...state.suggetion, 
          food: [],
          status_code: action.payload.status,
          message: 'Not Found'
        }
      };
    }
    const { data: { food }, status } = action.payload;
			return {
        ...state, 
        suggetion: {
          ...state.suggetion, 
          food, 
          status_code: status,
          message: 'Success Get Food'
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
    case 'PENDING_INPUT_TRACKER_FOOD': {
      return {
        ...state, 
          inputTracker: initialState.inputTracker
      };
    }
    case ActionTypes.INPUT_TRACKER_FOOD: {
      return {
        ...state,
        inputTracker: {
          ...state.inputTracker, status_code: action.payload.status, message: 'Success'
        }
      };
    }
		default:
			return state;
	}
};

export { inputTrackerReducer };
