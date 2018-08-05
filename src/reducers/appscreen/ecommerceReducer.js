import * as ActionTypes from '../../actions/constants';

const initialState = {
  status: null,
  message: null
};

const getProductFromGOA = (state, payload) => ({
  ...state,
  status: payload.code,
  message: payload.message,
  products: payload.data
});

const auditTrailPrePurchase = (state, payload) => ({
  ...state,
  status: payload.status,
  message: payload.message,
  prePurchase: payload.data
});

const ecommerceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCT_FROM_GOA:
      return getProductFromGOA(state, action.payload);
    case ActionTypes.AUDIT_TRAIL_PRE_PURCHASE:
      return auditTrailPrePurchase(state, action.payload);
    default:
      return state;
  }
};

export { ecommerceReducer };
