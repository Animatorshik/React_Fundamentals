import { USER_LOGIN, USER_LOGOUT } from './actionTypes';

export function userLogin(user) {
	return {
		type: USER_LOGIN,
		payload: user,
	};
}

export function userLogout() {
	return {
		type: USER_LOGOUT,
	};
}
