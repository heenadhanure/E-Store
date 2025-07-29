// src/components/auth/LoginForm.jsx
import React, { useState, useContext } from 'react';
import '../../styles/loginForm.css';
import { API_BASE_URL } from '../../config/api';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const LoginForm = ({ onSuccessLogin }) => {
  const [activeTab, setActiveTab] = useState('password');
  const { login } = useContext(AuthContext);

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email: emailOrPhone,
        password
      });
      login(res.data);
      alert('Login successful!');
      if (onSuccessLogin) onSuccessLogin();
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  const handleSendOtp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/users/generate-otp`, { target: emailOrPhone });
      setOtpSent(true);
      alert("OTP sent!");
    } catch (err) {
      alert("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/verify-otp`, {
        target: emailOrPhone,
        otp
      });
      login(res.data);
      alert("OTP Verified");
      if (onSuccessLogin) onSuccessLogin();
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-toggle">
        <button
          className={activeTab === 'password' ? 'active' : ''}
          onClick={() => setActiveTab('password')}
        >
          Password Login
        </button>
        <button
          className={activeTab === 'otp' ? 'active' : ''}
          onClick={() => setActiveTab('otp')}
        >
          OTP Login
        </button>
      </div>

      {activeTab === 'password' && (
        <form onSubmit={handlePasswordLogin}>
          <input
            type="text"
            placeholder="Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">Login</button>
        </form>
      )}

      {activeTab === 'otp' && (
        <>
          <input
            type="text"
            placeholder="Enter Mobile or Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
          {!otpSent ? (
            <button onClick={handleSendOtp} className="submit-btn">Send OTP</button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button onClick={handleVerifyOtp} className="submit-btn">Verify OTP</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LoginForm;
