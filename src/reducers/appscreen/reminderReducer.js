import * as ActionTypes from '../../actions/constants';

const initialState = {
	listReminder: {
    data: [],
    page: 1,
    message: ''
  },
  createReminder: {
    message: '',
    status_code: 0
  },
  detailsReminder: {
    data: null,
    status_code: 0
  }
};

function getListReminder(state, payload) {
  const { data, page } = payload;
  const message = data.length ? 'Success' : 'Empty List';
  return {
    ...state, 
      listReminder: { 
        ...state.listReminder, 
        data, 
        page,
        message
    }
  };
}

const reminderReducer = (state = initialState, action) => {
	switch (action.type) {
    case 'PENDING_GET_LIST_REMINDER': 
      return {
        ...state, 
          listReminder: initialState.listReminder
      };
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
    case 'PENDING_GET_DETAILS_REMINDER':
      return {
        ...state,
        detailsReminder: initialState.detailsReminder
      };
    case ActionTypes.GET_DETAILS_REMINDER:
      const { data } = action.payload;
      return {
        ...state, 
        detailsReminder: {
          ...state.detailsReminder, data, status_code: 200
        }
      };
		default:
			return state;
	}
};

export { reminderReducer };
