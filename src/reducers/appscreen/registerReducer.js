import { AsyncStorage } from 'react-native';
import * as ActionTypes from '../../actions/constants';
import { authToken } from '../../utils/constants';

const initialState = {
	dataUser: {
		id: null,
		nama: null,
    email: null,
    tipe_user: null,
		message: '',
		status_code: 0
	}
};

const registerFinalStep = (state, payload) => {
	if (payload.response === undefined) {
		const { currentUser, message } = payload;
		if (payload.status_code === 500) {
			return {
				...state,
			dataUser: {
					...state.dataUser,
					message: 'Email Sudah digunakan',
					status_code: 500
				}
			};
		}
		return {
			...state,
			dataUser: {
				...state.dataUser,
				id: currentUser._id,
				nama: currentUser.nama,
        email: currentUser.email,
        tipe_user: currentUser.tipe_user,
				message,
				status_code: 200
			}
		};
	} else if (payload.response.status === 400) {
		const { data } = payload.response;
		return {
			...state,
			dataUser: { ...state.dataUser, message: data.message, status_code: 400 }
		};
	}
};

const registerReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'PENDING_REGISTER_USER':
			return {
				...state, 
					dataUser: initialState.dataUser
			};
		case ActionTypes.REGISTER_USER:
			return registerFinalStep(state, action.payload);
		default:
			return state;
	}
};

export { registerReducer };
