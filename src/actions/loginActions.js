import * as ActionTypes from './constants';

const loginManual = (mail, pass) => async (dispatch) => {
  function onSuccess(data) {
    dispatch({
      type: ActionTypes.LOGIN_MANUAL,
      payload: { email: mail, password: pass }
    });
    return data;
  }

  function onError(error) {
    dispatch({ type: ActionTypes.ERROR_GENERATED, payload: error });
    return error;
  }

  try {
    const data = await fetch('API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return onSuccess(data);
  } catch (error) {
    return onError(error);
  }
};

const loginOauth = (mail, pass) => async (dispatch) => {
  function onSuccess(data) {
    dispatch({
      type: ActionTypes.LOGIN_OAUTH,
      payload: { email: mail, password: pass }  
    });
    return data;
  }

  function onError(error) {
    dispatch({ type: ActionTypes.ERROR_GENERATED, payload: error });
    return error;
  }

  try {
    const data = await fetch('API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return onSuccess(data);
  } catch (error) {
    return onError(error);
  }
};

export { loginManual, loginOauth };
