import React from "react";

const Product = (props) => {
  const { id, productId, image, name, description, price } = props;

  const handleAddToCart = () => {
    // toast(`${name} added to cart`);
  };

  const handleViewDetails = () => {
    console.log(`Viewed ${name} details`);
  };

  return (
    <div className="product">
      {/* <ToastContainer/> */}
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