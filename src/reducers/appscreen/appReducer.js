import * as ActionTypes from '../../actions/constants';

const initialState = {
  deepLink: {
    currentDeepLink: '',
    expired: false,
  }
};

const updateDeepLink = (state, payload) => {
  return {
    ...state,
    deepLink: {
      ...state.deepLink,
      currentDeepLink: payload
    }
  };
};

const updateDeepLinkExpire = (state, payload) => {
  return {
    ...state,
    deepLink: {
      ...state.deepLink,
      expired: payload
    }
  };
};

const resetDeepLink = () => {
  return initialState
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_DEEPLINK:
      return updateDeepLink(state, action.payload);
    case ActionTypes.UPDATE_DEEPLINK_EXPIRED:
			return updateDeepLinkExpire(state, action.payload);
    case ActionTypes.RESET_DEEPLINK:
      return resetDeepLink();
    default:
			return state;
	}
};

export { appReducer };
