import React, { useEffect, useState, useContext } from 'react';
import '../styles/cart.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';


const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get(`${API_BASE_URL}/api/cart/${user.id}`)
        .then((res) => {
          setCart(res.data);
          setLoading(false);
        })
        .catch(() => {
          setCart([]);
          setLoading(false);
        });
    }
  }, [user]);

  const handleRemove = (itemId) => {
    axios.delete(`${API_BASE_URL}/api/cart/${itemId}`)
      .then(() => {
        setCart(cart.filter(item => item.id !== itemId));
      })
      .catch(err => console.error('Error deleting item:', err));
  };

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  if (!user) {
    return <p>Please log in to view your cart.</p>;
  }

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.imageUrl || '/default-product.jpg'} alt={item.productName} />
              <div className="cart-details">
                <h4>{item.productName || `Product ${item.productId}`}</h4>
                <p>Price: ₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ₹{item.quantity * item.price}</p>
                <button className="btn-remove" onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Amount: ₹{total}</p>
          <Link to="/checkout" className="btn-checkout">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
