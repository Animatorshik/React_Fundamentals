import {
	GET_COURSES,
	CREATE_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
} from './actionTypes';

const coursesInitialState = [];

let courseIndex;

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case GET_COURSES:
			return action.payload;

		case CREATE_COURSE:
			return state.concat(action.payload);

		case UPDATE_COURSE:
			courseIndex = state.findIndex((el) => el.id === action.payload.id);
			if (courseIndex !== -1) {
				let newState = state.slice();
				newState[courseIndex] = action.payload;
				return newState;
			}
			return state;

		case DELETE_COURSE:
			courseIndex = state.findIndex((el) => el.id === action.payload);
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
