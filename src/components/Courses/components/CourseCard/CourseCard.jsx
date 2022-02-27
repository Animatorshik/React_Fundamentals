import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';

import { pipeDuration } from '../../../../helpers/pipeDuration';
import { dateGenerator } from '../../../../helpers/dateGeneratop';
import { deleteCourse } from '../../../../store/courses/actionCreators';
import { getUser } from '../../../../store/selectors';
import { ADMIN } from '../../../../roles/roles';
import { ROUTES } from '../../../../routes/routes';

/**
 * Crop the string and add '...' in the end
 *
 * @param {string} stockString
 * @returns {string}
 */
const getCroppedString = (stockString) => {
	const maxLength = 27;

	if (stockString.length > maxLength) {
		return stockString.slice(0, maxLength) + '...';
	}
	return stockString;
};

/**
 * CardInformationItem React component
 */
function CardInformationItem(props) {
	return (
		<div className={`course-${props.name}`}>
			<strong className='text-capitalize'>{props.name}: </strong>
			<span className={`${props.name}-value`}>{props.value}</span>
		</div>
	);
}

/**
 * CourseCard React component
 */
function CourseCard(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(getUser);

	const callOpenCourse = () => {
		navigate(ROUTES.COURSE(props.id));
	};

	const callEditCourse = () => {
		navigate(ROUTES.COURSE_UPDATE(props.id));
	};

	const callDeleteCourse = () => {
		// Delete the course
		dispatch(deleteCourse(props.id));
	};

	return (
		<div className='course-card' id={props.id}>
			<div className='left-side'>
				<h2 className='course-title'>{props.title}</h2>
				<div className='course-description'>{props.description}</div>
			</div>
			<div className='right-side'>
				<CardInformationItem
					name='authors'
					value={getCroppedString(props.authors)}
				/>
				<CardInformationItem
					name='duration'
					value={pipeDuration(props.duration)}
				/>
				<CardInformationItem
					name='created'
					value={dateGenerator(props.created)}
				/>
				<div className='show-course'>
					<Button
						buttonClass='btn btn-outline-primary'
						buttonText='Show course'
						onClick={callOpenCourse}
					/>
					{user.role === ADMIN && (
						<Button
							buttonClass='btn btn-outline-warning ms-2'
							buttonText={<i className='bi bi-pencil-fill'></i>}
							onClick={callEditCourse}
						/>
					)}
					{user.role === ADMIN && (
						<Button
							buttonClass='btn btn-outline-danger ms-2'
							buttonText={<i className='bi bi-trash-fill'></i>}
							onClick={callDeleteCourse}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

CardInformationItem.propTypes = {
	name: PropTypes.string,
	value: PropTypes.string,
};

CourseCard.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	authors: PropTypes.string,
	duration: PropTypes.number,
	created: PropTypes.string,
};

export default CourseCard;
