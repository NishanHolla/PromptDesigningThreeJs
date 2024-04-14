import React, { useState } from 'react';
import Navbar from './components/navbar';
import { useSnapshot } from 'valtio';
import store from './store/index';
import product1 from './images/product1.png';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const snap = useSnapshot(store);
  const products = snap.cart;

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleProductSelection = (productId) => {
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
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
    console.log('Address Saved:', address, street, city, state, postalCode);
  };
  const handleCheckout = () => {
    console.log('Selected products:', selectedProducts);
    console.log('Address:', address, street, city, state, postalCode);
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
              id="address"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter your address"
            />
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
        </div>
        <div className="product-column">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom:"20px" }}>Products</h1>
          {products.length === 0 ? (
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontStyle: 'italic' }}>You haven't added any items. <Link to="/">Continue shopping</Link></h1>
          ) : (
            <div className="product-list">
              {products.map(product => (
                <div key={product.id} className="product-item" onClick={() => handleProductSelection(product.id)}>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => {}} 
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
