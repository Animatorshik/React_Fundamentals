import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';

import Header from '../Header';

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

const mockedHeader = (
	<Provider store={mockedStore}>
		<Router>
			<Header />
		</Router>
	</Provider>
);

beforeEach(() => {
	render(mockedHeader);
});

afterEach(cleanup);

describe('Header component', () => {
	it('has logo', () => {
		// render(mockedHeader);
		expect(screen.getByRole('img')).toBeInTheDocument();
	});

	it('has user name', () => {
		// render(mockedHeader);
		expect(screen.queryByText('Test Name')).toBeInTheDocument();
	});
});
