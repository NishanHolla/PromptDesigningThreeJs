import React from "react";
import { Container, Grid, TextField, Button, Typography, Card, CardContent, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import main from './images/mainlogo.png';

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
    <Container component="main" maxWidth={false} style={{ backgroundColor: "pink", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={4}>
          <Card>
            <CardContent>
              <div className="text-center mb-4">
                <img src={main} alt="Logo" width="150" />
              </div>
              <Typography variant="h6" gutterBottom color="error" align="center">
                {message}
              </Typography>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <CardActions>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Register
                  </Button>
                </CardActions>
              </form>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/login" fullWidth variant="outlined" color="secondary">
                Already have an account? Sign in
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
