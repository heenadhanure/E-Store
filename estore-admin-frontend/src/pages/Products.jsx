import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import AdminLayout from '../layout/AdminLayout';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('image', newProduct.image);

    try {
      await axios.post(`${API_BASE_URL}/api/products`, formData);
      fetchAllProducts(); // refresh list
      setShowModal(false);
      setNewProduct({ name: '', description: '', price: '', image: null });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <AdminLayout>
    <div className="d-flex">
      <div className="flex-grow-1">
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>Manage Products</h3>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Add Product
            </button>
          </div>

          {/* MODAL */}
          {showModal && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={handleSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Add New Product</h5>
                      <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input type="text" className="form-control" name="name" required value={newProduct.name} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" name="description" required value={newProduct.description} onChange={handleInputChange}></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Price (₹)</label>
                        <input type="number" className="form-control" name="price" required value={newProduct.price} onChange={handleInputChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input type="file" className="form-control" required onChange={handleImageChange} />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-success">Add Product</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* TABLE */}
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price (₹)</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td style={{ maxWidth: '250px' }}>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      {product.imageUrl ? (
                        <img
                          src={`${API_BASE_URL}/${product.imageUrl}`}
                          alt={product.name}
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                      ) : (
                        <span className="text-muted">No image</span>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">Edit</button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default Products;
