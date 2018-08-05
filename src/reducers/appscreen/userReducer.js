import _ from 'lodash';
import * as ActionTypes from '../../actions/constants';

const initialState = {
  status: null,
  statusSearch: 0,
  message: null,
  user: null,
  result: []
};

const getUsers = (state, payload) => {
  const filterUser = payload.data.data.users.docs.filter(
    item => item.role !== 'superadmin' && item.role !== 'admin' && item.is_active === true
  );

  const sortUser = _.orderBy(filterUser, ['role', 'nama'], ['advisor', 'asc']);

  return {
    ...state,
    status: payload.status,
    message: payload.message,
    users: [...sortUser]
  };
};

const getOneUser = (state, payload) => {
  const user = {
    innerCircleStatus: payload.data.data.innerCircleStatus,
    ...payload.data.data.user
  };

  return {
    ...state,
    status: payload.status,
    message: payload.message,
    user
  };
};

const searchUser = (state, payload) => {
  const filterUser = payload.docs.filter(
    item => item.role !== 'superadmin' && item.role !== 'admin' && item.is_active === true
  );

  const sortUser = _.orderBy(filterUser, ['role', 'nama'], ['advisor', 'asc']);

  return {
    ...state,
    result: sortUser,
    statusSearch: payload.docs.length === 0 ? 400 : 200
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS:
      return getUsers(state, action.payload);
    case 'PENDING_GET_ONE_USER':
      return { ...state, user: null, status: null, message: null };
    case ActionTypes.GET_ONE_USER:
      return getOneUser(state, action.payload);
    case ActionTypes.SEARCH_USER:
      return searchUser(state, action.payload);
    case 'RESET_STATE_RESULT_SEARCH':
      return { ...state, result: [] };
    default:
      return state;
  }
};

export { userReducer };
