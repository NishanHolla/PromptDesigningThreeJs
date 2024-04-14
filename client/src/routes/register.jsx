import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {Link} from 'react-router-dom';
import main from '../images/mainlogo.png';

function Register() {
  const [email, setEmail] = React.useState(""); // State for email input
  const [username, setUsername] = React.useState(""); // State for username input
  const [password, setPassword] = React.useState(""); // State for password input
  const [message, setMessage] = React.useState("");
  const role = 'user';

  const handleFormSubmit = async (event) => {
    event.preventDefault(); 
  
    const data = { email, username, password, role };
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Registration failed. Please try again later.');
      }
  
      console.log('Registration successful!');
      
      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(error.message);
      console.error('Error:', error);
    }
  };
  
  
  return (
    <Container fluid style={{ backgroundColor: "pink" }}>
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={4}>
          <div className="card p-4">
            <div className="text-center mb-4">
              <img src={main} alt="Logo" width="150" />
            </div>
            <h3 style={{color:"red"}}>{message}</h3>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </Form.Group>
              <Button variant="secondary" type="submit" className="w-100">
                Register
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
