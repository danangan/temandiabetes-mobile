import * as ActionTypes from '../../actions/constants';

const initialState = {
	listReminder: {
    data: [],
    page: 1
  },
  createReminder: {
    message: '',
    status_code: 0
  }
};

function getListReminder(state, payload) {
  const { data, page } = payload;
  return {
    ...state, 
      listReminder: { ...state.listReminder, data, page }
  };
}

const reminderReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_LIST_REMINDER:
      return getListReminder(state, action.payload);
    case 'PENDING_CREATE_DRUG_REMINDER': 
      return {
        ...state, createReminder: initialState.createReminder
      };
    case ActionTypes.CREATE_DRUG_REMINDER:
      return {
        ...state, 
          createReminder: {
            ...state.createReminder, 
              message: action.payload.message,
              status_code: 200
          }
      };
		default:
			return state;
	}
};

export { reminderReducer };
