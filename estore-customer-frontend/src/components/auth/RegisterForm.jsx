// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/api';
import axios from 'axios';
import '../../styles/registerForm.css'; // reuse styling if needed

const RegisterForm = ({ onSuccessRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/users/register`, formData);
      alert("Registration successful! You can now log in.");
      onSuccessRegister(); // close modal
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        name="contact"
        type="text"
        placeholder="Contact"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        type="textarea"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <button type="submit" className="submit-btn">Register</button>
    </form>
  );
};

export default RegisterForm;
