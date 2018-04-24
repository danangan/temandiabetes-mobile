import { GET_CURRENT_USER } from './constants';
import { API_CALL } from '../utils/ajaxRequestHelper';

export const getCurrentUser = () => async dispatch => {
  function onSuccess(data) {
		dispatch({
			type: GET_CURRENT_USER,
			payload: data
		});

		return data;
	}

  try {
    const option = {
      method: 'get',
      url: 'api/users/getcurrentuser'
    };
    const request = await API_CALL(option);
    onSuccess(request.data.data);
  } catch (error) {
    onSuccess(error);
  }
};
