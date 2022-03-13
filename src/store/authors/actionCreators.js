import { postAddAuthorApi } from '../../servisces';
import {
	SET_AUTHORS,
	CREATE_AUTHOR,
	MOVE_AUTHOR_TO_COURSE,
	MOVE_AUTHOR_FROM_COURSE,
} from './actionTypes';

export function setAuthors(authors) {
	return {
		type: SET_AUTHORS,
		payload: authors,
	};
}

export function createAuthor(author) {
	return async (dispatch) => {
		const response = await postAddAuthorApi(author);
		if (response.successful) {
			dispatch({
				type: CREATE_AUTHOR,
				payload: response.result,
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
