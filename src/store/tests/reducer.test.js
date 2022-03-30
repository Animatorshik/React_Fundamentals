import { cleanup } from '@testing-library/react';

import { coursesReducer } from '../courses/reducer';
import { SET_COURSES, UPDATE_COURSE } from '../courses/actionTypes';

// Default values
const mockedDefaultCourse = {
	title: 'The best course',
	description: 'In the',
	duration: 115,
	authors: ['40b21bd5-cbae-4f33-b154-0252b1ae03a9'],
	creationDate: '06/03/2022',
	id: '088c161f-9503-4560-bbe9-84913c0b62c9',
};

const mockedState = [mockedDefaultCourse];

afterEach(cleanup);

// Tests
describe('Courses Reducer', () => {
	it('should return the initial state', () => {
		const action = { type: 'DEFAULT' };
		const newState = coursesReducer(mockedState, action);
		expect(newState).toEqual(mockedState);
	});

	it('should handle SET_COURSES and returns new state', () => {
		const mockedCourse = {
			title: 'New course',
			description: 'description',
			creationDate: '9/3/2021',
			duration: 30,
			authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
			id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
		};

		const action = { type: SET_COURSES, payload: mockedCourse };
		const newState = coursesReducer(mockedState, action);
		expect(newState).toEqual(mockedCourse);
	});

	it('should handle UPDATE_COURSE and returns new state', () => {
		const mockedCourse = {
			title: 'The best course UPD',
			description: 'In the UPD',
			duration: 110,
			authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
			creationDate: '07/03/2022',
			id: '088c161f-9503-4560-bbe9-84913c0b62c9',
		};

		const action = { type: UPDATE_COURSE, payload: mockedCourse };
		const newState = coursesReducer(mockedState, action);
		expect(newState).toEqual([mockedCourse]);
	});
});
