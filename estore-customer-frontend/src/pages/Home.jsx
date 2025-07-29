import React from 'react';
import '../styles/home.css'; // Optional custom styles
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* 1. Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to eStore</h1>
          <p>Your one-stop shop for electronics and repair services</p>
          <Link to="/products" className="btn-shop">Shop Now</Link>
        </div>
      </section>

      {/* 2. Categories / Services */}
      <section className="category-section">
        <h2>Our Services</h2>
        <div className="category-cards">
          <div className="card">
            <img src="/assets/laptop.png" alt="Laptops" />
            <h3>Laptops</h3>
          </div>
          <div className="card">
            <img src="/assets/mobile.png" alt="Mobiles" />
            <h3>Mobiles</h3>
          </div>
          <div className="card">
            <img src="/assets/repair.png" alt="Repair Service" />
            <h3>Repair Services</h3>
          </div>
        </div>
      </section>

      {/* 3. Featured Products (static now, dynamic later) */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {/* Placeholder for product cards */}
          <div className="product-card">
            <img src="/assets/laptop.png" alt="Laptop" />
            <h3>Dell Inspiron</h3>
            <p>₹45,000</p>
            <Link to="/product/1" className="btn-buy">View</Link>
          </div>
          <div className="product-card">
            <img src="/assets/mobile.png" alt="Mobile" />
            <h3>Samsung Galaxy</h3>
            <p>₹22,000</p>
            <Link to="/product/2" className="btn-buy">View</Link>
          </div>
        </div>
      </section>

      {/* 4. Repair CTA */}
      <section className="repair-highlight">
        <h2>Need Laptop Repair?</h2>
        <p>We offer fast and reliable repair service at your doorstep.</p>
        <Link to="/repair-service" className="btn-repair">Request Repair</Link>
      </section>
    </div>
  );
};

export default Home;
// Home.jsx