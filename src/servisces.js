import { fetchSimple } from './helpers/fetchSimple';

// GET COURSES
export const getCoursesApi = () => {
	return fetchSimple(`${process.env.REACT_APP_API}/courses/all`, 'GET');
};

// GET AUTHORS
export const getAuthorsApi = () => {
	return fetchSimple(`${process.env.REACT_APP_API}/authors/all`, 'GET');
};

// REGISTER USER
export const postRegisterApi = (userData) => {
	return fetchSimple(`${process.env.REACT_APP_API}/register`, 'POST', userData);
};

// LOGIN USER
export const postLoginApi = (userData) => {
	return fetchSimple(`${process.env.REACT_APP_API}/login`, 'POST', userData);
};
