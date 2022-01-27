import { Routes, Route } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

function Registration() {
	return (
		<div className='sign-up-form registration'>
			<h1>Registration</h1>
			<form>
				<Input
					id='name'
					labelText='Name'
					type='text'
					placeholdetText='Enter name'
				/>
				<Input
					id='email'
					labelText='Email'
					type='email'
					placeholdetText='Enter email'
				/>
				<Input
					id='password'
					labelText='Password'
					type='password'
					placeholdetText='Enter password'
				/>
			</form>
		</div>
	);
}

export default Registration;
