import React, { useState, useEffect } from 'react';

import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

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
	const [coursesList, setCoursesList] = useState(props.coursesList);
	const [searchValue, setSearchValue] = useState('');
	const saveCoursesList = [...props.coursesList];

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
			setCoursesList(saveCoursesList);
		}
	}, [searchValue]);

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
							authors={getAuthorsNames(course.authors, props.authorsList)}
							duration={course.duration}
							created={course.creationDate}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Courses;
