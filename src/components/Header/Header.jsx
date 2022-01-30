import { useLocation, useNavigate } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

/**
 * Header React component
 */
function Header(props) {
	const pathname = useLocation().pathname;
	const navigate = useNavigate();

	let logout = () => {
		localStorage.removeItem('user');
		navigate('/login');
	};

	return (
		<header>
			<Logo />
			{pathname !== '/login' && pathname !== '/registration' && (
				<div className='user'>
					<div className='d-inline user-name me-3'>Vlad</div>
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
