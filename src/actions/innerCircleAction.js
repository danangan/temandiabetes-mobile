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
  function isPending() {
    dispatch({
      type: 'IS_PENDING',
      payload: true
    });

    return true;
  }

  function onSuccess(data) {
    dispatch({
      type: ActionTypes.POST_INNER_CIRCLE,
      payload: data
    });
  }

  isPending();

  try {
    const option = {
      method: 'POST',
      url: 'api/users/innercircles',
      data: {
        userId: userID
      }
    };

    const { data } = await API_CALL(option);
    dispatch(getInnerCircle(userID))

    return onSuccess(data);
  } catch (error) {
    const errMessage = {
      status: 400,
      message: 'Hanya diabetesi yang boleh menambahkan inner circle'
    };
    return onSuccess(errMessage);
  }
};

export const deleteInnerCircle = (userId, innerCircleId) => async dispatch => {
  function onSuccess(response) {
    dispatch({
      type: ActionTypes.DELETE_INNER_CIRCLE,
      payload: response
    });

    return response;
  }

  try {
    const option = {
      method: 'DELETE',
      url: `api/users/${userId}/innercircles/${innerCircleId}`
    };

    const res = await API_CALL(option);
    dispatch(getInnerCircle(userId))
    onSuccess(res);
  } catch (error) {
    onSuccess(error);
  }
};

export const acceptRequestToInnerCircle = (friendId, innerCircleId, cb = () => {}) => async dispatch => {
  function onSuccess(response) {
    dispatch({
      type: ActionTypes.ACCEPT_REQUEST_TO_INNER_CIRCLE,
      payload: response
    });

    return response;
  }

  try {
    const option = {
      method: 'PUT',
      url: `api/users/${friendId}/innercircles/${innerCircleId}`,
      data: {
        status: 'accepted',
        action: 'accept'
      }
    };

    const res = await API_CALL(option);
    dispatch(getInnerCircle(friendId))
    cb()
    onSuccess(res);
  } catch (error) {
    onSuccess(error);
  }
};

export const declineRequestToInnerCircle = (friendId, innerCircleId) => async dispatch => {
  function onSuccess(response) {
    dispatch({
      type: ActionTypes.DECLINE_REQUEST_TO_INNER_CIRCLE,
      payload: response
    });

    return response;
  }

  try {
    const option = {
      method: 'DELETE',
      url: `api/users/${friendId}/innercircles/${innerCircleId}`
    };

    const res = await API_CALL(option);
    dispatch(getInnerCircle(friendId))
    onSuccess(res);
  } catch (error) {
    onSuccess(error);
  }
};
