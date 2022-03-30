import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Courses from '../Courses';
import { ADMIN } from '../../../roles/roles';

const mockedCoursesList = [
	{
		title: 'title',
		description: 'description',
		creationDate: '9/3/2021',
		duration: 30,
		authors: [
			'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			'1c972c52-3198-4098-b6f7-799b45903199',
			'072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			'40b21bd5-cbae-4f33-b154-0252b1ae03a9',
		],
		id: '66cc289e-6de9-49b2-9ca7-8b4f409d6467',
	},
	{
		title: 'The best course',
		description: 'In the',
		duration: 115,
		authors: [
			'40b21bd5-cbae-4f33-b154-0252b1ae03a9',
			'9987de6a-b475-484a-b885-622b8fb88bda',
			'a514bf9c-febe-41ac-96d7-6a0c41c7a62a',
		],
		creationDate: '06/03/2022',
		id: '088c161f-9503-4560-bbe9-84913c0b62c9',
	},
	{
		title: 'My awesome Course',
		description: 'Description',
		duration: 99,
		authors: ['a514bf9c-febe-41ac-96d7-6a0c41c7a62a'],
		creationDate: '19/03/2022',
		id: '7211969b-e421-4497-8d90-c56e0fc20fce',
	},
];

const mockedAuthorsList = [
	{ name: 'author', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36' },
	{ name: 'author2', id: '1c972c52-3198-4098-b6f7-799b45903199' },
	{ name: 'author3', id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed' },
	{ name: 'author4', id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9' },
	{ name: 'author5', id: '5e0b0f18-32c9-4933-b142-50459b47f09e' },
	{ name: 'author6', id: '9987de6a-b475-484a-b885-622b8fb88bda' },
	{ name: 'Harry Potter', id: 'a514bf9c-febe-41ac-96d7-6a0c41c7a62a' },
];

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: ADMIN,
	},
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockCallBack = jest.fn();

const mockedCourses = (
	<Provider store={mockedStore}>
		<Router>
			<Courses onCreateCourseButtonClick={mockCallBack} />
		</Router>
	</Provider>
);

afterEach(cleanup);

describe('Courses component', () => {
	it('display amount of CourseCard equal length of courses array', () => {
		const { container } = render(mockedCourses);
		expect(container.getElementsByClassName('course-card').length).toBe(
			mockedCoursesList.length
		);
	});

	it('display Empty container if courses array length is 0', () => {
		const mockedState = {
			user: {
				isAuth: true,
				name: 'Test Name',
				role: ADMIN,
			},
			courses: [],
			authors: [],
		};

		const mockedStore = {
			getState: () => mockedState,
			subscribe: jest.fn(),
			dispatch: jest.fn(),
		};

		const mockedCourses = (
			<Provider store={mockedStore}>
				<Router>
					<Courses onCreateCourseButtonClick={() => jest.fn()} />
				</Router>
			</Provider>
		);

		const { container } = render(mockedCourses);
		expect(container.getElementsByClassName('course-card').length).toBe(0);
	});
});

it('CourseForm should be showed after click on "Add new course"', () => {
	const { container } = render(mockedCourses);
	const button = container.querySelector('button.btn-outline-success');
	act(() => {
		button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
	});
	expect(mockCallBack.mock.calls.length).toEqual(1);
});
