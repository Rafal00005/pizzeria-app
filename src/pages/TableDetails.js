// Table details page - shows specific table information and allows editing
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { selectTableById, updateTable } from '../redux/tablesRedux';

const TableDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const table = useSelector(selectTableById(id));

	const [formData, setFormData] = useState({
		id: '',
		status: 'Free',
		peopleAmount: 0,
		maxPeopleAmount: 0,
		bill: 0,
	});

	// Load table data into form when component mounts
	useEffect(() => {
		if (table) {
			setFormData(table);
		}
	}, [table]);

	// Handle input change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === 'status' ? value : parseInt(value),
		}));
	};

	// Handle form submit
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateTable(formData));
		navigate('/');
	};

	if (!table) {
		return <p>Table not found</p>;
	}

	return (
		<Container className='py-4'>
			<Row>
				<Col md={6}>
					<h1 className='mb-4'>Table {id} details</h1>

					<Form onSubmit={handleSubmit}>
						{/* Status field */}
						<Form.Group className='mb-3'>
							<Form.Label>Status</Form.Label>
							<Form.Select
								name='status'
								value={formData.status}
								onChange={handleChange}
							>
								<option>Free</option>
								<option>Reserved</option>
								<option>Busy</option>
								<option>Cleaning</option>
							</Form.Select>
						</Form.Group>

						{/* Max people amount */}
						<Form.Group className='mb-3'>
							<Form.Label>Max people amount</Form.Label>
							<Form.Control
								type='number'
								name='maxPeopleAmount'
								value={formData.maxPeopleAmount}
								onChange={handleChange}
								min='0'
								max='10'
							/>
						</Form.Group>

						{/* People amount */}
						<Form.Group className='mb-3'>
							<Form.Label>People amount</Form.Label>
							<Form.Control
								type='number'
								name='peopleAmount'
								value={formData.peopleAmount}
								onChange={handleChange}
								min='0'
								max='10'
							/>
						</Form.Group>

						{/* Bill - only show if status is Busy */}
						{formData.status === 'Busy' && (
							<Form.Group className='mb-3'>
								<Form.Label>Bill</Form.Label>
								<Form.Control
									type='number'
									name='bill'
									value={formData.bill}
									onChange={handleChange}
									min='0'
								/>
							</Form.Group>
						)}

						{/* Submit button */}
						<Button variant='primary' type='submit' className='w-100'>
							Update
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default TableDetails;
