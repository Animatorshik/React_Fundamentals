import { SET_COURSES, CREATE_COURSE, DELETE_COURSE } from './actionTypes';

export function setCourses(courses) {
	return {
		type: SET_COURSES,
		payload: courses,
	};
}

export function createCourse(course) {
	return {
		type: CREATE_COURSE,
		payload: course,
	};
}

export function deleteCourse(courseId) {
	return {
		type: DELETE_COURSE,
		payload: courseId,
	};
}
