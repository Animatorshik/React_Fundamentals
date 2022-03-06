import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';

import { pipeDuration } from '../../helpers/pipeDuration';
import { validation } from '../../helpers/validation';

import {
	createAuthor,
	moveAuthorToCourse,
	moveAuthorFromCourse,
} from '../../store/authors/actionCreators';
import { createCourse, updateCourse } from '../../store/courses/actionCreators';
import { ROUTES } from '../../routes/routes';

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
	const params = useParams();
	const courseId = params.courseId;
	const course = props.courses.find((item) => item.id === courseId);

	const [separateAuthorsList, setSeparateAuthorsList] = useState({
		free: props.authors,
		course: [],
	});
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState(0);
	const [authorName, setAuthorName] = useState('');

	/**
	 * Create a new author
	 */
	const createNewAuthor = () => {
		// Validation
		let nameValidation = validation(
			authorName.length >= 2,
			'Author name length should be at least 2 characters'
		);
		if (!nameValidation) return;

		// New author
		let newAuthor = {
			name: authorName,
		};

		// Add new author to the store and server
		props.createAuthor(newAuthor);

		// Clear the input
		setAuthorName('');

		return true;
	};

	/**
	 * Create a new course
	 */
	const createNewCourse = () => {
		const date = new Date();
		const creationDate = new Intl.DateTimeFormat('en-GB').format(date);
		const durationNum = Number(duration);
		const authors = [];
		separateAuthorsList.course.forEach((author) => {
			authors.push(author.id);
		});

		// Validation
		let createCourseValidation = validation(
			title.length >= 2 &&
				description.length >= 2 &&
				durationNum > 0 &&
				authors.length,
			'Please, fill in all fields'
		);
		if (!createCourseValidation) return;

		let newCourse = {
			title: title,
			description: description,
			creationDate: creationDate,
			duration: durationNum,
			authors: authors,
		};

		// Add new Course to the store
		props.createCourse(newCourse);

		return true;
	};

	/**
	 * Update the course
	 */
	const updateCourse = () => {
		const durationNum = Number(duration);
		const authors = [];
		separateAuthorsList.course.forEach((author) => {
			authors.push(author.id);
		});

		// Validation
		const updateCourseValidation = validation(
			title.length >= 2 &&
				description.length >= 2 &&
				durationNum > 0 &&
				authors.length,
			'Please, fill in all fields'
		);
		if (!updateCourseValidation) return;

		const updCourse = {
			id: course.id,
			title: title,
			description: description,
			creationDate: course.creationDate,
			duration: durationNum,
			authors: authors,
		};

		props.updateCourse(updCourse);
		return true;
	};

	// Default course values on edit
	useEffect(() => {
		if (!!course) {
			// Edit course
			setTitle(course.title);
			setDescription(course.description);
			setDuration(course.duration);

			course.authors.forEach((authorId) => {
				props.moveAuthorToCourse(authorId);
			});
		} else {
			// Create course
			// Mark all authors as free
			props.authors.forEach((author) => {
				if (author.inCourse) {
					props.moveAuthorFromCourse(author.id);
				}
			});
		}
	}, [course]);

	// Move authors
	useEffect(() => {
		let freeAuthors = [];
		let courseAuthors = [];

		props.authors.forEach((author) => {
			if (author.inCourse) {
				courseAuthors.push(author);
			} else {
				freeAuthors.push(author);
			}
		});

		setSeparateAuthorsList({ free: freeAuthors, course: courseAuthors });
	}, [props.authors]);

	return (
		<div className='create-course-wrapper'>
			<div className='back-link mt-3'>
				<Link to={ROUTES.COURSES}>Cancel</Link>
			</div>
			<div className='row mt-4'>
				<div className='col-7'>
					<Input
						type='text'
						id='createCourseTitle'
						placeholdetText='Enter title...'
						labelText='Title'
						value={title}
						onChange={(value) => setTitle(value)}
					/>
				</div>
				<div className='col-5 d-flex align-items-end justify-content-end'>
					{!course ? (
						<Button
							buttonClass='btn btn-outline-success'
							buttonText='Create course'
							onClick={() => props.onCreateCourseButtonClick(createNewCourse())}
						/>
					) : (
						<Button
							buttonClass='btn btn-outline-warning'
							buttonText='Update course'
							onClick={() => props.onUpdateCourseButtonClick(updateCourse())}
						/>
					)}
				</div>
			</div>
			<div className='mt-4'>
				<Textarea
					id='createCourseDescription'
					placeholdetText='Enter description'
					labelText='Description'
					value={description}
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
							value={authorName}
							onChange={(value) => setAuthorName(value)}
						/>
						<Button
							buttonClass='btn btn-outline-success mt-3'
							buttonText='Create author'
							onClick={createNewAuthor}
						/>
					</div>
					<div className='section duration mt-4'>
						<div className='fs-4 text-center'>Duration</div>
						<Input
							type='number'
							id='createCourseDuration'
							placeholdetText='Enter duration in minutes...'
							labelText='Duration'
							value={duration ? String(duration) : ''}
							onChange={(value) => setDuration(value)}
						/>
						<div className='fs-3'>Duration: {pipeDuration(duration)}</div>
					</div>
				</div>
				<div className='col-lg-6'>
					<div className='section authors mt-4'>
						<div className='fs-4 text-center'>Authors</div>
						<div className='authors'>
							{separateAuthorsList.free.map((author) => {
								return (
									<AuthorWithButton
										key={author.id}
										name={author.name}
										buttonText='Add author'
										buttonClass='btn btn-outline-primary btn-sm'
										onClick={() => props.moveAuthorToCourse(author.id)}
									/>
								);
							})}
						</div>
					</div>
					<div className='section course-authors mt-4'>
						<div className='fs-4 text-center'>Course authors</div>
						<div className='course-authors'>
							{separateAuthorsList.course.map((author) => {
								return (
									<AuthorWithButton
										key={author.id}
										name={author.name}
										buttonText='Delete author'
										buttonClass='btn btn-outline-danger btn-sm'
										onClick={() => props.moveAuthorFromCourse(author.id)}
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

const mapStateToProps = (state) => ({
	courses: state.courses,
	authors: state.authors,
});

const mapDispatchToProps = {
	createAuthor,
	moveAuthorToCourse,
	moveAuthorFromCourse,
	createCourse,
	updateCourse,
};

CreateCourse.propTypes = {
	authors: PropTypes.arrayOf(PropTypes.object),
	onCreateCourseButtonClick: PropTypes.func,
	onUpdateCourseButtonClick: PropTypes.func,
	onCreateAuthorButtonClick: PropTypes.func,
};

AuthorWithButton.propTypes = {
	name: PropTypes.string,
	buttonClass: PropTypes.string,
	buttonText: PropTypes.string,
	onClick: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);
