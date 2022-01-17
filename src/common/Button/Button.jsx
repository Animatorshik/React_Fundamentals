function Button(props) {
	return (
		<button className={props.buttonClass} onClick={props.onClick}>
			<>{props.buttonText}</>
		</button>
	);
}

export default Button;
