import React from "react";
import store from "/src/store/index"; // Import the Valtio store
import { useSnapshot } from "valtio";
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

  const { id, image, name, description, price } = props;
  const snap = useSnapshot(store);

  const handleAddToCart = () => {
    store.cart.push({ id, image, name, description, price });
    console.log(snap.cart);
    toast.success(`${name} added to cart`); 
  };

  const handleViewDetails = () => {

    console.log(`Viewed ${name} details`);
  };

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
