import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { Form, Button } from 'react-bootstrap';
import store from './store/index'; 
import Navbar from './components/navbar';

function User() {
  const snap = useSnapshot(store);
  const [username, setUsername] = useState(snap.username);
  const [email, setEmail] = useState(snap.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState(snap.address);
  const [message, setMessage] = useState('');

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

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div style={{ maxWidth: '500px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome, {snap.username}!</h1>
        <h2 style={{ fontSize: '1.5rem' }}>User Details</h2>
        <Form.Group controlId="formUsername">
          <Form.Label style={{ marginBottom: '0.5rem' }}>Username</Form.Label>
          <Form.Control 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="primary" onClick={handleUpdateUsername} style={{ marginRight: '0.5rem' }}>Update Username</Button>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label style={{ marginBottom: '0.5rem' }}>Email</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="primary" onClick={handleUpdateEmail} style={{ marginRight: '0.5rem' }}>Update Email</Button>
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label style={{ marginBottom: '0.5rem' }}>Address</Form.Label>
          <Form.Control 
            as="textarea"
            rows={3}
            value={address}
            readOnly
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="primary" onClick={handleEditAddress} style={{ marginRight: '0.5rem' }}>Edit Address</Button>
        </Form.Group>
        <hr />
        <Form.Group controlId="formNewPassword">
          <Form.Label style={{ marginBottom: '0.5rem' }}>New Password</Form.Label>
          <Form.Control 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            style={{ marginBottom: '1rem' }}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label style={{ marginBottom: '0.5rem' }}>Confirm New Password</Form.Label>
          <Form.Control 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="primary" onClick={handleUpdatePassword} style={{ marginRight: '0.5rem' }}>Update Password</Button>
        </Form.Group>
        <div style={{ color: 'green', marginBottom: '1rem' }}>{message}</div>
      </div>
    </div>
  );
}

export default User;
