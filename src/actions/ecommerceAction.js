import axios from 'axios';
import * as ActionTypes from './constants';

import { API_GET_PRODUCT_GOA } from '../utils/API';
import { tokenGOA } from '../utils/constants';
import { API_CALL } from '../utils/ajaxRequestHelper';

export const getProductFromGOA = () => async dispatch => {
  function onSuccess(data) {
    dispatch({
      type: ActionTypes.GET_PRODUCT_FROM_GOA,
      payload: data
    });

    return data;
  }

  try {
    const { data } = await axios(API_GET_PRODUCT_GOA, {
      method: 'POST',
      headers: {
        Authorization: tokenGOA,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        limit: 10
      }
    });

    return onSuccess(data);
  } catch (error) {
    return onSuccess(error);
  }
};

export const auditTrailPrePurchase = (productSku, productName) => async dispatch => {
  function onSuccess(data) {
    dispatch({
      type: ActionTypes.AUDIT_TRAIL_PRE_PURCHASE,
      payload: data
    });

    return data;
  }

  try {
    const option = {
      method: 'POST',
      url: 'api/audit-trail-pre-purchase',
      data: {
        product_sku: productSku,
        product_name: productName
      }
    };

    const { data } = await API_CALL(option);
    return onSuccess(data);
  } catch (error) {
    return onSuccess(error);
  }
};
