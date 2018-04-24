import * as ActionTypes from './constants';
import { API_CALL } from '../utils/ajaxRequestHelper';

export const getUsers = () => async dispatch => {
  function onSuccess(users) {
    dispatch({
      type: ActionTypes.GET_USERS,
      payload: users
    });

    return users;
  }

  try {
    const option = {
      method: 'GET',
      url: 'api/users?limit=100'
    };

    const res = await API_CALL(option);

    return onSuccess(res);
  } catch (error) {
    return onSuccess(error);
  }
};

export const getOneUser = userID => async dispatch => {
  function onSuccess(user) {
    dispatch({
      type: ActionTypes.GET_ONE_USER,
      payload: user
    });

    return onSuccess(user);
  }

  try {
    const option = {
      method: 'GET',
      url: `api/users/${userID}`
    };

    const { data } = await API_CALL(option);
    console.log('GET ONE USER: ', data.data);
    const res = {
      user: {
        innerCircleStatus: data.innerCircleStatus,
        user: data.data.user
      }
    };

    return onSuccess(res);
  } catch (error) {
    return onSuccess(error);
  }
};
