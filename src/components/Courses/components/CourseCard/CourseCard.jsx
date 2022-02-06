import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '../../../../common/Button/Button';

import { pipeDuration } from '../../../../helpers/pipeDuration';
import { dateGenerator } from '../../../../helpers/dateGeneratop';

/**
 * Crop the string and add '...' in the end
 *
 * @param {string} stockString
 * @returns {string}
 */
let getCroppedString = (stockString) => {
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

	let openCourse = () => {
		navigate(`/courses/${props.id}`);
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
						onClick={openCourse}
					/>
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
