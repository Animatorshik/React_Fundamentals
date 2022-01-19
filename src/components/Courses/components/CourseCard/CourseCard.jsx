import Button from '../../../../common/Button/Button';

/**
 * Get the Date in the correct format.
 *
 * @param {string} stockDate
 * @returns {string} M.d.YYY
 */
let getCorrectDate = (stockDate) => {
	let date = new Date(stockDate);
	return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
};

/**
 * Get the Duration in the correct format.
 *
 * @param {number} stockMinutes
 * @returns {string} hh:mm hours
 */
let getCorrectDuration = (stockMinutes) => {
	let hours = Math.floor(stockMinutes / 60);
	let minutes = stockMinutes % 60;

	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	return `${hours}:${minutes} hours`;
};

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
					value={getCorrectDuration(props.duration)}
				/>
				<CardInformationItem
					name='created'
					value={getCorrectDate(props.created)}
				/>
				<div className='show-course'>
					<Button
						buttonClass='btn btn-outline-primary'
						buttonText='Show course'
					/>
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
