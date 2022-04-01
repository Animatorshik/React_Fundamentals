import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Errors from '../Errors/Errors';

import { validation } from '../../helpers/validation';
import { postLoginApi } from '../../servisces';
import { userLogin, userRole } from '../../store/user/actionCreators';
import { ROUTES } from '../../routes/routes';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	/**
	 * Login User
	 */
	let loginUser = async () => {
		let registrationValidation = validation(
			email.length && password.length,
			'Please, fill in all fields to login'
		);
		if (!registrationValidation) return;

		let userData = {
			email: email,
			password: password,
		};

		// It's because I can't recieve the name from API
		let name = email;

		postLoginApi(userData).then(
			(response) => {
				if (response.data.successful) {
					localStorage.setItem('token', response.data.result);
					dispatch(
						userLogin({
							isAuth: true,
							name: name,
							email: email,
							token: response.data.result,
							role: '',
						})
					);
					dispatch(userRole());
					navigate(ROUTES.COURSES);
				}
			},
			() => setErrors(['Incorrect Email or Password.'])
		);
	};

	// Disable page reloading after form submit
	let handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<div className='sign-up-form registration'>
			<h1>Login</h1>
			<Errors errors={errors} />
			<form onSubmit={handleSubmit}>
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
						buttonClass='btn btn-outline-success'
						onClick={loginUser}
						buttonText='Login'
					/>
				</div>
				<p className='small'>
					If you don't have an account, you can{' '}
					<Link to={ROUTES.REGISTRATION}>Register</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;
