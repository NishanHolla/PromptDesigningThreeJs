import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Navbar from './components/navbar';

function OrderDetailsPage() {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  const fetchOrderDetails = () => {
    if (!orderId) {
      alert('Please enter an Order ID.');
      return;
    }

    fetch(`http://localhost:3002/api/orders/order/${orderId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(order => {
        setOrderDetails(order);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        alert('There was a problem fetching order details. Please try again later.');
      });
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <h1 className="mb-4">Fetch Order Details</h1>
        <Row className="mb-3">
          <Col sm={8}>
            <Form.Control
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </Col>
          <Col sm={4}>
            <Button variant="primary" className="w-100" onClick={fetchOrderDetails}>Fetch Details</Button>
          </Col>
        </Row>

        {orderDetails && (
          <div className="mt-4">
            <h2 className="mb-3">Order Details</h2>
            <p className="mb-2"><strong>Order ID:</strong> {orderDetails.orderId}</p>
            <p className="mb-2"><strong>User ID:</strong> {orderDetails.userId}</p>
            <p className="mb-2"><strong>Products:</strong> {orderDetails.products.join(', ')}</p>
            <p className="mb-2"><strong>Total Amount:</strong> {orderDetails.totalAmount}</p>
          </div>
        )}
      </Container>
    </>
  );
}

export default OrderDetailsPage;
