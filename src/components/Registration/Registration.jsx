import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Errors from '../Errors/Errors';

import { validation } from '../../helpers/validation';
import { fetchSimple } from '../../helpers/fetchSimple';

function Registration() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	/**
	 * register User
	 */
	let registerUser = () => {
		let registrationValidation = validation(
			name.length && email.length && password.length,
			'Please, fill in all fields to register'
		);
		if (!registrationValidation) return;

		fetchSimple(`${process.env.REACT_APP_API}/register`, 'POST', {
			name: name,
			email: email,
			password: password,
		}).then((data) => {
			if (data.successful) {
				navigate('/login');
			} else {
				setErrors(data.errors);
			}
		});
	};

	// Disable page reloading after form submit
	let handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className='sign-up-form registration'>
			<h1>Registration</h1>
			<Errors errors={errors} />
			<form onSubmit={handleSubmit}>
				<div className='mb-3'>
					<Input
						id='name'
						labelText='Name'
						type='text'
						placeholdetText='Enter name'
						onChange={(value) => setName(value)}
					/>
				</div>
				<div className='mb-3'>
					<Input
						id='email'
						labelText='Email'
						type='email'
						placeholdetText='Enter email'
						onChange={(value) => setEmail(value)}
					/>
				</div>
				<div className='mb-4'>
					<Input
						id='password'
						labelText='Password'
						type='password'
						placeholdetText='Enter password'
						onChange={(value) => setPassword(value)}
					/>
				</div>
				<div className='mb-3'>
					<Button
						type='submit'
						buttonClass='btn btn-outline-primary'
						onClick={registerUser}
						buttonText='Registration'
					/>
				</div>
				<p className='small'>
					If you have an account, you can <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
}

export default Registration;
