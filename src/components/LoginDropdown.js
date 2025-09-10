import React, { useState, useRef, useEffect } from 'react';
import { FaLock, FaUser, FaCog } from 'react-icons/fa';
import LoginModal from './LoginModal';
import AdminLoginModal from './AdminLoginModal';
import './LoginDropdown.css';

const LoginDropdown = ({ onLoginSuccess, onAdminLoginSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserLoginClick = () => {
    setShowUserLogin(true);
    setIsOpen(false);
  };

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true);
    setIsOpen(false);
  };

  const handleUserLoginSuccess = () => {
    setShowUserLogin(false);
    onLoginSuccess();
  };

  const handleAdminLoginSuccess = () => {
    setShowAdminLogin(false);
    onAdminLoginSuccess();
  };

  const handleUserLoginClose = () => {
    setShowUserLogin(false);
  };

  const handleAdminLoginClose = () => {
    setShowAdminLogin(false);
  };

  return (
    <>
      <div className="login-dropdown" ref={dropdownRef}>
        <button 
          className="login-dropdown-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="login-icon"><FaLock /></span>
          Login
          <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>
        
        {isOpen && (
          <div className="login-dropdown-menu">
            <div className="dropdown-item" onClick={handleUserLoginClick}>
              <span className="item-icon"><FaUser /></span>
              <span className="item-text">Customer Login</span>
            </div>
            <div className="dropdown-item admin-item" onClick={handleAdminLoginClick}>
              <span className="item-icon"><FaCog /></span>
              <span className="item-text">Admin Login</span>
            </div>
          </div>
        )}
      </div>

      {/* User Login Modal */}
      {showUserLogin && (
        <LoginModal 
          onLoginSuccess={handleUserLoginSuccess}
          onClose={handleUserLoginClose}
        />
      )}
      
      {/* Admin Login Modal */}
      {showAdminLogin && (
        <AdminLoginModal 
          onLoginSuccess={handleAdminLoginSuccess}
          onClose={handleAdminLoginClose}
        />
      )}
    </>
  );
};

export default LoginDropdown;
