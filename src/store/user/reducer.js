import { USER_LOGIN, USER_LOGOUT, USER_ROLE } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token') ?? '',
	role: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return action.payload;

		case USER_ROLE:
			return { ...state, role: action.payload };

		case USER_LOGOUT:
			return userInitialState;

		default:
			return state;
	}
};
