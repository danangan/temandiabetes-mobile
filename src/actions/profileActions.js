import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { GET_CURRENT_USER } from './constants';
import { API_BASE } from '../utils/API';
import { authToken } from '../utils/constants';

const updateProfile = userData => {
  return async dispatch => {
    const onSuccess = data => ({
      type: GET_CURRENT_USER,
      payload: data
    })

    try {
      const TOKEN = await AsyncStorage.getItem(authToken);

      const API_CALL = axios.create({
        baseURL: API_BASE,
        headers: {
          authentication: TOKEN
        }
      });

      const { data: { data: { user } }} = await API_CALL.put(`api/users/${userData._id}`, userData);
      return dispatch(onSuccess(user))
    } catch (error) {

    }
  }
};

export { updateProfile };
