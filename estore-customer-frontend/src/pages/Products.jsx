import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import '../styles/products.css';

const Products = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  // Add filter state as needed, e.g.:
  // const [filters, setFilters] = useState({ price: '', categories: [] });

  const handleApplyFilters = () => {
    // TODO: Apply filter logic here (update state, fetch products, etc.)
    setShowSidebar(false); // Hide sidebar on mobile/tablet
  };

  return (
    <div className="products-page">
      <h1 className='text-center mt-3'>All Available Products</h1>
      <div className="products-content">
        {/* Filter Button for mobile/tablet */}
        <button
          className="filter-toggle-btn"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? 'Hide Filters' : 'Show Filters'}
        </button>
        <aside className={`products-sidebar${showSidebar ? ' show' : ''}`}>
          <h4>Filters</h4>
          <div className="filter-section mb-4">
            <h6>Price</h6>
            <div>
              <label>
                <input type="radio" name="price" /> Under $50
              </label><br />
              <label>
                <input type="radio" name="price" /> $50 - $100
              </label><br />
              <label>
                <input type="radio" name="price" /> $100 - $200
              </label><br />
              <label>
                <input type="radio" name="price" /> Over $200
              </label>
            </div>
          </div>
          <div className="filter-section">
            <h6>Categories</h6>
            <div>
              <label>
                <input type="checkbox" name="category" /> Electronics
              </label><br />
              <label>
                <input type="checkbox" name="category" /> Clothing
              </label><br />
              <label>
                <input type="checkbox" name="category" /> Home
              </label><br />
              <label>
                <input type="checkbox" name="category" /> Books
              </label>
            </div>
          </div>
          <button className="apply-filter-btn" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </aside>
        <main className="flex-grow-1 p-3">
          <ProductList />
        </main>
      </div>
    </div>
  );
};

export default Products;
