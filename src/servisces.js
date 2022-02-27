import { easyFetch } from './helpers/easyFetch';

const API = process.env.REACT_APP_API;

// REGISTER USER
export const postRegisterApi = (data) => {
	return easyFetch(`${API}/register`, 'POST', data);
};

// LOGIN USER
export const postLoginApi = (data) => {
	return easyFetch(`${API}/login`, 'POST', data);
};

// GET USER ROLE
export const getRoleApi = () => {
	return easyFetch(`${API}/users/me`, 'GET', null, true);
};

// LOGOUT USER
export const deleteLogoutApi = () => {
	return easyFetch(`${API}/logout`, 'DELETE', null, true);
};

// GET COURSES
export const getCoursesApi = () => {
	return easyFetch(`${API}/courses/all`, 'GET');
};

// ADD COURSE
export const postAddCourseApi = (data) => {
	return easyFetch(`${API}/courses/add`, 'POST', data, true);
};

// UPDATE COURSE
export const putUpdateCourseApi = (id, data) => {
	return easyFetch(`${API}/courses/${id}`, 'PUT', data, true);
};

// DELETE COURSE
export const deleteCourseApi = (id) => {
	return easyFetch(`${API}/courses/${id}`, 'DELETE', null, true);
};

// GET AUTHORS
export const getAuthorsApi = () => {
	return easyFetch(`${API}/authors/all`, 'GET');
};

// ADD AUTHOR
export const postAddAuthorApi = (data) => {
	return easyFetch(`${API}/authors/add`, 'POST', data, true);
};
