import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

function Header() {
	return (
		<header>
			<Logo />
			<div className='user'>
				<div className='d-inline user-name me-3'>Vlad</div>
				<Button buttonClass='btn btn-outline-danger' buttonText='Logout' />
			</div>
		</header>
	);
}

export default Header;
