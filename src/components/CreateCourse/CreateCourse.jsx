import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';

import { pipeDuration } from '../../helpers/pipeDuration';

/**
 * Validation
 */
let validate = (rule, message) => {
	if (rule) {
		return true;
	}
	alert(message);
	return false;
};

/**
 * Author with action button React component
 */
function AuthorWithButton(props) {
	return (
		<div className='author row my-2'>
			<div className='name col-6 text-end mt-1'>{props.name}</div>
			<div className='col-6'>
				<Button
					buttonClass={props.buttonClass}
					buttonText={props.buttonText}
					onClick={props.onClick}
				/>
			</div>
		</div>
	);
}

/**
 * Create Course React component
 */
function CreateCourse(props) {
	const [authorsList, setAuthorsList] = useState(props.authorsList);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [authorName, setAuthorName] = useState('');

	/**
	 * Create a new author
	 */
	let createNewAuthor = () => {
		// Validation
		let nameValidation = validate(
			authorName.length >= 2,
			'Author name length should be at least 2 characters'
		);
		if (!nameValidation) return;

		// Copy the Main Authors list
		let newAuthorsList = authorsList.slice();

		// New author
		let newAuthor = {
			id: uuidv4(),
			name: authorName,
		};

		// Add this author to the Main list
		newAuthorsList.push(newAuthor);

		// Set new Main Authors list
		setAuthorsList(newAuthorsList);

		// Clear the input
		document.getElementById('createAuthorName').value = '';

		return newAuthor;
	};

	/**
	 * Add author to the course or remove
	 *
	 * @param {string} authorId
	 * @param {boolean} moveToCourse
	 */
	let moveAuthor = (authorId, moveToCourse) => {
		let aurhorIndex = 0;
		let newAuthorsList = [];

		if (moveToCourse) {
			aurhorIndex = authorsList.findIndex((el) => el.id === authorId);

			// Copy the Course Authors list
			let newCourseAuthorsList = courseAuthorsList.slice();

			// Add this author to the Course list
			newCourseAuthorsList.push(authorsList[aurhorIndex]);

			// Set new Course Authors list
			setCourseAuthorsList(newCourseAuthorsList);

			// Copy the Main Authors list
			newAuthorsList = authorsList.slice();

			// Remove this author from the Main list
			newAuthorsList.splice(aurhorIndex, 1);
		} else {
			aurhorIndex = courseAuthorsList.findIndex((el) => el.id === authorId);

			// Copy the Course Authors list
			let newCourseAuthorsList = courseAuthorsList.slice();

			// Remove this author from the Course list
			newCourseAuthorsList.splice(aurhorIndex, 1);

			// Set new Course Authors list
			setCourseAuthorsList(newCourseAuthorsList);

			// Copy the Main Authors list
			newAuthorsList = authorsList.slice();

			// Add this author to the Main list
			newAuthorsList.push(courseAuthorsList[aurhorIndex]);
		}

		// Set new Main Authors list
		setAuthorsList(newAuthorsList);
	};

	/**
	 * Create a new course
	 */
	let createNewCourse = () => {
		let id = uuidv4();
		let date = new Date();
		let creationDate = date.toLocaleDateString('en-US');
		let durationNum = Number(duration);
		let authors = [];
		courseAuthorsList.forEach((author) => {
			authors.push(author.id);
		});

		// Validation
		let createCourseValidation = validate(
			title.length >= 2 &&
				description.length >= 2 &&
				durationNum > 0 &&
				authors.length,
			'Please, fill in all fields'
		);
		if (!createCourseValidation) return;

		let newCourse = {
			id: id,
			title: title,
			description: description,
			creationDate: creationDate,
			duration: durationNum,
			authors: authors,
		};
		return newCourse;
	};

	return (
		<div className='create-course-wrapper'>
			<div className='row mt-4'>
				<div className='col-7'>
					<Input
						type='text'
						id='createCourseTitle'
						placeholdetText='Enter title...'
						labelText='Title'
						onChange={(value) => setTitle(value)}
					/>
				</div>
				<div className='col-5 d-flex align-items-end justify-content-end'>
					<Button
						buttonClass='btn btn-outline-primary'
						buttonText='Create course'
						onClick={() => props.onCreateCourseButtonClick(createNewCourse())}
					/>
				</div>
			</div>
			<div className='mt-4'>
				<Textarea
					id='createCourseDescription'
					placeholdetText='Enter description'
					labelText='Description'
					onChange={(value) => setDescription(value)}
				/>
			</div>
			<div className='row'>
				<div className='col-lg-6'>
					<div className='section create-author mt-4'>
						<div className='fs-4 text-center'>Add Author</div>
						<Input
							type='text'
							id='createAuthorName'
							placeholdetText='Enter author name...'
							labelText='Author name'
							onChange={(value) => setAuthorName(value)}
						/>
						<Button
							buttonClass='btn btn-outline-success mt-3'
							buttonText='Create author'
							onClick={() => props.onCreateAuthorButtonClick(createNewAuthor())}
						/>
					</div>
					<div className='section duration mt-4'>
						<div className='fs-4 text-center'>Duration</div>
						<Input
							type='number'
							id='createCourseDuration'
							placeholdetText='Enter duration in minutes...'
							labelText='Duration'
							onChange={(value) => setDuration(value)}
						/>
						<div className='fs-3'>Duration: {pipeDuration(duration)}</div>
					</div>
				</div>
				<div className='col-lg-6'>
					<div className='section authors mt-4'>
						<div className='fs-4 text-center'>Authors</div>
						<div className='authors'>
							{authorsList.map((author) => {
								return (
									<AuthorWithButton
										key={author.id}
										name={author.name}
										buttonText='Add author'
										buttonClass='btn btn-outline-primary btn-sm'
										onClick={() => moveAuthor(author.id, true)}
									/>
								);
							})}
						</div>
					</div>
					<div className='section course-authors mt-4'>
						<div className='fs-4 text-center'>Course authors</div>
						<div className='course-authors'>
							{courseAuthorsList.map((author) => {
								return (
									<AuthorWithButton
										key={author.id}
										name={author.name}
										buttonText='Delete author'
										buttonClass='btn btn-outline-danger btn-sm'
										onClick={() => moveAuthor(author.id, false)}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateCourse;
