import { easyAxios } from './helpers/easyAxios';

const API = process.env.REACT_APP_API;

// REGISTER USER
export const postRegisterApi = (data) => {
	return easyAxios(`${API}/register`, 'POST', data);
};

// LOGIN USER
export const postLoginApi = (data) => {
	return easyAxios(`${API}/login`, 'POST', data);
};

// GET USER ROLE
export const getRoleApi = () => {
	return easyAxios(`${API}/users/me`, 'GET', null, true);
};

// LOGOUT USER
export const deleteLogoutApi = () => {
	return easyAxios(`${API}/logout`, 'DELETE', null, true);
};

// GET COURSES
export const getCoursesApi = () => {
	return easyAxios(`${API}/courses/all`, 'GET');
};

// ADD COURSE
export const postAddCourseApi = (data) => {
	return easyAxios(`${API}/courses/add`, 'POST', data, true);
};

// UPDATE COURSE
export const putUpdateCourseApi = (id, data) => {
	return easyAxios(`${API}/courses/${id}`, 'PUT', data, true);
};

// DELETE COURSE
export const deleteCourseApi = (id) => {
	return easyAxios(`${API}/courses/${id}`, 'DELETE', null, true);
};

// GET AUTHORS
export const getAuthorsApi = () => {
	return easyAxios(`${API}/authors/all`, 'GET');
};

// ADD AUTHOR
export const postAddAuthorApi = (data) => {
	return easyAxios(`${API}/authors/add`, 'POST', data, true);
};
