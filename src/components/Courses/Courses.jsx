import React, { useState } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import SearchBar from './components/SearchBar/SearchBar';

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

/**
 * Get Authors Names by IDs and join them in one string
 *
 * @param {string[]} authorIDs
 * @returns {string}
 */
let getAuthorsNames = (authorIDs) => {
	let names = [];
	authorIDs.forEach((id) => {
		let foundAuthor = mockedAuthorsList.find((e) => e.id === id);
		names.push(foundAuthor.name);
	});
	return names.join(', ');
};

/**
 * Search courses by Title or ID
 *
 * @returns Object[]
 */
let getCourses = () => {
	// Get Search input value
	let inputData = document.getElementById('search').value;
	inputData = inputData.toLowerCase();

	// The array with search result
	let searchResult = [];

	// Looking for courses by Title or ID
	mockedCoursesList.forEach((course) => {
		let courseTitle = course.title.toLowerCase();
		let courseId = course.id.toLowerCase();
		if (courseTitle.includes(inputData) || courseId.includes(inputData)) {
			// If found, add to result array
			searchResult.push(course);
		}
	});

	return searchResult;
};

/**
 * Courses React component
 */
function Courses(props) {
	const [coursesList, setCoursesList] = useState(mockedCoursesList);

	// Find courses by Search input value
	let findCourses = () => {
		setCoursesList(getCourses());
	};

	// Display all Courses if Search input is clear
	let clerFilter = () => {
		// Get Search input value
		let inputData = document.getElementById('search').value;

		if (!inputData) {
			setCoursesList(mockedCoursesList);
		}
	};

	return (
		<>
			<div className='row mt-4'>
				<div className='col-lg-7 mb-4 mb-lg-0'>
					<SearchBar actionButton={findCourses} actionInput={clerFilter} />
				</div>
				<div className='col-lg-5 text-end'>
					<Button
						buttonClass='btn btn-outline-success'
						buttonText='Add new course'
					/>
				</div>
			</div>
			<div className='courses'>
				{coursesList.map((course) => {
					return (
						<CourseCard
							key={course.id}
							title={course.title}
							description={course.description}
							authors={getAuthorsNames(course.authors)}
							duration={course.duration}
							created={course.creationDate}
						/>
					);
				})}
			</div>
		</>
	);
}

export default Courses;
