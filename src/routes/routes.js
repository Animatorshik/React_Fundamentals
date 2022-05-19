export const COURSE_ID = ':courseId';

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTRATION: '/registration',
	COURSES: '/courses',
	COURSE_ADD: '/courses/add',
	COURSE: (courseId = COURSE_ID) => `/courses/${courseId}`,
	COURSE_UPDATE: (courseId = COURSE_ID) => `/courses/update/${courseId}`,
};
