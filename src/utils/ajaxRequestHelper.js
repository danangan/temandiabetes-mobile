import axios from 'axios';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import { authToken } from '../utils/constants';
import { API_BASE } from '../utils/API';

/*
  ONLY USE THIS AXIOS WRAPPER FOR AUTH REQUIRED API
  FOR STANDARDIZATION USE PROMISE INSTEAD OF ASYNC AWAIT ON THE WRAPPER

  option should be
  {
    url: 'url',
    method: 'get'/'post'/'put',
    data: {}
  }
*/

const API_CALL = async option => {
  // call the api
  try {
    // get the token
    const TOKEN = await AsyncStorage.getItem(authToken);
    // adding the authentication token
    const API_OPTION = {
      baseURL: API_BASE,
      headers: {
        authentication: TOKEN
      },
      ...option,
    }
    const res = await axios.request(API_OPTION)
    return Promise.resolve(res)
  } catch ({ response }) {
    if (response.status ===  401 && firebase.auth().currentUser) {
      try {
        const firebaseIdToken = await firebase.auth().currentUser.getIdToken()
        await AsyncStorage.setItem(authToken, firebaseIdToken)
        // call the function again
        API_CALL(option)
      } catch ({ response }) {
        throw new Error(response)
      }
    } else {
      throw new Error(response)
    }
  }
}

export { API_CALL }
