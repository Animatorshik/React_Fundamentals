import React, { useState } from 'react';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Textarea from '../../common/Textarea/Textarea';

import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGeneratop';

function CreateCourse(props) {
	return (
		<div className='create-course-wrapper'>
			<div className='row mt-4'>
				<div className='col-7'>
					<Input
						type='text'
						id='createCourseTitle'
						placeholdetText='Enter title...'
						labelText='Title'
					/>
				</div>
				<div className='col-5 d-flex align-items-end justify-content-end'>
					<Button
						buttonClass='btn btn-outline-primary'
						buttonText='Create course'
					/>
				</div>
			</div>
			<div className='mt-4'>
				<Textarea
					id='createCourseDescription'
					placeholdetText='Enter description'
					labelText='Description'
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
						/>
						<Button
							buttonClass='btn btn-outline-success mt-3'
							buttonText='Create author'
						/>
					</div>
					<div className='section duration mt-4'>
						<div className='fs-4 text-center'>Duration</div>
						<Input
							type='number'
							id='createCourseDuration'
							placeholdetText='Enter duration in minutes...'
							labelText='Duration'
						/>
						<div className='fs-3'>Duration: 00:00 hours</div>
					</div>
				</div>
				<div className='col-lg-6'>
					<div className='section authors mt-4'>
						<div className='fs-4 text-center'>Authors</div>
					</div>
					<div className='section course-authors mt-4'>
						<div className='fs-4 text-center'>Course authors</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateCourse;
