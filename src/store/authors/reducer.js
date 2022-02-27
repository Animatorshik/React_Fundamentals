import {
	SET_AUTHORS,
	CREATE_AUTHOR,
	MOVE_AUTHOR_TO_COURSE,
	MOVE_AUTHOR_FROM_COURSE,
} from './actionTypes';

const authorsInitialState = [];
let authorIndex = null;

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case SET_AUTHORS:
			return action.payload;

		case CREATE_AUTHOR:
			return state.concat(action.payload);

		case MOVE_AUTHOR_TO_COURSE:
			authorIndex = state.findIndex((el) => el.id === action.payload);
			if (authorIndex !== -1) {
				let newState = state.slice();
				newState[authorIndex]['inCourse'] = true;
				return newState;
			}
			return state;

		case MOVE_AUTHOR_FROM_COURSE:
			authorIndex = state.findIndex((el) => el.id === action.payload);
			if (authorIndex !== -1) {
				let newState = state.slice();
				delete newState[authorIndex]['inCourse'];
				return newState;
			}
			return state;

		default:
			return state;
	}
};
