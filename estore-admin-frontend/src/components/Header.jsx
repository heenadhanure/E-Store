import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4">
      <div className="container-fluid justify-content-between">
        <span className="navbar-brand">Admin Dashboard</span>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Header;
