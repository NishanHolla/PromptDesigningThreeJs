import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import main from '../images/mainlogo.png';
import { Link } from 'react-router-dom';

const login = async (credentials) => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    authState.isLoggedIn = true;
    return data;
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
};

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Error during login:', error.message);
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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mb-3">
                Login
              </Button>
            </Form>
            <Link to="/register" variant="secondary" className="w-100">
                Registered user? Sign in
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
