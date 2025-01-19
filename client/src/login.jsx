import React, { useState } from "react";
import { Container, Grid, TextField, Button, Typography, Card, CardContent, CardActions, Box } from "@mui/material";
import main from './images/mainlogo.png';
import { Link, useNavigate } from 'react-router-dom';

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
    return data;
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error;
  }
};

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', formData.email);
      console.log('Login successful:', data.username);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
      console.error('Error during login:', error.message);
    }
  };

  return (
    <Container component="main" maxWidth={false} style={{ backgroundColor: "pink", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="center" mb={4}>
                <img src={main} alt="Logo" width="150" />
              </Box>
              <Typography variant="h6" gutterBottom color="error" align="center">
                {message}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  autoComplete="email"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="current-password"
                />
                <Box mt={3}>
                  <Button type="submit" fullWidth variant="contained" color="primary">
                    Login
                  </Button>
                </Box>
              </form>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/register" fullWidth variant="outlined" color="secondary">
                New user? Register here
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
