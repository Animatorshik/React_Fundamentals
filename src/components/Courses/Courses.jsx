import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import { getCoursesApi, getAuthorsApi } from '../../servisces';
import { setCourses } from '../../store/courses/actionCreators';
import { setAuthors } from '../../store/authors/actionCreators';

/**
 * Get Authors Names by IDs and join them in one string
 *
 * @param {string[]} authorIDs
 * @returns {string}
 */
let getAuthorsNames = (authorIDs, authorsList) => {
	let names = [];
	authorIDs.forEach((id) => {
		let foundAuthor = authorsList.find((e) => e.id === id);
		names.push(foundAuthor.name);
	});
	return names.join(', ');
};

/**
 * Courses React component
 */
function Courses(props) {
	const [coursesList, setCoursesList] = useState(props.courses);
	const [searchValue, setSearchValue] = useState('');
	const dispatch = useDispatch();

	// Default Authors and Courses
	useEffect(() => {
		getAuthorsApi().then((data) => {
			if (data.successful && !props.authors.length) {
				dispatch(setAuthors(data.result));
			}
			getCoursesApi().then((data) => {
				if (data.successful && !coursesList.length) {
					dispatch(setCourses(data.result));
				}
			});
		});
	}, []);

	/**
	 * Search courses by Title or ID
	 */
	let findCourses = () => {
		// Get Search input value
		let inputData = searchValue.toLowerCase();

		// The array with search result
		let searchResult = [];

		// Looking for courses by Title or ID
		coursesList.forEach((course) => {
			let courseTitle = course.title.toLowerCase();
			let courseId = course.id.toLowerCase();
			if (courseTitle.includes(inputData) || courseId.includes(inputData)) {
				// If found, add to result array
				searchResult.push(course);
			}
		});

		setCoursesList(searchResult);
	};

	/**
	 * Display all Courses if Search input is clear
	 */
	useEffect(() => {
		if (!searchValue) {
			setCoursesList(props.courses);
		}
	}, [searchValue, props.courses]);

	return (
		<div className='courses-wrapper'>
			<div className='row mt-4'>
				<div className='col-lg-7 mb-4 mb-lg-0'>
					<SearchBar
						onButtonClick={findCourses}
						onInputChange={(value) => setSearchValue(value)}
					/>
				</div>
				<div className='col-lg-5 text-end'>
					<Button
						buttonClass='btn btn-outline-success'
						buttonText='Add new course'
						onClick={props.onCreateCourseButtonClick}
					/>
				</div>
			</div>
			<div className='courses'>
				{coursesList.map((course) => {
					return (
						<CourseCard
							key={course.id}
							id={course.id}
							title={course.title}
							description={course.description}
							authors={getAuthorsNames(course.authors, props.authors)}
							duration={course.duration}
							created={course.creationDate}
						/>
					);
				})}
			</div>
		</div>
	);
}

// Map store state to props
const mapStateToProps = (state) => {
	return {
		courses: state.courses,
		authors: state.authors,
	};
};

Courses.propTypes = {
	courses: PropTypes.arrayOf(PropTypes.object),
	authors: PropTypes.arrayOf(PropTypes.object),
	onCreateCourseButtonClick: PropTypes.func,
};

export default connect(mapStateToProps)(Courses);
