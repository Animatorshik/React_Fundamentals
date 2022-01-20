/**
 * Input React component
 */
function Input(props) {
	return (
		<>
			<label htmlFor={props.id}>{props.labelText}</label>
			<input
				type='text'
				className='form-control'
				id={props.id}
				placeholder={props.placeholdetText}
				onChange={props.onChange}
			></input>
		</>
	);
}

export default Input;
