import React, { useState } from 'react';
import Navbar from './components/navbar';
import product1 from './images/product1.png';
import {proxy,snapshot} from 'valtio';


const CheckoutPage = () => {
  const products = [
    { id: 1, name: 'product1', price: 10, image: 'product1' },
    { id: 2, name: 'product2', price: 20, image: 'product2' },
    { id: 3, name: 'product3', price: 30, image: 'product3' }
  ];

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
          <h2>Products</h2>
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-item" onClick={() => handleProductSelection(product.id)}>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => {}} // We handle selection on parent div click, not checkbox change
                />
                <img src={product1} alt={product.name} />
                <label>{product.name} - ${product.price}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
    </>
  );
};

export default CheckoutPage;
