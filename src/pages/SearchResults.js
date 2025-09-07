import React from 'react';
import { useNavigate } from 'react-router-dom';
import BusCard from '../components/BusCard';
import './SearchResults.css';

const SearchResults = ({ bookingData, updateBookingData, isReturnJourney = false }) => {
  const navigate = useNavigate();

  const handleSelectBus = (bus) => {
    if (isReturnJourney) {
      updateBookingData({ returnSelectedBus: bus });
      navigate('/return-seats');
    } else {
      updateBookingData({ selectedBus: bus });
      navigate('/seats');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };


  // If no booking data, provide default data instead of redirecting
  if (!bookingData) {
    bookingData = {};
  }

  // Provide default journey data if missing
  if (!bookingData.from && !isReturnJourney) {
    bookingData.from = 'Bangalore';
  }
  if (!bookingData.to && !isReturnJourney) {
    bookingData.to = 'Sringeri';
  }
  if (!bookingData.date && !isReturnJourney) {
    bookingData.date = new Date().toISOString();
  }

  // Provide default return journey data if missing
  if (!bookingData.returnJourney && isReturnJourney) {
    bookingData.returnJourney = {
      from: 'Sringeri',
      to: 'Bangalore',
      date: new Date().toISOString()
    };
  }

  const journeyFrom = isReturnJourney ? (bookingData.returnJourney?.from || 'Sringeri') : (bookingData.from || 'Bangalore');
  const journeyTo = isReturnJourney ? (bookingData.returnJourney?.to || 'Bangalore') : (bookingData.to || 'Sringeri');
  const journeyDate = isReturnJourney ? (bookingData.returnJourney?.date || new Date().toISOString()) : (bookingData.date || new Date().toISOString());

  const buses = [
    {
      id: 1,
      name: 'Nagasree Express',
      type: 'AC Sleeper',
      departureTime: '22:30',
      arrivalTime: '06:00',
      duration: '7h 30m',
      rating: 4.5,
      price: 850,
      seatsAvailable: 12,
      amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle'],
      busOperator: 'Nagasree Travels',
      route: `${journeyFrom} → ${journeyTo}`,
      from: journeyFrom,
      to: journeyTo,
      date: journeyDate,
      cancellationPolicy: 'Free cancellation till 2 hours before departure'
    },
    // {
    //   id: 2,
    //   name: 'Nagasree Comfort',
    //   type: 'Non-AC Seater',
    //   departureTime: '08:00',
    //   arrivalTime: '15:30',
    //   duration: '7h 30m',
    //   rating: 4.2,
    //   price: 450,
    //   seatsAvailable: 8,
    //   amenities: ['Charging Point', 'Water Bottle', 'Reading Light'],
    //   busOperator: 'Nagasree Travels',
    //   route: `${journeyFrom} → ${journeyTo}`,
    //   cancellationPolicy: 'Free cancellation till 4 hours before departure'
    // }
  ];


  return (
    <div className="search-results">
      <div className="container">
        {/* Search Summary */}
        <div className="search-summary">
          <div className="search-info">
            <h1 className="search-title">
              {isReturnJourney ? 'Return Journey: ' : ''}{journeyFrom} → {journeyTo}
            </h1>
            <p className="search-date">{formatDate(journeyDate)}</p>
          </div>
          <div className="modify-search">
            <button 
              className="modify-btn"
              onClick={() => navigate('/')}
            >
              Modify Search
            </button>
          </div>
        </div>

        <div className="search-content">
          {/* Sidebar Filters */}
          <div className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="clear-filters">Clear All</button>
            </div>
            
            <div className="filter-section">
              <h4>Bus Type</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" /> AC (1)
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> Non-AC (1)
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h4>Departure Time</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" /> 
                  <span className="time-slot">
                    <span className="time-icon">🌅</span>
                    Early Morning<br />
                    <small>12 AM - 6 AM</small>
                  </span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> 
                  <span className="time-slot">
                    <span className="time-icon">☀️</span>
                    Morning<br />
                    <small>6 AM - 12 PM</small>
                  </span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> 
                  <span className="time-slot">
                    <span className="time-icon">🌤️</span>
                    Afternoon<br />
                    <small>12 PM - 6 PM</small>
                  </span>
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> 
                  <span className="time-slot">
                    <span className="time-icon">🌙</span>
                    Night<br />
                    <small>6 PM - 12 AM</small>
                  </span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-range">
                <input type="range" min="200" max="1000" defaultValue="500" className="price-slider" />
                <div className="price-labels">
                  <span>₹200</span>
                  <span>₹1000</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h4>Amenities</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input type="checkbox" /> WiFi
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> Charging Point
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> Water Bottle
                </label>
                <label className="filter-option">
                  <input type="checkbox" /> Reading Light
                </label>
              </div>
            </div>
          </div>

          {/* Bus Results */}
          <div className="results-section">
            <div className="results-header">
              <h2>Available Buses</h2>
              <div className="results-info">
                <span className="results-count">{buses.length} buses found</span>
                <select className="sort-select">
                  <option value="price">Sort by Price</option>
                  <option value="departure">Sort by Departure</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div>
            
            <div className="bus-list">
              {buses.map(bus => (
                <BusCard 
                  key={bus.id} 
                  bus={bus} 
                  onSelect={() => handleSelectBus(bus)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
