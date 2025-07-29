// src/pages/ProductDetails.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../styles/productDetails.css';
import { API_BASE_URL } from '../config/api';

const ProductDetails = ({openLoginModal}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user = null } = useContext(AuthContext);
  console.log("User from Authcontext : ", user);

  // Placeholder for user context, replace with actual user context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = async (product) => {
    try {
      await axios.post(`${API_BASE_URL}/api/cart`, {
        userId: user.id,
        productId: product.id,
        productName: product.name,
        imageUrl: product.imageUrl.startsWith("http") ? product.imageUrl : `http://localhost:4041${product.imageUrl}`,
        price: product.price,
        quantity: 1,
      });
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      openLoginModal();
      return;
    }
    addToCart(product);
    alert('Item added to cart!');
  };

  const handleBuyNow = () => {
    if (!user) {
        openLoginModal();
      return;
    }
    addToCart(product);
    navigate('/checkout');
  };

  useEffect(() => {
    console.log("Full product url : ",`${API_BASE_URL}/api/products/${id}`)
    axios
      .get(`${API_BASE_URL}/api/products/${id}`)
      .then((response) => {
        console.log("Product data revieived : ", response.data);
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Product not found or server error.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>Product not found.</p>;
  console.log("Login Modal Open:", openLoginModal);
    console.log("Final image URL: ", product.image?.startsWith("http") ? product.image : `http://localhost:4041/product-images/${product.imageUrl}`);

  return (
    <div className="product-details">
      <div className="details-container">
        <img
          src={
              product.imageUrl
                ? product.imageUrl.startsWith("http")
                  ? product.imageUrl
                  : `http://localhost:4041${product.imageUrl}`
                : 'https://via.placeholder.com/150'
            }
          alt={product.name}
        />
        <div className="details-info">
          <h2>{product.name}</h2>
          <p className="price">₹{product.price}</p>
          <p className="desc">{product.description}</p>
          <div className="action-buttons">
            <button className="btn-add" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn-buy" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
