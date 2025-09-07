import React, { useState } from 'react';
import './AdminLoginModal.css';

const AdminLoginModal = ({ onLoginSuccess, onClose }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Admin credentials (in a real app, this would be handled securely on the backend)
  const ADMIN_CREDENTIALS = {
    email: 'nagasree@gmail.com',
    password: 'nagasree@1234'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (credentials.email === ADMIN_CREDENTIALS.email && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      
      // Store admin login status
      localStorage.setItem('nagasree_admin_logged_in', 'true');
      localStorage.setItem('nagasree_admin_user', JSON.stringify({
        email: credentials.email,
        loginTime: new Date().toISOString()
      }));

      onLoginSuccess();
    } else {
      setError('Invalid admin credentials. Please try again.');
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setCredentials({ email: '', password: '' });
    setError('');
    onClose();
  };

  return (
    <div className="admin-login-modal-overlay">
      <div className="admin-login-modal">
        <div className="admin-login-header">
          <h2>🔐 Admin Login</h2>
          <button className="close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Enter admin email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Enter admin password"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="admin-login-btn"
            disabled={isLoading || !credentials.email || !credentials.password}
          >
            {isLoading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
