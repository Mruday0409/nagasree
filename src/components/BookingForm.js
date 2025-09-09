import React, { useState } from 'react';
import './BookingForm.css';
import womenLogo from '../assests/women-logo.png';

const BookingForm = ({ onSearch, initialData }) => {
  const [formData, setFormData] = useState({
    from: initialData?.from || '',
    to: initialData?.to || '',
    date: initialData?.date || ''
  });

  const [isWomenBooking, setIsWomenBooking] = useState(false);
  const [fromDropdownOpen, setFromDropdownOpen] = useState(false);
  const [toDropdownOpen, setToDropdownOpen] = useState(false);
  const [fromSearchTerm, setFromSearchTerm] = useState('');
  const [toSearchTerm, setToSearchTerm] = useState('');

  const cities = ['Bangalore', 'Sringeri'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.date) {
      alert('Please fill in all fields');
      return;
    }
    if (formData.from === formData.to) {
      alert('From and To cities cannot be the same');
      return;
    }
    onSearch({ 
      ...formData, 
      isWomenBooking
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getFilteredFromCities = () => {
    const availableCities = cities.filter(city => city !== formData.to);
    if (!fromSearchTerm) return availableCities;
    return availableCities.filter(city => 
      city.toLowerCase().includes(fromSearchTerm.toLowerCase())
    );
  };

  const getFilteredToCities = () => {
    const availableCities = cities.filter(city => city !== formData.from);
    if (!toSearchTerm) return availableCities;
    return availableCities.filter(city => 
      city.toLowerCase().includes(toSearchTerm.toLowerCase())
    );
  };

  const handleFromSelect = (city) => {
    handleInputChange('from', city);
    setFromSearchTerm('');
    setFromDropdownOpen(false);
  };

  const handleToSelect = (city) => {
    handleInputChange('to', city);
    setToSearchTerm('');
    setToDropdownOpen(false);
  };

  return (
    <div className="booking-form-container">
      <div className="horizontal-booking-form">
        {/* Main Form Fields Row */}
        <div className="form-fields-row">
          {/* From Input */}
          <div className="form-field from-field">
            <div className="searchable-dropdown">
              <input
                type="text"
                className="from-input"
                placeholder="From"
                value={formData.from || fromSearchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setFromSearchTerm(value);
                  setFromDropdownOpen(true);
                  // Clear the selected city when user types or deletes
                  if (formData.from && !cities.includes(value)) {
                    handleInputChange('from', '');
                  }
                  // Set the city if it matches exactly
                  if (cities.includes(value)) {
                    handleInputChange('from', value);
                    setFromSearchTerm('');
                  }
                }}
                onFocus={() => setFromDropdownOpen(true)}
                onBlur={() => setTimeout(() => setFromDropdownOpen(false), 200)}
                required
              />
              {fromDropdownOpen && getFilteredFromCities().length > 0 && (
                <div className="dropdown-menu">
                  {getFilteredFromCities().map(city => (
                    <div
                      key={city}
                      className="dropdown-item"
                      onClick={() => handleFromSelect(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* To Input */}
          <div className="form-field to-field">
            <div className="searchable-dropdown">
              <input
                type="text"
                className="to-input"
                placeholder="To"
                value={formData.to || toSearchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setToSearchTerm(value);
                  setToDropdownOpen(true);
                  // Clear the selected city when user types or deletes
                  if (formData.to && !cities.includes(value)) {
                    handleInputChange('to', '');
                  }
                  // Set the city if it matches exactly
                  if (cities.includes(value)) {
                    handleInputChange('to', value);
                    setToSearchTerm('');
                  }
                }}
                onFocus={() => setToDropdownOpen(true)}
                onBlur={() => setTimeout(() => setToDropdownOpen(false), 200)}
                required
              />
              {toDropdownOpen && getFilteredToCities().length > 0 && (
                <div className="dropdown-menu">
                  {getFilteredToCities().map(city => (
                    <div
                      key={city}
                      className="dropdown-item"
                      onClick={() => handleToSelect(city)}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Date Input - Separate Container */}
          <div className="form-field date-field">
            <div className="date-selection-container">
              <input
                type="date"
                className="date-input"
                placeholder="Date of Journey"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={getTodayDate()}
                required
              />
              <div className="date-quick-buttons">
                <button
                  type="button"
                  className={`date-quick-btn ${formData.date === getTodayDate() ? 'active' : ''}`}
                  onClick={() => handleInputChange('date', getTodayDate())}
                >
                  Today
                </button>
                <button
                  type="button"
                  className={`date-quick-btn ${formData.date === getTomorrowDate() ? 'active' : ''}`}
                  onClick={() => handleInputChange('date', getTomorrowDate())}
                >
                  Tomorrow
                </button>
              </div>
            </div>
          </div>

          {/* Women Booking - Separate Container */}
          <div className="form-field">
            <div className="women-booking-container">
              <div className="women-booking-icon">
                <img src={womenLogo} alt="Women booking" className="women-logo" />
              </div>
              <div className="women-booking-text-section">
                <span className="women-booking-main-text">Booking for women</span>
                <div className="women-booking-bottom-row">
                  <span className="women-booking-link">Know more</span>
                  <div className="women-booking-toggle-switch">
                    <input
                      type="checkbox"
                      checked={isWomenBooking}
                      onChange={(e) => setIsWomenBooking(e.target.checked)}
                      className="women-toggle-input"
                      id="women-booking"
                    />
                    <label htmlFor="women-booking" className="women-toggle-slider"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button Row */}
        <div className="search-button-row">
          <button type="submit" className="search-button" onClick={handleSubmit}>
            Search buses
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;