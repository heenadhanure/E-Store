// src/components/auth/LoginModal.jsx
import React, { useState } from "react";
import "../../styles/loginModal.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginModal = ({ onClose }) => {
  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () => setShowRegister((prev) => !prev);

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <div className="modal-header">
          <h2>{showRegister ? "Create an Account" : "Welcome to E-Store"}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {showRegister ? (
          <>
            <RegisterForm onSuccessRegister={onClose} />
            <p className="form-toggle-msg">
              Already have an account?{" "}
              <span className="toggle-link" onClick={toggleForm}>Login</span>
            </p>
          </>
        ) : (
          <>
            <LoginForm onSuccessLogin={onClose} />
            <p className="form-toggle-msg">
              Don't have an account?{" "}
              <span className="toggle-link" onClick={toggleForm}>Register here</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
