import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaBus, 
  FaCalendarAlt,
  FaExchangeAlt,
  FaTimes,
  FaHistory,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './AdminBooking.css';

const AdminBooking = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    date: ''
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);
  const [recentSearches] = useState([
    { route: 'Bangalore to Sringeri', date: '10-09-2025' }
  ]);
  const [topRoutes] = useState([
    'Bangalore to Bejjavalli',
    'Sringeri to Bangalore',
    'Kammardi to Bangalore',
    'Thirthahalli to Bangalore',
    'Shimoga to Bangalore'
  ]);

  const cities = ['Bangalore', 'Sringeri', 'Thirthahalli', 'Kammardi', 'Bejjavalli', 'Shimoga'];

  // Handle clicks outside calendar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);


  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwapCities = () => {
    setSearchData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }));
  };

  const handleSearch = () => {
    if (!searchData.origin || !searchData.destination || !searchData.date) {
      alert('Please fill in all fields');
      return;
    }
    if (searchData.origin === searchData.destination) {
      alert('Origin and destination cannot be the same');
      return;
    }
    
    // Navigate to search results or booking flow
    console.log('Search data:', searchData);
    // You can navigate to search results page here
    // navigate('/search', { state: searchData });
  };

  const handleClear = () => {
    setSearchData({
      origin: '',
      destination: '',
      date: ''
    });
  };

  const handleQuickDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    setSearchData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
  };

  const handleRecentSearch = (search) => {
    // Parse the recent search and populate the form
    const [origin, destination] = search.route.split(' to ');
    setSearchData({
      origin,
      destination,
      date: search.date.split('-').reverse().join('-') // Convert DD-MM-YYYY to YYYY-MM-DD
    });
  };

  const handleTopRoute = (route) => {
    const [origin, destination] = route.split(' to ');
    setSearchData(prev => ({
      ...prev,
      origin,
      destination
    }));
  };

  const getDateDisplay = (dateString) => {
    if (!dateString) return 'Select Date';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const getQuickDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    return [
      { date: today, label: getDateDisplay(today.toISOString().split('T')[0]) },
      { date: tomorrow, label: getDateDisplay(tomorrow.toISOString().split('T')[0]) },
      { date: dayAfter, label: getDateDisplay(dayAfter.toISOString().split('T')[0]) }
    ];
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateSelect = (date) => {
    setSearchData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
    setShowCalendar(false);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const isDateSelected = (date) => {
    return date && date.toISOString().split('T')[0] === searchData.date;
  };

  const isDateToday = (date) => {
    const today = new Date();
    return date && date.toDateString() === today.toDateString();
  };

  const isDatePast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date && date < today;
  };

  return (
    <div className="admin-booking">
      <AdminNavbar />
      <div className="booking-container">
        {/* Page Header */}
        <div className="booking-header">
          <h1>Admin Booking</h1>
          <button className="back-btn" onClick={() => navigate('/admin')}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Main Search Bar */}
        <div className="main-search-bar">
          <div className="search-icons">
            <button className="search-icon-btn">
              <FaSearch />
            </button>
            <button className="search-icon-btn">
              <FaMapMarkerAlt />
            </button>
            <button className="search-icon-btn">
              <FaBus />
            </button>
          </div>

          <div className="search-fields">
            <div className="origin-field">
              <FaBus className="field-icon" />
              <input
                type="text"
                placeholder="Select Origin"
                value={searchData.origin}
                onChange={(e) => handleInputChange('origin', e.target.value)}
                className="search-input"
              />
            </div>

            <button className="swap-btn" onClick={handleSwapCities}>
              <FaExchangeAlt />
            </button>

            <div className="destination-field">
              <FaMapMarkerAlt className="field-icon" />
              <input
                type="text"
                placeholder="Select Destination"
                value={searchData.destination}
                onChange={(e) => handleInputChange('destination', e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <div className="date-section">
            <div className="date-picker-container" ref={calendarRef}>
              <button 
                className="date-btn"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <FaCalendarAlt />
                <span>{getDateDisplay(searchData.date)}</span>
              </button>
              
              {showCalendar && (
                <div className="calendar-dropdown">
                  <div className="calendar-header">
                    <button 
                      className="calendar-nav-btn"
                      onClick={() => navigateMonth(-1)}
                    >
                      <FaChevronLeft />
                    </button>
                    <h3 className="calendar-month-year">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                      className="calendar-nav-btn"
                      onClick={() => navigateMonth(1)}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                  
                  <div className="calendar-weekdays">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                  </div>
                  
                  <div className="calendar-days">
                    {getDaysInMonth(currentMonth).map((date, index) => (
                      <button
                        key={index}
                        className={`calendar-day ${
                          !date ? 'calendar-day-empty' : ''
                        } ${
                          date && isDateSelected(date) ? 'calendar-day-selected' : ''
                        } ${
                          date && isDateToday(date) ? 'calendar-day-today' : ''
                        } ${
                          date && isDatePast(date) ? 'calendar-day-past' : ''
                        }`}
                        onClick={() => date && !isDatePast(date) && handleDateSelect(date)}
                        disabled={!date || isDatePast(date)}
                      >
                        {date ? date.getDate() : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="quick-dates">
              {getQuickDates().map((dateObj, index) => (
                <button
                  key={index}
                  className={`quick-date-btn ${searchData.date === dateObj.date.toISOString().split('T')[0] ? 'active' : ''}`}
                  onClick={() => handleInputChange('date', dateObj.date.toISOString().split('T')[0])}
                >
                  {dateObj.label}
                </button>
              ))}
            </div>
          </div>

          <div className="action-buttons">
            <button className="search-btn" onClick={handleSearch}>
              <FaSearch />
              Search
            </button>
            <button className="clear-btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>

        {/* Recent Searches */}
        <div className="recent-searches">
          <h2>Recent Searches (click on any item for quick search)</h2>
          <div className="recent-search-item" onClick={() => handleRecentSearch(recentSearches[0])}>
            {recentSearches[0].route} on {recentSearches[0].date}
          </div>
        </div>

        {/* Top Routes */}
        <div className="top-routes">
          <h2>Top Routes (click on any item for quick search)</h2>
          <div className="routes-grid">
            {topRoutes.map((route, index) => (
              <div
                key={index}
                className="route-item"
                onClick={() => handleTopRoute(route)}
              >
                {route}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;
