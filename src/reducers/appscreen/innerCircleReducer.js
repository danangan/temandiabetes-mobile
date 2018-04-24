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
      tab: 'KELUARGA'
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

const addInnerCircle = (state, payload) => {
  console.log('ADD INNER CIRCLE REDUCER: ', payload);
  return {
    ...state,
    status: payload.status,
    message: payload.message,
    ...payload
  };
};

const updateInnerCircle = (state, payload) => ({
  ...state,
  status: payload.status,
  message: payload.message,
  ...payload
});

const removeInnerCircle = (state, payload) => ({
  ...state,
  status: payload.status,
  message: payload.message,
  ...payload
});

const innerCircleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_INNER_CIRCLE:
      return getInnerCircle(state, action.payload);
    case ActionTypes.POST_INNER_CIRCLE:
      return addInnerCircle(state, action.payload);
    case ActionTypes.DELETE_INNER_CIRCLE:
      return removeInnerCircle(state, action.payload);
    case ActionTypes.PUT_INNER_CIRCLE:
      return updateInnerCircle(state, action.payload);
    default:
      return state;
  }
};

export { innerCircleReducer };
