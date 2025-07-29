import React, { useState } from 'react';
import '../styles/contact.css';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, formData);
      setShowPopup(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setShowPopup(false), 2500);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {showPopup && (
        <>
          <div className="popup-overlay"></div>
          <div className="popup-msg">
            <span role="img" aria-label="hurray" style={{fontSize: '2rem'}}>🎉</span>
            <p>
              Message sent successfully!<br />
              Our team will contact you soon.<br />
              <b>Hurray!</b>
            </p>
          </div>
        </>
      )}
      <div className="contact-flex-container">
        <div className="contact-info-cards">
          <div className="info-card">
            <h4>📞 Phone</h4>
            <p>+91 98765 43210<br />+91 91234 56789</p>
          </div>
          <div className="info-card">
            <h4>✉️ Email</h4>
            <p>support@estore.com<br />info@estore.com</p>
          </div>
          <div className="info-card">
            <h4>📍 Address</h4>
            <p>
              eStore Shop,<br />
              Kalewadi Phata,<br />
              Pune, Maharashtra 411017
            </p>
          </div>
        </div>
        <div className="contact-container">
          <h2>Contact Us</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            <textarea name="message" rows="5" placeholder="Your Message..." value={formData.message} onChange={handleChange} required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <div className="map-container">
        <iframe
          title="Shop Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1890.6689402673485!2d73.77584304660557!3d18.603866418321992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b91bd7a9dfff%3A0x68a264ce49f956ce!2sKalewadi%20Phata%20Bus%20stop!5e0!3m2!1sen!2sin!4v1751722110046!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
