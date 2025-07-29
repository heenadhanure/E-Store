import React, { useState } from 'react';
import '../styles/repairService.css';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  contact: '',
  email: '',
  deviceType: '',
  issue: '',
  preferredTime: '',
};

const RepairServiceForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    }

    if (!formData.contact.trim()) {
      errs.contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contact.trim())) {
      errs.contact = 'Contact must be 10 digits';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.trim())) {
      errs.email = 'Invalid email address';
    }

    if (!formData.deviceType) {
      errs.deviceType = 'Device type is required';
    }

    if (!formData.issue.trim()) {
      errs.issue = 'Issue description is required';
    } else if (formData.issue.trim().length < 10) {
      errs.issue = 'Issue must be at least 10 characters';
    }

    if (!formData.preferredTime.trim()) {
      errs.preferredTime = 'Preferred time is required';
    } 

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post(`${API_BASE_URL}/api/repairs`, formData);
      setShowPopup(true);
      setFormData(initialState);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/products');
      }, 3000);
    } catch (error) {
      console.error("Repair request failed:", error);
      alert("Failed to submit repair request. Please try again.");
    }
  };

  return (
    <div className="repair-form-page">
      <h2>Request a Repair Service</h2>
      {showPopup && (
        <>
          <div className="popup-overlay"></div>
          <div className="popup-msg">
            <span role="img" aria-label="hurray" style={{fontSize: '2rem'}}>🎉</span>
            <p>
              Request submitted successfully!<br />
              Our technician will reach you soon.<br />
              <b>Hurray!</b>
            </p>
          </div>
        </>
      )}
      <form className="repair-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="form-error">{errors.name}</span>}

        <label htmlFor="contact">Contact Number</label>
        <input
          id="contact"
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        {errors.contact && <span className="form-error">{errors.contact}</span>}

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="form-error">{errors.email}</span>}

        <label htmlFor="deviceType">Device Type</label>
        <select
          id="deviceType"
          name="deviceType"
          value={formData.deviceType}
          onChange={handleChange}
          required
        >
          <option value="">Select Device</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="Other">Other</option>
        </select>
        {errors.deviceType && <span className="form-error">{errors.deviceType}</span>}

        <label htmlFor="issue">Describe the issue</label>
        <textarea
          id="issue"
          name="issue"
          placeholder="Describe the issue..."
          rows="4"
          value={formData.issue}
          onChange={handleChange}
          required
        />
        {errors.issue && <span className="form-error">{errors.issue}</span>}

        <label htmlFor="preferredTime">Preferred Time</label>
        <input
          id="preferredTime"
          type="text"
          name="preferredTime"
          placeholder="Preferred Time (e.g. Tomorrow 10 AM)"
          value={formData.preferredTime}
          onChange={handleChange}
          required
        />
        {errors.preferredTime && <span className="form-error">{errors.preferredTime}</span>}

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default RepairServiceForm;
