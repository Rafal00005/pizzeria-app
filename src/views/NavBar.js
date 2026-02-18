import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<Navbar bg='primary' className='mb-3 rounded'>
			<Container>
				<Navbar.Brand href='/' className='text-white fw-bold'>
					Waiter app
				</Navbar.Brand>
				<Nav className='ms-auto'>
					<Nav.Link as={NavLink} to='/' className='text-white'>
						Home
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBar;
