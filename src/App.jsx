import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';

function App() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	// Redirecting to the login page if the user is not authorized
	useEffect(() => {
		let userToken = localStorage.getItem('user');
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
	}, [navigate, pathname]);

	/**
	 * Navigate to the Courses page
	 *
	 * @param {boolean} courseCreatedSuccess
	 */
	let navigateToCourses = (courseCreatedSuccess) => {
		if (!courseCreatedSuccess) return;

		// Navigate to the Courses list
		navigate('/courses');
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
								onCreateCourseButtonClick={() => navigate('/courses/add')}
							/>
						}
					/>
					<Route
						path='/courses/add'
						element={
							<CreateCourse onCreateCourseButtonClick={navigateToCourses} />
						}
					/>
					<Route path='/courses/:courseId' element={<CourseInfo />} />
				</Routes>
			</div>
		</main>
	);
}

export default App;
