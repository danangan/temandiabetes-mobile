import * as ActionTypes from '../../actions/constants';

const initialState = {
	suggetion: {
    food: [],
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
		default:
			return state;
	}
};

export { inputTrackerReducer };
