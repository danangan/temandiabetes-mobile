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
  function isPending() {
    dispatch({
      type: 'PENDING_GET_ONE_USER',
      payload: true
    });

    return true;
  }

  function onSuccess(user) {
    dispatch({
      type: ActionTypes.GET_ONE_USER,
      payload: user
    });

    return user;
  }

  isPending();

  try {
    const option = {
      method: 'GET',
      url: `api/users/${userID}`
    };

    const res = await API_CALL(option);

    return onSuccess(res);
  } catch (error) {
    return onSuccess(error);
  }
};

export const searchUser = name => async dispatch => {
  function onSuccess(user) {
    dispatch({
      type: ActionTypes.SEARCH_USER,
      payload: user
    });

    return user;
  }

  try {
    const option = {
      method: 'GET',
      url: `api/users/?search=${name}&limit=100`
    };

    const {
      data: {
        data: { users }
      }
    } = await API_CALL(option);

    onSuccess(users);
  } catch (error) {
    onSuccess(error);
  }
};

export const resetResultSearch = () => async dispatch => {
  function onReset() {
    dispatch({
      type: 'RESET_STATE_RESULT_SEARCH',
      payload: true
    });

    return true;
  }

  try {
    onReset();
  } catch (error) {
    onReset(error);
  }
};
