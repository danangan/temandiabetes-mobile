import * as ActionTypes from './constants';
import axios from 'axios'
import { API_SIGN_UP, API_SIGN_IN } from "../utils/API";

const signAction = (idToken) => {
  firebase.auth().signInWithCustomToken(token).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

}

const registerActionSuccess = (data) => ({
  type: ActionTypes.REGISTER_USER,
  payload: data
});

const registerAction = (userData) => {
  console.log("ADAA... ", userData);
  return (dispatch) => {
    axios.post(API_SIGN_UP, userData)
      .then(data => {
        dispatch(registerActionSuccess(data));
        dispatch(signAction(data.idToken));
      })
      .catch(error => dispatch(registerActionSuccess(error)));
  };
};

const registerStepOne = (data) => ({
  type: ActionTypes.REGISTER_STEP_ONE,
  payload: data
});

export { registerAction, registerStepOne };

