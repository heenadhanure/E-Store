import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/adminLayout.css'; // Import layout fix CSS

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/orders/${orderId}/status`, null, {
        params: { status: newStatus }
      });
      fetchOrders();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="admin-layout d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        <Header />
        <div className="content-area p-4">
          <h3 className="mb-3">Manage Orders</h3>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Sr.No.</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Delivery Address</th>
                <th>Total (₹)</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => {
                  let productNames = [];
                  try {
                    const parsedItems = JSON.parse(order.items);
                    productNames = parsedItems.map(item => item.productName).join(', ');
                  } catch (e) {
                    productNames = "Invalid Data";
                  }

                  return (
                    <tr key={order.id}>
                      <td>{index + 1}</td>
                      <td>{order.customerName || 'Unknown'}</td>
                      <td>{productNames}</td>
                      <td>{order.deliveryAddress}</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.paymentStatus}</td>
                      <td>{order.orderStatus}</td>
                      <td>
                        <select
                          className="form-select"
                          defaultValue={order.orderStatus}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        >
                          <option value="PLACED">Placed</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
