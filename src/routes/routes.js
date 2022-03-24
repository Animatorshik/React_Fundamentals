export const COURSE_ID = ':courseId';

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTRATION: '/registration',
	COURSES: '/courses',
	COURSE_ADD: '/courses/add',

	COURSE: (courseId = COURSE_ID) => {
		return `/courses/${courseId}`;
	},

	COURSE_UPDATE: (courseId = COURSE_ID) => {
		return `/courses/update/${courseId}`;
	},
};
