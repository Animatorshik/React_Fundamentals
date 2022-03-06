import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getUser } from '../../store/selectors';
import { ROUTES } from '../routes';

function PrivateRoute(props) {
	const userToken = localStorage.getItem('user');
	const user = useSelector(getUser);

	/**
	 * Check if User have a role to go by a route
	 *
	 * @returns {boolean}
	 */
	const isSuitableRole = !props.roles || props.roles.includes(user.role);

	if (userToken && isSuitableRole) {
		if (props.path) {
			return <Navigate to={props.path} />;
		} else {
			return props.children;
		}
	} else if (userToken) {
		return <Navigate to={ROUTES.COURSES} />;
	} else {
		return <Navigate to={ROUTES.LOGIN} />;
	}
}

PrivateRoute.propTypes = {
	roles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;
