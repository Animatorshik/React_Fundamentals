import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';

const mockedCoursesList = [
	{
		id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
		title: 'JavaScript',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially u nchanged.`,
		creationDate: '8/3/2021',
		duration: 160,
		authors: [
			'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			'f762978b-61eb-4096-812b-ebde22838167',
		],
	},
	{
		id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
		title: 'Angular',
		description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
		creationDate: '10/11/2020',
		duration: 210,
		authors: [
			'df32994e-b23d-497c-9e4d-84e4dc02882f',
			'095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		],
	},
];

const mockedAuthorsList = [
	{ id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d', name: 'Vasiliy Dobkin' },
	{ id: 'f762978b-61eb-4096-812b-ebde22838167', name: 'Nicolas Kim' },
	{ id: 'df32994e-b23d-497c-9e4d-84e4dc02882f', name: 'Anna Sidorenko' },
	{ id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748', name: 'Valentina Larina' },
];

function App() {
	const [coursesList, setCoursesList] = useState(mockedCoursesList);
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	let userToken = localStorage.getItem('user');

	// Redirecting to the login page if the user is not authorized
	useEffect(() => {
		if (!userToken && pathname !== '/login' && pathname !== '/registration') {
			navigate('/login');
		}
		if (pathname === '/') {
			if (!userToken) {
				navigate('/login');
			} else {
				navigate('/courses');
			}
		}
	}, [navigate, pathname, userToken]);

	/**
	 * Add a new course to the list
	 *
	 * @param {Object[]} course
	 */
	let addNewCourse = (course) => {
		if (!course) return;

		// Add course to the list
		let newCoursesList = coursesList.slice();
		newCoursesList.push(course);
		setCoursesList(newCoursesList);

		// Display the Courses list
		navigate('/courses');
	};

	/**
	 * Add a new author to the list
	 *
	 * @param {Object[]} author
	 */
	let addNewAuthor = (author) => {
		if (!author) return;

		// Add author to the mockedAuthorsList
		let newAuthorsList = authorsList.slice();
		newAuthorsList.push(author);
		setAuthorsList(newAuthorsList);
	};

	return (
		<main>
			<div className='container'>
				<Header />
				<Routes>
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route
						path='/courses'
						element={
							<Courses
								coursesList={coursesList}
								authorsList={authorsList}
								onCreateCourseButtonClick={() => navigate('/courses/add')}
							/>
						}
					/>
					<Route
						path='/courses/add'
						element={
							<CreateCourse
								authorsList={authorsList}
								onCreateCourseButtonClick={addNewCourse}
								onCreateAuthorButtonClick={addNewAuthor}
							/>
						}
					/>
					<Route
						path='/courses/:courseId'
						element={
							<CourseInfo coursesList={coursesList} authorsList={authorsList} />
						}
					/>
				</Routes>
			</div>
		</main>
	);
}

export default App;
