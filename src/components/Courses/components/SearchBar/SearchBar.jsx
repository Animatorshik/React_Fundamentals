import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

/**
 * SearchBar React component
 */
function SearchBar(props) {
	return (
		<div className='search-wrapper'>
			<div className='row'>
				<div className='col-8'>
					<Input
						type='text'
						id='search'
						name='search'
						placeholdetText='Enter course name...'
						onChange={props.actionInput}
					/>
				</div>
				<div className='col-4 col-lg-auto'>
					<Button
						buttonClass='btn btn-outline-primary w-100'
						buttonText='Search'
						onClick={props.actionButton}
					/>
				</div>
			</div>
		</div>
	);
}

export default SearchBar;
