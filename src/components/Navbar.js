import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBus, FaQuestionCircle, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa';
import LoginDropdown from './LoginDropdown';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('nagasree_logged_in') === 'true';
      const user = localStorage.getItem('nagasree_current_user');
      const adminLoggedIn = localStorage.getItem('nagasree_admin_logged_in') === 'true';
      
      setIsLoggedIn(loggedIn);
      setIsAdminLoggedIn(adminLoggedIn);
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

  // const handleLogout = () => {
  //   localStorage.removeItem('nagasree_logged_in');
  //   localStorage.removeItem('nagasree_current_user');
  //   setIsLoggedIn(false);
  //   setCurrentUser(null);
  //   // Dispatch event to notify other components
  //   window.dispatchEvent(new CustomEvent('loginStateChanged'));
  // };

  const handleAdminLogout = () => {
    localStorage.removeItem('nagasree_admin_logged_in');
    setIsAdminLoggedIn(false);
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('adminStateChanged'));
  };

  const handleLoginSuccess = () => {
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('loginStateChanged'));
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('adminStateChanged'));
    // Auto-redirect to admin page
    window.location.href = '/admin';
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
              <span className="navbar-icon"><FaBus /></span>
              Bus Booking
            </Link>
            <Link to="/help" className="navbar-item">
              <span className="navbar-icon"><FaQuestionCircle /></span>
              Help
            </Link>
            
            {/* Admin Section */}
            {isAdminLoggedIn ? (
              <div className="admin-menu">
                <Link to="/admin" className="navbar-item admin-btn">
                  <span className="navbar-icon"><FaCog /></span>
                  Admin Panel
                </Link>
                <button className="navbar-item logout-btn" onClick={handleAdminLogout}>
                  <span className="navbar-icon"><FaSignOutAlt /></span>
                  Admin Logout
                </button>
              </div>
            ) : (
              <>
                {/* User Section */}
                {isLoggedIn ? (
                  <div className="user-menu">
                    <Link 
                      to="/profile" 
                      className="navbar-item profile-btn"
                    >
                      <span className="navbar-icon"><FaUser /></span>
                      {currentUser?.name}
                    </Link>
                  </div>
                ) : (
                  <LoginDropdown 
                    onLoginSuccess={handleLoginSuccess}
                    onAdminLoginSuccess={handleAdminLoginSuccess}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;
