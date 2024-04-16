import React, { useState, useEffect } from 'react';
import Navbar from '../navbar';
import banner from '/src/assets/banner.gif';
import Product from './product';

async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    throw error; 
  }
}

function MainPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        // Handle errors appropriately, such as displaying an error message to the user
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []); // Run this effect only once on component mount

  return (
    <div className="product-container">
      <header>
        <Navbar />
      </header>
      <h1 className="title">Welcome to the only 3D shopping site</h1>
      <img src={banner} className="product-banner" alt="banner" />
      <div className="products-list">
        {products.map(product => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
