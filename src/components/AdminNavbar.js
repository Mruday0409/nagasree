import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('nagasree_admin_logged_in');
    localStorage.removeItem('nagasree_admin_user');
    navigate('/');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-content">
        <div className="admin-logo">
          <span className="admin-logo-text">
            <span className="admin-logo-n">N</span>aga 
            <span className="admin-logo-s">S</span>ree Travels
          </span>
          <span className="admin-badge">ADMIN</span>
        </div>
        
        <div className="admin-navbar-menu">
          <div className="admin-navbar-item">
            <span className="admin-navbar-icon">⚙️</span>
            Dashboard
          </div>
          <div className="admin-navbar-item">
            <span className="admin-navbar-icon">🪑</span>
            Seat Management
          </div>
          <div className="admin-navbar-item">
            <span className="admin-navbar-icon">📊</span>
            Reports
          </div>
          <div className="admin-navbar-item">
            <span className="admin-navbar-icon">👥</span>
            Users
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <span className="admin-navbar-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
