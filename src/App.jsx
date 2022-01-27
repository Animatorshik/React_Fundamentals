import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';

function App() {
	return (
		<main>
			<div className='container'>
				<Header />
				<Routes>
					<Route path='/registration' element={<Registration />} />
					<Route path='/courses' element={<Courses />} />
				</Routes>
			</div>
		</main>
	);
}

export default App;
