import React from 'react';
import Navbar from './components/navbar';
import { useSnapshot } from 'valtio';
import store from './store/index';

const OrderConfirmedPage = () => {
  const snap = useSnapshot(store);
  const { totalAmount, orderId, cart } = snap.orderConfirmation;

  return (
    <>
      <Navbar />
      <div className="order-confirmed-container">
        <h1>Order Confirmed</h1>
        <p>Order ID: {orderId}</p>
        <p>Total Amount: ${totalAmount}</p>
        <h2>Items:</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default OrderConfirmedPage;
