const initialState = {
  activeTopTab: 1,
  activeBottomTab: 1,
};

const appNavigatorReducer = (state = initialState, action) => {
	switch (action.type) {
    case 'UPDATE_ACTIVE_TOP_TAB':
      return {
        ...state,
        activeTopTab: action.payload.activeTopTab || action.payload
      };
      break;
    case 'UPDATE_ACTIVE_BOTTOM_TAB':
      return {
        ...state,
        activeTopTab: 1,
        activeBottomTab: action.payload.activeBottomTab || action.payload
      };
      break;
    case 'UPDATE_ACTIVE_TAB':
      return {
        ...state,
        activeTopTab: action.payload.activeTopTab,
        activeBottomTab: action.payload.activeBottomTab,
      };
      break;
		default:
			return state;
	}
};

export { appNavigatorReducer };
