import * as ActionTypes from '../../actions/constants';

const initialState = {
  status: null,
  message: null
};

const getHistoryHba1c = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  hba1c: payload
});

const getHistoryActivity = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  activity: payload
});

const getHistoryBloodPressure = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  bloodPressure: payload
});

const getHistoryWeight = (state, payload) => ({
  ...state,
  status: null,
  message: null,
  weight: payload
});

const getHistoryFoods = (state, payload) => ({
    ...state,
    status: 200,
    message: 'success',
    foods: payload
  });

const getHistoryBloodSugarLevels = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  foods: payload
});

const historyEstimationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_HISTORY_HBA1C:
      return getHistoryHba1c(state, action.payload);
    case ActionTypes.GET_HISTORY_ACTIVITY:
      return getHistoryActivity(state, action.payload);
    case ActionTypes.GET_HISTORY_BLOOD_PRESSURE:
      return getHistoryBloodPressure(state, action.payload);
    case ActionTypes.GET_HISTORY_WEIGHT:
      return getHistoryWeight(state, action.payload);
    case ActionTypes.GET_HISTORY_FOODS:
      return getHistoryFoods(state, action.payload);
    case ActionTypes.GET_HISTORY_BLOOD_SUGAR_LEVELS:
      return getHistoryBloodSugarLevels(state, action.payload);
    default:
      return state;
  }
};

export { historyEstimationReducer };
