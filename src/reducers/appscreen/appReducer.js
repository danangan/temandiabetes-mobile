import * as ActionTypes from '../../actions/constants';

// Deeplink used for save linking and checking it in main app
// Notification also used for the same purpose, only to save the notification state when app
// opened from notification (app is killed before)

const initialState = {
  deepLink: {
    currentDeepLink: '',
    expired: false,
  },
  notification: {}
};

const updateNotification = (state, payload) => {
  return {
    ...state,
    notification: payload
  };
};

const resetNotification = (state) => {
  return {
    ...state,
    notification: {}
  };
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

const resetDeepLink = (state) => {
  return {
    ...state,
    deepLink: initialState.deepLink
  };
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.UPDATE_DEEPLINK:
      return updateDeepLink(state, action.payload);
    case ActionTypes.UPDATE_DEEPLINK_EXPIRED:
			return updateDeepLinkExpire(state, action.payload);
    case ActionTypes.RESET_DEEPLINK:
      return resetDeepLink(state);
    case ActionTypes.UPDATE_NOTIFICATION_LINKING:
      return updateNotification(state, action.payload);
    case ActionTypes.RESET_NOTIFICATION_LINKING:
      return resetNotification(state);
    default:
			return state;
	}
};

export { appReducer };
