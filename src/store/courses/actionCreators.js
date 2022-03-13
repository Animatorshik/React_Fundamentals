import {
	deleteCourseApi,
	postAddCourseApi,
	putUpdateCourseApi,
} from '../../servisces';
import {
	SET_COURSES,
	CREATE_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
} from './actionTypes';

export function setCourses(courses) {
	return {
		type: SET_COURSES,
		payload: courses,
	};
}

export function createCourse(course) {
	return async (dispatch) => {
		const response = await postAddCourseApi(course);
		if (response.successful) {
			dispatch({
				type: CREATE_COURSE,
				payload: response.result,
			});
		}
	};
}

export function updateCourse(course) {
	return async (dispatch) => {
		const response = await putUpdateCourseApi(course.id, course);
		if (response.successful) {
			dispatch({
				type: UPDATE_COURSE,
				payload: course,
			});
		}
	};
}

export function deleteCourse(courseId) {
	return async (dispatch) => {
		const response = await deleteCourseApi(courseId);
		if (response.successful) {
			dispatch({
				type: DELETE_COURSE,
				payload: courseId,
			});
		}
	};
}
