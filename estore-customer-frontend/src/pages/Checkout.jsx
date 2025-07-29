import React, { useState, useEffect, useContext } from 'react';
import '../styles/checkout.css';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'Cash on Delivery', // default payment method
  });

  // 🟢 Fetch cart items from backend
  useEffect(() => {
    if (user && user.id) {
      axios
        .get(`${API_BASE_URL}/api/cart/${user.id}`)
        .then((res) => setCartItems(res.data))
        .catch((err) => {
          console.error('Failed to fetch cart:', err);
          setCartItems([]);
        });
    }
  }, [user]);

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const orderPayload = {
      userId: user.id,
      customerName: formData.name,
      deliveryAddress: formData.address,  
      customerPhone: formData.phone,
      items: JSON.stringify(cartItems), // send entire cart as JSON string
      totalAmount: getTotalPrice(),
      paymentStatus: "Pending",
      orderStatus: "PLACED",
      paymentMethod: formData.paymentMethod,
      orderDate: new Date().toISOString()
    };
    console.log('Order payload:', orderPayload);

    try {
      await axios.post(`${API_BASE_URL}/api/orders`, orderPayload);
      toast.success('Order placed successfully!');
      setOrderPlaced(true);
      setCartItems([]);
    } catch (error) {
      console.error('Order failed:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>

      {orderPlaced ? (
        <div className="order-success">
          <p className="success-msg">🎉 Your order has been placed successfully!</p>
          <p>
            Thank you, <strong>{formData.name}</strong>. We’ll deliver to{' '}
            <em>{formData.address}</em>.
          </p>
        </div>
      ) : (
        <div className="checkout-container">
          {/* Left Section: Delivery + Payment */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="section">
              <h3>Delivery Address</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"A
                value={formData.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="Full Address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="section">
              <h3>Payment Method</h3>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                <option value="COD">Cash on Delivery</option>
                <option value="UPI">UPI</option>
                <option value="Card">Credit/Debit Card</option>
                <option value="NetBanking">Net Banking</option>
              </select>
            </div>

            <button
              type="submit"
              className="place-order-btn"
              disabled={
                !formData.name || !formData.address || !formData.phone || cartItems.length === 0
              }
            >
              Place Order
            </button>
          </form>

          {/* Right Section: Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-box">
              {cartItems.length === 0 ? (
                <p>No items in cart</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.productId}>
                      <p>
                        {item.productName || item.productId} × {item.quantity} = ₹
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <hr />
                  <h4>Total: ₹{getTotalPrice().toFixed(2)}</h4>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
