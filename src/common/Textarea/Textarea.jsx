/**
 * Textarea React component
 */
function Textarea(props) {
	return (
		<>
			<label htmlFor={props.id}>{props.labelText}</label>
			<textarea
				id={props.id}
				placeholder={props.placeholdetText}
				onChange={(e) => props.onChange(e.target.value)}
				className='form-control'
			></textarea>
		</>
	);
}

export default Textarea;
