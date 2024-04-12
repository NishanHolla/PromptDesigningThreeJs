// Product.tsx
import React from "react";

interface ProdType {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
}

const Product: React.FC<{ key: React.Key } & ProdType> = (props) => {
  // Get the product data from props
  const { image, name, description, price } = props;

  // Define a function to handle adding the product to the cart
  const handleAddToCart = () => {
    // You can use any state management or API to handle the cart logic
    // For simplicity, we will just log the product name to the console
    console.log(`Added ${name} to the cart`);
  };

  // Define a function to handle viewing the product details
  const handleViewDetails = () => {
    // You can use any routing or modal to display the product details
    // For simplicity, we will just log the product name to the console
    console.log(`Viewed ${name} details`);
  };

  // Return the JSX for the product component
  return (
    <div className="product">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">{price}</p>
      <button className="product-addtocart" onClick={handleAddToCart}>
        Add to cart
      </button>
      <button className="product-buynow" onClick={handleViewDetails}>
        Buy Now!!
      </button>
    </div>
  );
};

export default Product;
