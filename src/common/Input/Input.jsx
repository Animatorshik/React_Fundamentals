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
				onChange={(e) => props.onChange(e.target.value)}
				className='form-control'
			></input>
		</>
	);
}

export default Input;
