import { getRoleApi } from '../../servisces';
import { USER_LOGIN, USER_LOGOUT, USER_ROLE } from './actionTypes';

export function userLogin(user) {
	return {
		type: USER_LOGIN,
		payload: user,
	};
}

export function userRole() {
	return async (dispatch) => {
		const response = await getRoleApi();
		if (response.successful) {
			dispatch({
				type: USER_ROLE,
				payload: response.result.role,
			});
		}
	};
}

export function userLogout() {
	return async (dispatch) => {
		const response = await getRoleApi();
		if (response.successful) {
			dispatch({
				type: USER_LOGOUT,
			});
			localStorage.removeItem('user');
		}
	};
}
