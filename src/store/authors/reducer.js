import {
	GET_AUTHORS,
	CREATE_AUTHOR,
	MOVE_AUTHOR_TO_COURSE,
	MOVE_AUTHOR_FROM_COURSE,
} from './actionTypes';

const authorsInitialState = [];
const authorInCourse = 'inCourse';

let authorIndex;

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case GET_AUTHORS:
			return action.payload;

		case CREATE_AUTHOR:
			return state.concat(action.payload);

		case MOVE_AUTHOR_TO_COURSE:
			authorIndex = state.findIndex((el) => el.id === action.payload);
			if (authorIndex !== -1) {
				let newState = state.slice();
				newState[authorIndex][authorInCourse] = true;
				return newState;
			}
			return state;

		case MOVE_AUTHOR_FROM_COURSE:
			authorIndex = state.findIndex((el) => el.id === action.payload);
			if (authorIndex !== -1) {
				let newState = state.slice();
				delete newState[authorIndex][authorInCourse];
				return newState;
			}
			return state;

		default:
			return state;
	}
};
