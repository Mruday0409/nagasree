import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onLoginSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      if (!formData.email || !formData.password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Check if user exists in localStorage
      const existingUser = localStorage.getItem('nagasree_user');
      if (existingUser) {
        const user = JSON.parse(existingUser);
        if (user.email === formData.email && user.password === formData.password) {
          localStorage.setItem('nagasree_logged_in', 'true');
          localStorage.setItem('nagasree_current_user', JSON.stringify(user));
          onLoginSuccess();
          return;
        } else {
          alert('Invalid email or password');
          return;
        }
      } else {
        alert('User not found. Please sign up first.');
        return;
      }
    } else {
      if (!formData.email || !formData.password || !formData.name || !formData.phone) {
        alert('Please fill in all fields');
        return;
      }
      
      // Store user data in localStorage
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        joinedDate: new Date().toLocaleDateString()
      };
      
      localStorage.setItem('nagasree_user', JSON.stringify(userData));
      localStorage.setItem('nagasree_logged_in', 'true');
      localStorage.setItem('nagasree_current_user', JSON.stringify(userData));
      onLoginSuccess();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              className="switch-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
