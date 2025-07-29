import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/dashboard.css';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/stats`);
      setStats(res.data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <div className="p-4 dashboard-content">
          <h3 className="mb-4">Welcome, Admin 👋</h3>

          {/* Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-4">
              <div className="card-with-border border-start-primary shadow-sm p-3">
                <h6 className="text-muted mb-1">Total Products</h6>
                <h2 className="fw-bold">{stats.totalProducts}</h2>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card-with-border border-start-success shadow-sm p-3">
                <h6 className="text-muted mb-1">Total Orders</h6>
                <h2 className="fw-bold">{stats.totalOrders}</h2>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card-with-border border-start-info shadow-sm p-3">
                <h6 className="text-muted mb-1">Total Users</h6>
                <h2 className="fw-bold">{stats.totalUsers}</h2>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card-with-border border-start-warning shadow-sm p-3">
                <h6 className="text-muted mb-1">Revenue</h6>
                <h2 className="fw-bold">₹{stats.revenue}</h2>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Recent Orders</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#1001</td>
                    <td>Heena Dhanure</td>
                    <td>₹1,500</td>
                    <td><span className="badge bg-success">Delivered</span></td>
                  </tr>
                  <tr>
                    <td>#1002</td>
                    <td>John Doe</td>
                    <td>₹2,700</td>
                    <td><span className="badge bg-warning text-dark">Pending</span></td>
                  </tr>
                  <tr>
                    <td>#1003</td>
                    <td>Jane Smith</td>
                    <td>₹1,200</td>
                    <td><span className="badge bg-danger">Cancelled</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* You can keep charts / recent orders below */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




