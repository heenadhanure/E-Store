import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { MdShoppingCart } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import '../styles/header.css';
import { AuthContext } from '../context/AuthContext';

const Header = ({ openLoginModal }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const isDark = true;
    document.body.classList.toggle('dark-mode', isDark);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${search}`);
    setSearch('');
    setShowMenu(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">eStore</Link>
      </div>

      <form className="header-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" aria-label="Search">
          <FaSearch />
        </button>
      </form>

      <nav className={`nav-links${showMenu ? ' show' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/repair-service">Repair Service</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart" className="icon-link">
          <MdShoppingCart style={{ fontSize: '1.4rem', verticalAlign: 'middle' }} />
        </Link>

        <div className="profile-dropdown" ref={dropdownRef}>
          <button
            className="icon-link"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Profile"
          >
            <CgProfile style={{ fontSize: '1.4rem', verticalAlign: 'middle' }} />
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              {!user ? (
                <button
                  onClick={() => {
                    openLoginModal();
                    setShowDropdown(false);
                  }}
                  className="dropdown-item"
                >
                  Login
                </button>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="dropdown-item"
                    onClick={() => setShowDropdown(false)}
                  >
                    Settings
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
