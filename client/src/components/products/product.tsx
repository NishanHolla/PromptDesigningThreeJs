import React from "react";
import store from "/src/store/index"; // Import the Valtio store
import { ToastContainer, toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toastify

interface ProdType {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
}

const Product: React.FC<ProdType> = (props) => {
  // Get the product data from props
  const { id, image, name, description, price } = props;

  // Define a function to handle adding the product to the cart
  const handleAddToCart = () => {
    // Add product details to the cart state in the Valtio store
    store.cart.push({ id, image, name, description, price });
    toast.success(`${name} added to cart`); // Show success toast
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
      <ToastContainer/>
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
