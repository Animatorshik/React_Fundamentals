import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { pipeDuration } from '../../helpers/pipeDuration';
import { dateGenerator } from '../../helpers/dateGeneratop';

/**
 * Course Info React component
 */
function CourseInfo(props) {
	const params = useParams();
	const navigate = useNavigate();
	const courseId = params.courseId;

	const course = props.courses.find((item) => item.id === courseId);

	// If course is not exist, redirect to the Courses List
	useEffect(() => {
		if (!course) {
			navigate('/courses');
		}
	}, [course, navigate]);

	/**
	 * Get Author Name
	 *
	 * @param {string} authorId
	 * @returns {string}
	 */
	let getAuthorName = (authorId) => {
		let author = props.authors.find((item) => item.id === authorId);
		return author.name;
	};

	return (
		<>
			{!!course && (
				<div className='course-wrapper'>
					<div className='back-link mt-3'>
						<Link to='/courses'>Back to courses</Link>
					</div>
					<h1 className='my-5 text-center'>{course.title}</h1>
					<div className='row'>
						<div className='col-lg-7'>{course.description}</div>
						<div className='col-lg-4 offset-lg-1'>
							<div className='mb-1'>
								<strong>ID: </strong>
								{course.id}
							</div>
							<div className='mb-1'>
								<strong>Duration: </strong>
								{pipeDuration(course.duration)}
							</div>
							<div className='mb-1'>
								<strong>Created: </strong>
								{dateGenerator(course.creationDate)}
							</div>
							<div className='mb-1'>
								<strong>Authors: </strong>
								<ul>
									{course.authors.map((author, key) => {
										return <li key={key}>{getAuthorName(author)}</li>;
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		courses: state.courses,
		authors: state.authors,
	};
};

CourseInfo.propTypes = {
	courses: PropTypes.arrayOf(PropTypes.object),
	authors: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(CourseInfo);
