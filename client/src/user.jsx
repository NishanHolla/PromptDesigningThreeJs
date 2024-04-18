import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Form, Button } from 'react-bootstrap';
import store from './store/index'; 
import Navbar from './components/navbar';
import { useNavigate } from 'react-router-dom';

function User() {
  const snap = useSnapshot(store);
  const [username, setUsername] = useState(snap.username);
  const [email, setEmail] = useState(snap.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState(snap.address);
  const [message, setMessage] = useState('');
  const [validToken, setValidToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function validateToken() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Token not found');
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
        } else {
          setValidToken(false);
          console.log('Invalid token');
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    }

    validateToken();
  }, []); // Run only once when the component mounts

  const handleUpdateUsername = () => {
    // Your logic to update the username
    store.username = username;
    setMessage('Username updated successfully!');
  };

  const handleUpdateEmail = () => {
    // Your logic to update the email
    store.email = email;
    setMessage('Email updated successfully!');
  };

  const handleUpdatePassword = () => {
    // Your logic to update the password
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
    } else {
      // Your logic to update the password
      setMessage('Password updated successfully!');
    }
  };

  const handleEditAddress = () => {
    // Your logic to edit the address
    console.log('Editing address');
    // You can open a modal or navigate to a different page for editing the address
  };

  if (!validToken) {
    navigate('/login');
    return <div>Invalid token. Please login again.</div>;
  } 

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div style={{ maxWidth: '500px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome, {snap.username}!</h1>
        <h2 style={{ fontSize: '1.5rem' }}>User Details</h2>
      </div>
    </div>
  );
}

export default User;
