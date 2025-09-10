import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaBars } from 'react-icons/fa';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('nagasree_admin_logged_in');
    localStorage.removeItem('nagasree_admin_user');
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('adminStateChanged'));
    // Force a page reload to ensure clean state
    window.location.href = '/';
  };

  return (
    <header className="admin-header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">Nagasree</span>
          </div>
          <nav className="main-nav">
            <div className="nav-dropdown">
              <span className="nav-item">Booking</span>
              <div className="dropdown-content">
                <a href="#">New Booking</a>
                <a href="#">Bulk Booking</a>
                <a href="#">Phone Booking</a>
              </div>
            </div>
            <div className="nav-dropdown">
              <span className="nav-item">Master</span>
              <div className="dropdown-content">
                <a href="#">Routes</a>
                <a href="#">Buses</a>
                <a href="#">Passengers</a>
              </div>
            </div>
            <div className="nav-dropdown">
              <span className="nav-item">Report</span>
              <div className="dropdown-content">
                <a href="#">Booking Report</a>
                <a href="#">Revenue Report</a>
                <a href="#">Seat Utilization</a>
              </div>
            </div>
          </nav>
        </div>
        <div className="header-right">
          <div className="header-icons">
            <button className="icon-btn" onClick={() => navigate('/admin')}><FaHome /></button>
            <button className="icon-btn"><FaUser /></button>
            <button className="icon-btn hamburger-menu"><FaBars /></button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
