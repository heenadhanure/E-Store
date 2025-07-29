import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/productCard.css'; // Assuming you have a CSS file for styling

const ProductCard = ({ id, name, image, price }) => {
  return (
    <div className="product-card">
      <img
        src={image?image.startsWith("http") ? image : `http://localhost:4041${image}` : 'https://via.placeholder.com/150'}
        alt={name}
      />
      <h3>{name}</h3>
      <p>₹{price}</p>
      <Link to={`/product/${id}`} className="btn-view">View</Link>
    </div>
  );
};

export default ProductCard;
