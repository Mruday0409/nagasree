import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('nagasree_logged_in') === 'true';
      const user = localStorage.getItem('nagasree_current_user');
      
      setIsLoggedIn(loggedIn);
      if (user) {
        setCurrentUser(JSON.parse(user));
      } else {
        setCurrentUser(null);
      }
    };

    // Check login status on mount
    checkLoginStatus();

    // Listen for login state changes
    const handleLoginStateChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('loginStateChanged', handleLoginStateChange);

    // Cleanup event listener
    return () => {
      window.removeEventListener('loginStateChanged', handleLoginStateChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('nagasree_logged_in');
    localStorage.removeItem('nagasree_current_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('loginStateChanged'));
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('loginStateChanged'));
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">
              <span className="logo-n">N</span>aga 
              <span className="logo-s">S</span>ree Travels
            </span>
          </Link>
          
          <div className="navbar-menu">
            <Link to="/" className="navbar-item">
              <span className="navbar-icon">🚌</span>
              Bus Booking
            </Link>
            <Link to="/help" className="navbar-item">
              <span className="navbar-icon">❓</span>
              Help
            </Link>
            {isLoggedIn ? (
              <div className="user-menu">
                <Link 
                  to="/profile" 
                  className="navbar-item profile-btn"
                >
                  <span className="navbar-icon">👤</span>
                  {currentUser?.name}
                </Link>
              </div>
            ) : (
              <button className="navbar-item login-btn" onClick={handleLoginClick}>
                <span className="navbar-icon">👤</span>
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onLoginSuccess={handleLoginSuccess}
          onClose={handleLoginClose}
        />
      )}
    </nav>
  );
};

export default Navbar;
