import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useSnapshot } from 'valtio';
import store from './store/index';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import product1 from './images/product1.png'; // Assuming you have an image

const CheckoutPage = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(store);
  const products = snap.cart;

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch saved addresses
    const fetchSavedAddresses = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/api/addresses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const addresses = await response.json();
          setSavedAddresses(addresses);
        } else {
          console.error('Failed to fetch addresses');
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchSavedAddresses();
  }, []);

  const handleProductSelection = (productId) => {
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSaveAddress = async () => {
    if (!street || !city || !state || !postalCode) {
      setErrorMessage('Please fill in all address fields.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ street, city, state, postalCode }),
      });
      if (response.ok) {
        setErrorMessage('Address saved successfully');
        const newAddress = await response.json();
        setSavedAddresses([...savedAddresses, newAddress]);
      } else {
        setErrorMessage('Failed to save address');
      }
    } catch (error) {
      console.error('Error saving address:', error);
      setErrorMessage('Error saving address');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setSavedAddresses(savedAddresses.filter(address => address.id !== addressId));
      } else {
        console.error('Failed to delete address');
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleEditAddress = (address) => {
    setStreet(address.street);
    setCity(address.city);
    setState(address.state);
    setPostalCode(address.postalCode);
  };

  const handleCheckout = async () => {
    if (!street || !city || !state || !postalCode) {
      setErrorMessage('Please fill in all address fields.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const { userId, username, email } = userData;
        store.userId = userId;
        store.username = username;
        store.email = email;

        console.log('Selected products:', selectedProducts);
        console.log('Address:', street, city, state, postalCode);
        navigate('/orderConfirm');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error validating token:', error);
      navigate('/login');
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Saved Addresses
            </Typography>
            <List>
              {savedAddresses.map((address) => (
                <ListItem key={address.id}>
                  <ListItemText
                    primary={`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditAddress(address)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAddress(address.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Add New Address
                </Typography>
                <TextField
                  label="Street"
                  fullWidth
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="City"
                  fullWidth
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="State"
                  fullWidth
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Postal Code"
                  fullWidth
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  margin="normal"
                />
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" onClick={handleSaveAddress}>
                  Save Address
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Products
            </Typography>
            {products.length === 0 ? (
              <Typography variant="body1" gutterBottom>
                You haven't added any items. <Link to="/">Continue shopping</Link>
              </Typography>
            ) : (
              <Box>
                {products.map((product) => (
                  <Card key={product.productId} sx={{ mb: 2 }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={product.image} alt={product.name} width="50" height="50" style={{ marginRight: '16px' }} />
                      <Box>
                        <Typography variant="body1">{product.name}</Typography>
                        <Typography variant="body2">Price: {product.price}</Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => handleProductSelection(product.productId)}>
                        {selectedProducts.includes(product.productId) ? 'Remove' : 'Select'}
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
        {products.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
};

export default CheckoutPage;
