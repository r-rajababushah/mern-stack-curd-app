import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const Headers = () => {

	const navigate = useNavigate();

	return (
		<>
			<Navbar bg="dark" data-bs-theme="dark">
				<Container>
					<Navbar.Brand><Nav.Link onClick={() => navigate("/")}>My Site</Nav.Link></Navbar.Brand>
				</Container>
			</Navbar>
		</>
	)
}

export default Headers