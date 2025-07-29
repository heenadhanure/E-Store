import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/adminLayout.css'; // Shared layout styles

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="admin-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
