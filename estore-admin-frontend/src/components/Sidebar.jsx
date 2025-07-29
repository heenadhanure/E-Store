import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '250px' }}>
      <h4 className="text-center mb-4">eStore Admin</h4>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/products" className="nav-link text-white">Products</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/orders" className="nav-link text-white">Orders</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/RepairRequests" className="nav-link text-white">Repair Requests</Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/users" className="nav-link text-white">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
