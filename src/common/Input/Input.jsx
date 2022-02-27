import PropTypes from 'prop-types';

/**
 * Input React component
 */
function Input(props) {
	return (
		<>
			<label htmlFor={props.id}>{props.labelText}</label>
			<input
				type={props.type}
				id={props.id}
				placeholder={props.placeholdetText}
				value={props.value}
				onChange={(e) => props.onChange(e.target.value)}
				className='form-control'
			></input>
		</>
	);
}

Input.propTypes = {
	id: PropTypes.string,
	type: PropTypes.string,
	labelText: PropTypes.string,
	placeholdetText: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default Input;
