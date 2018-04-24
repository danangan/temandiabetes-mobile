import * as ActionTypes from './constants';
import { API_CALL } from '../utils/ajaxRequestHelper';

export const getInnerCircle = userID => async dispatch => {
  function onSuccess(innerCircles) {
    dispatch({
      type: ActionTypes.GET_INNER_CIRCLE,
      payload: innerCircles
    });

    return innerCircles;
  }

  try {
    const option = {
      type: 'GET',
      url: `api/users/${userID}/innercircles`
    };

		const { data } = await API_CALL(option);
		
    return onSuccess(data);
  } catch (error) {
    return onSuccess(error);
  }
};

export const addInnerCircle = userID => async dispatch => {
  function onSuccess(data) {
    dispatch({
      type: ActionTypes.POST_INNER_CIRCLE,
      payload: data
    });
  }

  try {
    const option = {
      method: 'POST',
      url: 'api/users/innercircles',
      data: {
        userId: userID
      }
    };

		const { data } = await API_CALL(option);
		
    return onSuccess(data);
  } catch (error) {
    return onSuccess(error);
  }
};
