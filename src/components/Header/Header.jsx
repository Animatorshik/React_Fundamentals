import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { getUser } from '../../store/selectors';
import { userLogout } from '../../store/user/actionCreators';

/**
 * Header React component
 */
function Header() {
	const pathname = useLocation().pathname;
	const navigate = useNavigate();
	const user = useSelector(getUser);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(userLogout());
		navigate('/login');
	};

	return (
		<header>
			<Logo />
			{pathname !== '/login' && pathname !== '/registration' && (
				<div className='user'>
					<div className='d-inline user-name me-3'>{user.name}</div>
					<Button
						buttonClass='btn btn-outline-danger'
						buttonText='Logout'
						onClick={logout}
					/>
				</div>
			)}
		</header>
	);
}

export default Header;
