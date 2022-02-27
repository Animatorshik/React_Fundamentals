import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRoute from './routes/helpers/PrivateRoute';
import { ROUTES } from './routes/routes';
import { ADMIN } from './roles/roles';

function App() {
	const navigate = useNavigate();

	/**
	 * Navigate to the Courses page
	 *
	 * @param {boolean} courseCreatedSuccess
	 */
	const navigateToCourses = (courseCreatedSuccess) => {
		if (!courseCreatedSuccess) return;

		// Navigate to the Courses list
		navigate(ROUTES.COURSES);
	};

	return (
		<main className='mb-5'>
			<div className='container'>
				<Header />
				<Routes>
					<Route path={ROUTES.REGISTRATION} element={<Registration />} />
					<Route path={ROUTES.LOGIN} element={<Login />} />
					<Route
						path={ROUTES.HOME}
						element={
							<PrivateRoute>
								<Navigate to={ROUTES.COURSES} />
							</PrivateRoute>
						}
					/>
					<Route
						path={ROUTES.COURSES}
						element={
							<PrivateRoute>
								<Courses
									onCreateCourseButtonClick={() => navigate(ROUTES.COURSE_ADD)}
								/>
							</PrivateRoute>
						}
					/>
					<Route
						path={ROUTES.COURSE_ADD}
						element={
							<PrivateRoute roles={[ADMIN]}>
								<CourseForm onCreateCourseButtonClick={navigateToCourses} />
							</PrivateRoute>
						}
					/>
					<Route
						path={ROUTES.COURSE_UPDATE()}
						element={
							<PrivateRoute roles={[ADMIN]}>
								<CourseForm onUpdateCourseButtonClick={navigateToCourses} />
							</PrivateRoute>
						}
					/>
					<Route
						path={ROUTES.COURSE()}
						element={
							<PrivateRoute>
								<CourseInfo />
							</PrivateRoute>
						}
					/>
				</Routes>
			</div>
		</main>
	);
}

export default App;
