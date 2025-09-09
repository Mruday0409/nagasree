import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [quickBookData, setQuickBookData] = useState({
    origin: '',
    destination: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [quickFindData, setQuickFindData] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('nagasree_admin_logged_in') === 'true';
    setIsAdminLoggedIn(adminLoggedIn);
    
    if (!adminLoggedIn) {
      navigate('/');
      return;
    }
  }, [navigate]);

  const handleQuickBook = () => {
    // Handle quick booking logic
    console.log('Quick book:', quickBookData);
  };

  const handleQuickFind = () => {
    // Handle quick find logic
    console.log('Quick find:', quickFindData);
  };

  const handleLogout = () => {
    localStorage.removeItem('nagasree_admin_logged_in');
    localStorage.removeItem('nagasree_admin_user');
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('adminStateChanged'));
    // Force a page reload to ensure clean state
    window.location.href = '/';
  };

  if (!isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
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
              <button className="icon-btn">🏠</button>
              <button className="icon-btn">👤</button>
              <button className="icon-btn hamburger-menu">☰</button>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
        </div>

        <div className="dashboard-content">
          {/* Left Column */}
          <div className="left-column">
            {/* Welcome Section */}
            <div className="welcome-section">
              <h2>Welcome Admin</h2>
              
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <div className="action-grid">
                <button className="action-btn book-tickets">
                  <div className="action-icon">🛒</div>
                  <span>Book Tickets</span>
                </button>
                <button className="action-btn print-tickets">
                  <div className="action-icon">🖨️</div>
                  <span>Print Tickets</span>
                </button>
                <button className="action-btn cancel-tickets">
                  <div className="action-icon">❌</div>
                  <span>Cancel Tickets</span>
                </button>
                <button className="action-btn phone-bookings">
                  <div className="action-icon">📞</div>
                  <span>Phone Bookings</span>
                </button>
                <button className="action-btn trips">
                  <div className="action-icon">🚌</div>
                  <span>Trips</span>
                </button>
                <button className="action-btn vanpickup-chart">
                  <div className="action-icon">📋</div>
                  <span>Vanpickup Chart</span>
                </button>
              </div>
            </div>

            {/* Quick Book */}
            <div className="quick-book-section">
              <div className="section-header">
                <span className="section-icon">⚡</span>
                <span className="section-title">Quick Book</span>
              </div>
              <div className="quick-book-form">
                <div className="form-row">
                  <select 
                    value={quickBookData.origin}
                    onChange={(e) => setQuickBookData({...quickBookData, origin: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Select Origin</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Sringeri">Sringeri</option>
                    <option value="Thirthahalli">Thirthahalli</option>
                    <option value="Kammaradi">Kammaradi</option>
                  </select>
                  <button className="swap-btn">⇄</button>
                  <select 
                    value={quickBookData.destination}
                    onChange={(e) => setQuickBookData({...quickBookData, destination: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Select Destination</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Sringeri">Sringeri</option>
                    <option value="Thirthahalli">Thirthahalli</option>
                    <option value="Kammaradi">Kammaradi</option>
                  </select>
                </div>
                <div className="form-row">
                  <input 
                    type="date" 
                    value={quickBookData.date}
                    onChange={(e) => setQuickBookData({...quickBookData, date: e.target.value})}
                    className="form-input"
                  />
                  <button className="search-btn" onClick={handleQuickBook}>Search</button>
                </div>
              </div>
            </div>

            {/* Quick Find */}
            <div className="quick-find-section">
              <div className="section-header">
                <span className="section-icon">🔍</span>
                <span className="section-title">Quick Find</span>
              </div>
              <div className="quick-find-form">
                <div className="search-input-group">
                  <input 
                    type="text" 
                    placeholder="PNR / Mobile / Email"
                    value={quickFindData}
                    onChange={(e) => setQuickFindData(e.target.value)}
                    className="search-input"
                  />
                  <button className="find-btn" onClick={handleQuickFind}>Find</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Notifications */}
            <div className="notifications-section">
              <div className="section-header">
                <span className="section-icon">☑️</span>
                <span className="section-title">Notifications</span>
              </div>
              <div className="notifications-content">
                <p>No Notification found!</p>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="recent-bookings-section">
              <div className="section-header">
                <span className="section-icon">🕐</span>
                <span className="section-title">Recent Bookings</span>
              </div>
              <div className="bookings-table">
                <table>
                  <thead>
                    <tr>
                      <th>PNR</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Travel Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>NAGP97KYM818</td>
                      <td>Thirthahalli</td>
                      <td>Bangalore</td>
                      <td>08-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97KU52492</td>
                      <td>Bangalore</td>
                      <td>Bejjavalli</td>
                      <td>08-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97J575993</td>
                      <td>Thirthahalli</td>
                      <td>Bangalore</td>
                      <td>08-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97J500226</td>
                      <td>Bangalore</td>
                      <td>Heggodu (Thirthahalli)</td>
                      <td>12-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97I237528</td>
                      <td>Bangalore</td>
                      <td>Thirthahalli</td>
                      <td>10-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97I14850</td>
                      <td>Shimoga</td>
                      <td>Bangalore</td>
                      <td>08-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97G59X736</td>
                      <td>Bangalore</td>
                      <td>Kammardi</td>
                      <td>09-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97G55J391</td>
                      <td>Bangalore</td>
                      <td>Kammardi</td>
                      <td>12-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97G5342220</td>
                      <td>Bangalore</td>
                      <td>Kammardi</td>
                      <td>25-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97G510987</td>
                      <td>Bangalore</td>
                      <td>Sringeri</td>
                      <td>12-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97G4747723</td>
                      <td>Bangalore</td>
                      <td>Kammardi</td>
                      <td>26-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97GEK37</td>
                      <td>Bangalore</td>
                      <td>Sringeri</td>
                      <td>07-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97E492316</td>
                      <td>Kammardi</td>
                      <td>Bangalore</td>
                      <td>07-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97EBD342</td>
                      <td>Bangalore</td>
                      <td>Shimoga</td>
                      <td>07-09-2025</td>
                    </tr>
                    <tr>
                      <td>NAGP97DQA539</td>
                      <td>Bangalore</td>
                      <td>Kammardi</td>
                      <td>07-09-2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>© nagasree.com</p>
      </footer>
    </div>
  );
};

export default Admin;