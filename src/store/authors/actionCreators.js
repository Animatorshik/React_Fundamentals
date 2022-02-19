import { SET_AUTHORS, CREATE_AUTHOR } from './actionTypes';

export function setAuthors(authors) {
	return {
		type: SET_AUTHORS,
		payload: authors,
	};
}

export function createAuthor(author) {
	return {
		type: CREATE_AUTHOR,
		payload: author,
	};
}
