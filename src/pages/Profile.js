import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const loggedIn = localStorage.getItem('nagasree_logged_in') === 'true';
    const currentUser = localStorage.getItem('nagasree_current_user');
    
    if (!loggedIn || !currentUser) {
      navigate('/');
      return;
    }
    
    const userData = JSON.parse(currentUser);
    setUser(userData);
    setEditData(userData);
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: editData.name,
      email: editData.email,
      phone: editData.phone
    };
    
    localStorage.setItem('nagasree_current_user', JSON.stringify(updatedUser));
    localStorage.setItem('nagasree_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('nagasree_logged_in');
      localStorage.removeItem('nagasree_current_user');
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('loginStateChanged'));
      navigate('/');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account information</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-circle">
                <span className="avatar-text">{user.name?.charAt(0).toUpperCase()}</span>
              </div>
            </div>

            <div className="profile-info">
              <div className="info-section">
                <h2>Personal Information</h2>
                
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="edit-input"
                        value={editData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <span className="info-value">{user.name}</span>
                    )}
                  </div>

                  <div className="info-item">
                    <label>Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="edit-input"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <span className="info-value">{user.email}</span>
                    )}
                  </div>

                  <div className="info-item">
                    <label>Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="edit-input"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <span className="info-value">{user.phone}</span>
                    )}
                  </div>

                  <div className="info-item">
                    <label>Member Since</label>
                    <span className="info-value">{user.joinedDate}</span>
                  </div>
                </div>

                <div className="profile-actions">
                  {isEditing ? (
                    <div className="edit-actions">
                      <button className="save-btn" onClick={handleSave}>
                        Save Changes
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={handleEdit}>
                        Edit Profile
                      </button>
                      <button className="logout-btn" onClick={handleLogout}>
                        <span className="logout-icon"><FaSignOutAlt /></span>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="info-section">
                <h2>Account Statistics</h2>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">0</div>
                    <div className="stat-label">Total Bookings</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">₹0</div>
                    <div className="stat-label">Total Spent</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-number">0</div>
                    <div className="stat-label">Trips Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
