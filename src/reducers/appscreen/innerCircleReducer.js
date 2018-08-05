import * as ActionTypes from '../../actions/constants';

const initialState = {
  status: null,
  message: null,
  tabs: []
};

const getInnerCircle = (state, payload) => {
  const { accepted, requested, pending } = payload.data.innerCircles;
  const item = [
    {
      count: accepted,
      tab: 'INNER CIRCLE'
    },
    {
      count: pending,
      tab: 'PERMINTAAN'
    },
    {
      count: requested,
      tab: 'PENDING'
    }
  ];

  return {
    ...state,
    status: payload.status,
    message: payload.message,
    tabs: item,
    ...payload.data.innerCircles
  };
};

const addInnerCircle = (state, payload) => ({
  ...state,
  status: payload.status,
  message: payload.message,
  addInnerCircle: payload.data
});

const rejectInnerCircle = (state, payload) => ({
  ...state,
  status: payload.data.status,
  message: payload.data.message,
  rejectInnerCircle: payload.data
});

const acceptInnerCircle = (state, payload) => ({
  ...state,
  status: payload.data.status,
  message: payload.data.message,
  acceptInnerCircle: payload.data.data
});

const deleteInnerCircle = (state, payload) => ({
  ...state,
  status: payload.data.status,
  message: payload.data.message,
  deleteInnerCircle: payload.data
});

const innerCircleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_INNER_CIRCLE:
      return getInnerCircle(state, action.payload);
    case 'IS_PENDING':
      return { ...state, status: null, message: null };
    case ActionTypes.POST_INNER_CIRCLE:
      return addInnerCircle(state, action.payload);
    case ActionTypes.ACCEPT_REQUEST_TO_INNER_CIRCLE:
      return acceptInnerCircle(state, action.payload);
    case ActionTypes.DELETE_INNER_CIRCLE:
      return deleteInnerCircle(state, action.payload);
    case ActionTypes.DECLINE_REQUEST_TO_INNER_CIRCLE:
      return rejectInnerCircle(state, action.payload);
    default:
      return state;
  }
};

export { innerCircleReducer };
