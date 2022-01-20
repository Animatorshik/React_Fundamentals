/**
 * Input React component
 */
function Input(props) {
	return (
		<>
			<label htmlFor={props.id}>{props.labelText}</label>
			<input
				type='text'
				id={props.id}
				placeholder={props.placeholdetText}
				onChange={props.onChange}
			></input>
		</>
	);
}

export default Input;
