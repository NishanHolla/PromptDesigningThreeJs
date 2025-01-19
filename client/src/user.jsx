import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent, CardActions, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

function User() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function validateToken() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Token not found');
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:3000/api/auth/validate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          setValidToken(true);
          const data = await response.json();
          const userId = data.userId;
          fetchUserDetails(userId);
        } else {
          setValidToken(false);
          console.log('Invalid token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    }

    async function fetchUserDetails(userId) {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUsername(userData.username);
          setEmail(userData.email);
          setAddress(userData.address);
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    validateToken();
  }, [navigate]);

  const handleUpdateUsername = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/update-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username })
      });

      if (response.ok) {
        setMessage('Username updated successfully!');
      } else {
        setMessage('Failed to update username.');
      }
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/update-email', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage('Email updated successfully!');
      } else {
        setMessage('Failed to update email.');
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword })
      });

      if (response.ok) {
        setMessage('Password updated successfully!');
      } else {
        setMessage('Failed to update password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleEditAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/update-address', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ address })
      });

      if (response.ok) {
        setMessage('Address updated successfully!');
      } else {
        setMessage('Failed to update address.');
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              User Details
            </Typography>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </form>
            {message && (
              <Typography variant="body2" color="error" gutterBottom>
                {message}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateUsername}
                >
                  Update Username
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleUpdateEmail}
                >
                  Update Email
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleUpdatePassword}
                >
                  Update Password
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleEditAddress}
                >
                  Update Address
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}

export default User;
