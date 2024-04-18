import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Navbar from './components/navbar';
import { useSnapshot } from 'valtio';
import store from './store/index';

const OrderConfirmed = () => {
  const snap = useSnapshot(store);
  const userId = snap.userId;
  const email = snap.email;
  const address = snap.address;
  const cart = snap.cart;
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null); // State to store order details

  const createOrder = async () => {
    console.log(cart);
    try {
      const response = await fetch('http://localhost:3000/api/orders/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          email: email,
          cartItems: cart, // Send array of product IDs
          totalAmount: cart.reduce((total, product) => total + product.price, 0),
          address: JSON.stringify(address) 
        })
      });

      if (response.ok) {
        const data = await response.json();
        setOrderId(data.orderId);
        console.log(data.orderId);
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="order-confirmed-container">
        <h1>Your Order is Confirmed</h1>
        <div className="order-details">
          <h3>Your order Id is  {orderId}</h3>
          {orderDetails && (
            <>
              <h2>Address:</h2>
              <p>{orderDetails.address.street}, {orderDetails.address.city}, {orderDetails.address.state}, {orderDetails.address.postalCode}</p>
              <h2>Bill:</h2>
              <p>Total: ${orderDetails.totalAmount}</p>
            </>
          )}
        </div>
        <Button variant="primary" onClick={createOrder}>Check My Orders</Button>
      </Container>
    </>
  );
};

export default OrderConfirmed;
