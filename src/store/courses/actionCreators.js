import {
	deleteCourseApi,
	getCoursesApi,
	postAddCourseApi,
	putUpdateCourseApi,
} from '../../servisces';
import {
	GET_COURSES,
	CREATE_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
} from './actionTypes';

export function getCourses() {
	return async (dispatch) => {
		const response = await getCoursesApi();
		if (response.data.successful) {
			dispatch({
				type: GET_COURSES,
				payload: response.data.result,
			});
		}
	};
}

export function createCourse(course) {
	return async (dispatch) => {
		const response = await postAddCourseApi(course);
		if (response.data.successful) {
			dispatch({
				type: CREATE_COURSE,
				payload: response.data.result,
			});
		}
	};
}

export function updateCourse(course) {
	return async (dispatch) => {
		const response = await putUpdateCourseApi(course.id, course);
		if (response.data.successful) {
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
		if (response.data.successful) {
			dispatch({
				type: DELETE_COURSE,
				payload: courseId,
			});
		}
	};
}
