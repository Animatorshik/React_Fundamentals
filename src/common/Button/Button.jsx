/**
 * Button React component
 */
function Button(props) {
	return (
		<button type='button' className={props.buttonClass} onClick={props.onClick}>
			<>{props.buttonText}</>
		</button>
	);
}

export default Button;
