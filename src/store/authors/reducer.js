import {
	SET_AUTHORS,
	CREATE_AUTHOR,
	MOVE_AUTHOR_TO_COURSE,
	MOVE_AUTHOR_FROM_COURSE,
} from './actionTypes';

const authorsInitialState = [];
const authorInCourse = 'inCourse';

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case SET_AUTHORS:
			return action.payload;

		case CREATE_AUTHOR:
			return state.concat(action.payload);

		case MOVE_AUTHOR_TO_COURSE:
		case MOVE_AUTHOR_FROM_COURSE:
			const authorIndex = state.findIndex((el) => el.id === action.payload);
			if (authorIndex !== -1) {
				let newState = state.slice();
				if (action.type === MOVE_AUTHOR_TO_COURSE) {
					newState[authorIndex][authorInCourse] = true;
				} else {
					delete newState[authorIndex][authorInCourse];
				}
				return newState;
			}
			return state;

		default:
			return state;
	}
};
