// Home page - displays all tables list
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { selectAllTables } from '../redux/tablesRedux';

const Home = () => {
	const tables = useSelector(selectAllTables);

	return (
		<div className='py-4'>
			<h1 className='mb-4'>Tables in pizzeria</h1>

			{tables.length === 0 ? (
				<p>Loading tables...</p>
			) : (
				<Row className='g-4'>
					{tables.map((table) => (
						<Col key={table.id} md={6} lg={4}>
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

export default Home;
