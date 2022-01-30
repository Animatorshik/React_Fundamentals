import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Errors from '../Errors/Errors';

import { validation } from '../../helpers/validation';
import { fetchSimple } from '../../helpers/fetchSimple';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();

	/**
	 * Login User
	 */
	let loginUser = async () => {
		let registrationValidation = validation(
			email.length && password.length,
			'Please, fill in all fields to login'
		);
		if (!registrationValidation) return;

		fetchSimple(`${process.env.REACT_APP_API}/login`, 'POST', {
			email: email,
			password: password,
		}).then((data) => {
			if (data.successful) {
				localStorage.setItem('user', data.result);
				navigate('/courses');
			} else {
				setErrors(['Incorrect Email or Password.']);
			}
		});
	};

	return (
		<div className='sign-up-form registration'>
			<h1>Login</h1>
			<Errors errors={errors} />
			<form>
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
						buttonClass='btn btn-outline-success'
						onClick={loginUser}
						buttonText='Login'
					/>
				</div>
				<p className='small'>
					If you don't have an account, you can{' '}
					<Link to='/registration'>Register</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;