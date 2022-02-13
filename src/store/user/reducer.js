import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('user') ?? '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case USER_LOGIN:
			return action.payload;
		case USER_LOGOUT:
			return userInitialState;
		default:
			return state;
	}
};
