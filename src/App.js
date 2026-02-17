// Main App component with routing
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { fetchTables } from './redux/tablesRedux';
import Home from './pages/Home';
import TableDetails from './pages/TableDetails';
import NotFound from './pages/NotFound';
import Header from './views/Header';
import Footer from './views/Footer';

const App = () => {
	const dispatch = useDispatch();

	// Fetch tables when app starts
	useEffect(() => {
		dispatch(fetchTables());
	}, [dispatch]);

	return (
		<BrowserRouter>
			<Container>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/table/:id' element={<TableDetails />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				<Footer />
			</Container>
		</BrowserRouter>
	);
};

export default App;
