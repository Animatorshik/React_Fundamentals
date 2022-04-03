import { easyAxios } from './helpers/easyAxios';

const API = process.env.REACT_APP_API;
const noData = null;
const withToken = true;

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
	return easyAxios(`${API}/users/me`, 'GET', noData, withToken);
};

// LOGOUT USER
export const deleteLogoutApi = () => {
	return easyAxios(`${API}/logout`, 'DELETE', noData, withToken);
};

// GET COURSES
export const getCoursesApi = () => {
	return easyAxios(`${API}/courses/all`, 'GET');
};

// ADD COURSE
export const postAddCourseApi = (data) => {
	return easyAxios(`${API}/courses/add`, 'POST', data, withToken);
};

// UPDATE COURSE
export const putUpdateCourseApi = (id, data) => {
	return easyAxios(`${API}/courses/${id}`, 'PUT', data, withToken);
};

// DELETE COURSE
export const deleteCourseApi = (id) => {
	return easyAxios(`${API}/courses/${id}`, 'DELETE', noData, withToken);
};

// GET AUTHORS
export const getAuthorsApi = () => {
	return easyAxios(`${API}/authors/all`, 'GET');
};

// ADD AUTHOR
export const postAddAuthorApi = (data) => {
	return easyAxios(`${API}/authors/add`, 'POST', data, withToken);
};
