// Home page - displays all tables list
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { selectAllTables } from '../redux/tablesRedux';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';

const Home = () => {
	const tables = useSelector(selectAllTables);

	return (
		<div className='py-4'>
			<h1 className='mb-4'>Tables in pizzeria</h1>

			{tables.length === 0 ? (
				<div className='text-center'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
					<p className='mt-3'>Loading tables...</p>
				</div>
			) : (
				<Row className='g-4'>
					{tables.map((table) => (
						<Col key={table.id} md={4} lg={4}>
							<Card className='h-100'>
								<Card.Body>
									<Card.Title>Table {table.id}</Card.Title>
									<Card.Text>
										Status: <strong>{table.status}</strong>
									</Card.Text>
									<Link to={`/table/${table.id}`}>
										<Button variant='primary'>Show details</Button>
									</Link>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			)}
		</div>
	);
};

Home.propTypes = {
	// Currently no props, but good practice to have
};

export default Home;
