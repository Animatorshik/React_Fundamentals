import PropTypes from 'prop-types';

/**
 * Errors React component
 */
function Errors(props) {
	return (
		<div className='errors mt-3'>
			{props.errors.map((error, key) => {
				return (
					<div key={key} className='alert alert-danger'>
						{error}
					</div>
				);
			})}
		</div>
	);
}

Errors.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.string),
};

export default Errors;
