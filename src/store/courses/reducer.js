import { SET_COURSES, CREATE_COURSE, DELETE_COURSE } from './actionTypes';

const coursesInitialState = [];

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case SET_COURSES:
			return action.payload;
		case CREATE_COURSE:
			return state.concat(action.payload);
		case DELETE_COURSE:
			let courseIndex = state.findIndex((el) => el.id === action.payload);
			if (courseIndex !== -1) {
				let newState = state.slice();
				newState.splice(courseIndex, 1);
				return newState;
			}
			return state;
		default:
			return state;
	}
};
