import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './components/navbar';
import { useSnapshot } from 'valtio';
import store from './store/index';
import product1 from './images/product1.png';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate(); // Use useNavigate hook
  const snap = useSnapshot(store);
  const products = snap.cart;

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressError, setAddressError] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false); // State for showing "Address saved" message

  const handleProductSelection = (productId) => {
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleSaveAddress = () => {
    // Check if any address field is empty
    if (!street || !city || !state || !postalCode) {
      setAddressError(true);
      return; // Don't save the address
    }
  
    console.log('Address Saved:', street, city, state, postalCode);
    // Save address to store
    store.address = { street, city, state, postalCode };
    setAddressSaved(true); // Set addressSaved to true to display the message
    // Reset address fields
    setStreet('');
    setCity('');
    setState('');
    setPostalCode('');
    // Hide the "Address saved" message after 3 seconds
    setTimeout(() => {
      setAddressSaved(false);
    }, 3000);
  };
  

  const handleCheckout = async () => {
    if (!street || !city || !state || !postalCode) {
      setAddressError(true);
      return;
    }

    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Selected products:', selectedProducts);
        console.log('Address:', address, street, city, state, postalCode);
        navigate('/orderConfirmed')
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
      <div className="checkout-container">
        <div className="address-column">
          <h2>Address</h2>
          <div className="address-input">
            <input
              type="text"
              value={street}
              onChange={handleStreetChange}
              placeholder="Street"
              className="address-field"
            />
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="City"
              className="address-field"
            />
            <input
              type="text"
              value={state}
              onChange={handleStateChange}
              placeholder="State"
              className="address-field"
            />
            <input
              type="text"
              value={postalCode}
              onChange={handlePostalCodeChange}
              placeholder="Postal Code"
              className="address-field"
            />
            <button className="save-address-button" onClick={handleSaveAddress}>Save Address</button>
          </div>
          {addressError && <p className="error-message">Please fill in all address fields.</p>}
          {addressSaved && <p style={{ color: 'green' }}>Address saved</p>} {/* Display "Address saved" message */}
        </div>
        <div className="product-column">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: "20px" }}>Products</h1>
          {products.length === 0 ? (
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontStyle: 'italic' }}>You haven't added any items. <Link to="/">Continue shopping</Link></h1>
          ) : (
            <div className="product-list">
              {products.map(product => (
                <div key={product.id} className="product-item" onClick={() => handleProductSelection(product.id)}>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => { }}
                  />
                  <img src={product.image} alt={product.name} />
                  <label>{product.name} - {product.price}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {products.length > 0 && <button className="checkout-button" onClick={handleCheckout}>Checkout</button>}
    </>
  );
};

export default CheckoutPage;
