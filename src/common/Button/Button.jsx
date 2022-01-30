import PropTypes from 'prop-types';

/**
 * Button React component
 */
function Button(props) {
	return (
		<button
			type={props.type}
			className={props.buttonClass}
			onClick={props.onClick}
		>
			<>{props.buttonText}</>
		</button>
	);
}

Button.propTypes = {
	buttonClass: PropTypes.string,
	buttonText: PropTypes.string,
	onClick: PropTypes.func,
};

export default Button;
