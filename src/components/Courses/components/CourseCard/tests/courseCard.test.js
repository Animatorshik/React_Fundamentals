import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';

import CourseCard from '../CourseCard';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [],
	authors: [],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedCourseCard = (
	<Provider store={mockedStore}>
		<Router>
			<CourseCard
				id='1'
				title='Test title'
				description='Test description'
				authors='author, author2, author3, author4'
				duration={123}
				created='9/3/2021'
			/>
		</Router>
	</Provider>
);

afterEach(cleanup);

describe('CourseCard component', () => {
	it('has title', () => {
		render(mockedCourseCard);
		expect(screen.queryByText('Test title')).toBeInTheDocument();
	});

	it('has description', () => {
		render(mockedCourseCard);
		expect(screen.queryByText('Test description')).toBeInTheDocument();
	});

	it('has correct duration', () => {
		render(mockedCourseCard);
		expect(screen.queryByText('02:03 hours')).toBeInTheDocument();
	});

	it('has cropped authors list', () => {
		render(mockedCourseCard);
		expect(
			screen.queryByText('author, author2, author3, a...')
		).toBeInTheDocument();
	});

	it('has created date', () => {
		render(mockedCourseCard);
		expect(screen.queryByText('9.3.2021')).toBeInTheDocument();
	});
});
