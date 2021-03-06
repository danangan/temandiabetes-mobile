import * as ActionTypes from '../../actions/constants';

const initialState = {
  status: null,
  message: null,
  hba1c: null,
  activity: null,
  bloodPressure: null,
  weight: null,
  isFood: false
};

const getHistoryHba1c = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  hba1c: payload.hba1c
});

const getHistoryActivity = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  activity: payload.kategori
});

const getHistoryBloodPressure = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  bloodPressure: payload.tekananDarah
});

const getHistoryWeight = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  weight: payload.beratBadan
});

const getHistoryFoods = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  foods: payload,
  isFood: true
});

const getHistoryBloodSugarLevels = (state, payload) => ({
  ...state,
  status: 200,
  message: 'success',
  bloodSugar: payload
});

const historyEstimationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return { ...state, status: null, message: null, isFood: false };
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
    case ActionTypes.GET_BLOOD_GLUCOSE_GRAPH:
      return getHistoryBloodSugarLevels(state, action.payload);
    default:
      return state;
  }
};

export { historyEstimationReducer };
