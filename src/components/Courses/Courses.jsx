import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

import { getCourses } from '../../store/courses/actionCreators';
import { getAuthors } from '../../store/authors/actionCreators';
import { getUser } from '../../store/selectors';
import { ADMIN } from '../../roles/roles';

/**
 * Get Authors Names by IDs and join them in one string
 *
 * @param {string[]} authorIDs
 * @returns {string}
 */
let getAuthorsNames = (authorIDs, authorsList) => {
	let names = authorsList
		.filter((author) => authorIDs.indexOf(author.id) !== -1)
		.map((author) => author.name);
	return names.join(', ');
};

/**
 * Courses React component
 */
function Courses(props) {
	const [coursesList, setCoursesList] = useState(props.courses);
	const [searchValue, setSearchValue] = useState('');
	const dispatch = useDispatch();
	const user = useSelector(getUser);

	// Default Authors and Courses
	useEffect(() => {
		dispatch(getAuthors());
		dispatch(getCourses());
	}, [dispatch]);

	/**
	 * Search courses by Title or ID
	 */
	let findCourses = () => {
		// Get Search input value
		let inputData = searchValue.toLowerCase();

		// Looking for courses by Title or ID
		let searchResult = coursesList
			.filter((course) => {
				let courseTitle = course.title.toLowerCase();
				let courseId = course.id.toLowerCase();
				if (courseTitle.includes(inputData) || courseId.includes(inputData)) {
					return true;
				}
				return false;
			})
			.map((course) => course);

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
					{user.role === ADMIN && (
						<Button
							buttonClass='btn btn-outline-success'
							buttonText='Add new course'
							onClick={props.onCreateCourseButtonClick}
						/>
					)}
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
