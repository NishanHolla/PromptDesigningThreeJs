import React, { useState } from 'react';

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCheckoutData({ ...checkoutData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the submission of the checkout data,
    // such as sending it to a backend service or processing the payment.
    console.log('Submitting checkout data:', checkoutData);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className='checkout-form'>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            style={{width: '20px', border: '1px solid'}}
            value={checkoutData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={checkoutData.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={checkoutData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={checkoutData.postalCode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={checkoutData.country}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Credit Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={checkoutData.cardNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={checkoutData.expiryDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            value={checkoutData.cvv}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Checkout;