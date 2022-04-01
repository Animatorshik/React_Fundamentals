import { getAuthorsApi, postAddAuthorApi } from '../../servisces';
import {
	GET_AUTHORS,
	CREATE_AUTHOR,
	MOVE_AUTHOR_TO_COURSE,
	MOVE_AUTHOR_FROM_COURSE,
} from './actionTypes';

export function getAuthors() {
	return async (dispatch) => {
		const response = await getAuthorsApi();
		if (response.data.successful) {
			dispatch({
				type: GET_AUTHORS,
				payload: response.data.result,
			});
		}
	};
}

export function createAuthor(author) {
	return async (dispatch) => {
		const response = await postAddAuthorApi(author);
		if (response.data.successful) {
			dispatch({
				type: CREATE_AUTHOR,
				payload: response.data.result,
			});
		}
	};
}

export function moveAuthorToCourse(authorId) {
	return {
		type: MOVE_AUTHOR_TO_COURSE,
		payload: authorId,
	};
}

export function moveAuthorFromCourse(authorId) {
	return {
		type: MOVE_AUTHOR_FROM_COURSE,
		payload: authorId,
	};
}
