import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBus, FaStar, FaFemale, FaWifi, FaTicketAlt } from 'react-icons/fa';
import LoginModal from '../components/LoginModal';
import './SeatSelection.css';
import driver from '../assests/driver.png';

const SeatSelection = ({ bookingData = {}, updateBookingData = () => {}, isReturnJourney = false }) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingSeatSelection, setPendingSeatSelection] = useState(null);


  // Add default data to prevent blank screen on reload
  const defaultBus = {
    name: 'Nagasree Express',
    from: bookingData?.from || 'Bangalore',
    to: bookingData?.to || 'Sringeri',
    date: bookingData?.date ? new Date(bookingData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : '31 Aug',
    rating: '3.7',
    reviews: '203'
  };

  const currentBus = isReturnJourney ? 
    (bookingData?.returnSelectedBus || defaultBus) : 
    (bookingData?.selectedBus || defaultBus);


  // If no booking data, use default data instead of redirecting
  if (!bookingData || Object.keys(bookingData).length === 0) {
    // Use default data to prevent crashes on reload
    bookingData = {
      selectedBus: defaultBus,
      returnSelectedBus: defaultBus
    };
  }

  // Get seat data from localStorage (managed by admin) or use default
  const getSeatData = () => {
    const savedSeatData = localStorage.getItem('nagasree_seat_data');
    if (savedSeatData) {
      return JSON.parse(savedSeatData);
    }
    
    // Default seat data if no admin data exists
    return {
      lowerDeck: {
        leftColumn: [
          { id: 'L1', number: 'L1', status: 'available', price: 1399 },
          { id: 'L2', number: 'L4', status: 'sold', price: 1399 },
          { id: 'L3', number: 'L7', status: 'available', price: 1399 },
          { id: 'L4', number: 'L10', status: 'available', price: 1399 },
          { id: 'L5', number: 'L13', status: 'available', price: 1119 },
        ],
        middleColumn: [
          { id: 'L7', number: 'L2', status: 'available', price: 1049 },
          { id: 'L8', number: 'L5', status: 'available', price: 1049 },
          { id: 'L9', number: 'L8', status: 'sold', price: 1049 },
          { id: 'L10', number: 'L11', status: 'available', price: 1049 },
          { id: 'L11', number: 'L14', status: 'sold', price: 1049 },
        ],
        rightColumn: [
          { id: 'L13', number: 'L3', status: 'available', price: 1049 },
          { id: 'L14', number: 'L6', status: 'available', price: 1049 },
          { id: 'L15', number: 'L9', status: 'available', price: 1049 },
          { id: 'L16', number: 'L12', status: 'sold', price: 1049 },
          { id: 'L17', number: 'L15', status: 'available', price: 1049 },
        ]
      },
      upperDeck: {
        leftColumn: [
          { id: 'U1', number: 'U1', status: 'sold', price: 849 },
          { id: 'U2', number: 'U4', status: 'available', price: 849 },
          { id: 'U3', number: 'U7', status: 'sold', price: 849 },
          { id: 'U4', number: 'U10', status: 'available', price: 849 },
          { id: 'U5', number: 'U13', status: 'available', price: 849 },
        ],
        middleColumn: [
          { id: 'U7', number: 'U2', status: 'available', price: 849 },
          { id: 'U8', number: 'U5', status: 'sold', price: 849 },
          { id: 'U9', number: 'U8', status: 'available', price: 849 },
          { id: 'U10', number: 'U11', status: 'sold', price: 849 },
          { id: 'U11', number: 'U14', status: 'available', price: 849 },
        ],
        rightColumn: [
          { id: 'U13', number: 'U3', status: 'sold', price: 1299 },
          { id: 'U14', number: 'U6', status: 'available', price: 1299 },
          { id: 'U15', number: 'U9', status: 'sold', price: 1299 },
          { id: 'U16', number: 'U12', status: 'available', price: 1299 },
          { id: 'U17', number: 'U15', status: 'available', price: 1299 },
        ]
      }
    };
  };

  const seatData = getSeatData();
  const lowerDeckSeats = seatData.lowerDeck;
  const upperDeckSeats = seatData.upperDeck;



  const handleSeatClick = (seat) => {
    if (seat.status === 'sold') return;

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('nagasree_logged_in') === 'true';
    
    if (!isLoggedIn) {
      // Show login modal before allowing seat selection
      setPendingSeatSelection(seat);
      setShowLoginModal(true);
      return;
    }

    // User is logged in, proceed with seat selection
    const isSelected = selectedSeats.find(s => s.id === seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getTotalAmount = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (pendingSeatSelection) {
      // After successful login, proceed with the seat selection
      const isSelected = selectedSeats.find(s => s.id === pendingSeatSelection.id);
      if (isSelected) {
        setSelectedSeats(selectedSeats.filter(s => s.id !== pendingSeatSelection.id));
      } else {
        setSelectedSeats([...selectedSeats, pendingSeatSelection]);
      }
      setPendingSeatSelection(null);
    }
    // Dispatch a custom event to notify navbar about login state change
    window.dispatchEvent(new CustomEvent('loginStateChanged'));
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
    setPendingSeatSelection(null);
  };

  const renderSeat = (seat, columnType = '') => {
    if (!seat || typeof seat !== 'object' || !seat.id) {
      return <div key={`empty-${Math.random()}`} className="seat-empty"></div>;
    }

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    let seatClass = `seat sleeper-seat ${columnType} ${seat.status}`;
    if (isSelected) seatClass += ' selected';

    return (
      <div
        key={seat.id}
        className={seatClass}
        onClick={() => handleSeatClick(seat)}
      >
        <div className="seat-number">{seat.number}</div>
        {seat.status === 'available' && <div className="seat-price">₹{seat.price}</div>}
      </div>
    );
  };



  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    if (updateBookingData) {
      updateBookingData({
        selectedSeats: selectedSeats.map(seat => seat.number), // Send only seat numbers
        totalAmount: getTotalAmount()
      });
    }
    navigate('/pickup-drop');
  };

  return (
    <div className="seat-selection">
      <div className="container">
        {/* Header - Progress Steps */}
        <div className="selection-header">
          <div className="bus-service-info-container">
            <div className="bus-service-info">
              <h1 className="bus-service-name">{currentBus.name}</h1>
              <p className="bus-route">{currentBus.from} — {currentBus.to}</p>
            </div>
          </div>
          <div className="booking-progress progress-steps-container">
            <div className="progress-step active">
              <span className="step-number">1</span>
              <span className="step-text">Select seats</span>
            </div>
            <div className="progress-step">
              <span className="step-number">2</span>
              <span className="step-text">Board/Drop point</span>
            </div>
            <div className="progress-step">
              <span className="step-number">3</span>
              <span className="step-text">Passenger info</span>
            </div>
            <div className="progress-step">
              <span className="step-number">4</span>
              <span className="step-text">Payment</span>
            </div>
          </div>
        </div>

        <div className="main-content">
          {/* Left Side - Seat Selection */}
          <div className="seat-selection-side">
            <div className="decks-container">
              {/* Lower Deck */}
              <div className="deck-section lower-deck">
                <div className="deck-header">
                  <span className="steering-icon"><FaBus /></span>
                  <span className="deck-title">Lower deck</span>
                </div>
                {/* Driver Seat positioned in front of seat L1 */}
                <div className="driver-seat-container">
                  <div className="driver-seat">
                    <img src={driver} alt="Driver" className="driver-icon" />
                    <div className="driver-label">Driver</div>
                  </div>
                </div>
                <div className="seat-grid lower-deck-grid">
                  <div className="seat-column lower-left-column">
                    {lowerDeckSeats.leftColumn.map(seat => renderSeat(seat, 'lower-left-seat'))}
                  </div>
                  <div className="seat-column lower-middle-column">
                    {lowerDeckSeats.middleColumn.map(seat => renderSeat(seat, 'lower-middle-seat'))}
                  </div>
                  <div className="seat-column lower-right-column">
                    {lowerDeckSeats.rightColumn.map(seat => renderSeat(seat, 'lower-right-seat'))}
                </div>
              </div>
              </div>

              {/* Upper Deck */}
              <div className="deck-section upper-deck">
                <div className="deck-header">
                  <span className="deck-title">Upper deck</span>
                </div>
                <div className="seat-grid upper-deck-grid">
                  <div className="seat-column upper-left-column">
                    {upperDeckSeats.leftColumn.map(seat => renderSeat(seat, 'upper-left-seat'))}
                  </div>
                  <div className="seat-column upper-middle-column">
                    {upperDeckSeats.middleColumn.map(seat => renderSeat(seat, 'upper-middle-seat'))}
                  </div>
                  <div className="seat-column upper-right-column">
                    {upperDeckSeats.rightColumn.map(seat => renderSeat(seat, 'upper-right-seat'))}
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Legend */}
            <div className="seat-legend-section">
              <h4>Know your seat types</h4>
              <div className="legend-items">
                <div className="legend-item">
                  <div className="seat-demo available"></div>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <div className="seat-demo selected"></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <div className="seat-demo sold"></div>
                  <span>Sold</span>
                </div>
                </div>
              </div>
            </div>
            
          {/* Right Side - Bus Details Section */}
          <div className="bus-details-side">
            {/* Bus Header */}
            <div className="bus-header">
              <div className="bus-info">
                <h2 className="bus-operator">{currentBus.name}</h2>
                <div className="bus-schedule">22:45 - 05:30 - {currentBus.date}</div>
                <div className="bus-type">NON A/C Sleeper (2+1)</div>
              </div>
              <div className="bus-rating">
                <div className="rating-stars"><FaStar /> 3.7</div>
                <div className="rating-reviews">203 reviews</div>
              </div>
            </div>

            {/* Bus Images */}
            <div className="bus-images">
              <div className="bus-image">
                <img src="https://via.placeholder.com/200x120/0066cc/ffffff?text=NAGASREE+EXPRESS" alt="Bus Front" />
              </div>
              <div className="bus-image">
                <img src="https://via.placeholder.com/200x120/0066cc/ffffff?text=NAGASREE+EXPRESS" alt="Bus Side" />
              </div>
              <div className="bus-image">
                <img src="https://via.placeholder.com/200x120/0066cc/ffffff?text=NAGASREE+EXPRESS" alt="Bus Rear" />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bus-tabs">
              <div className="tab active">Why book this bus?</div>
              <div className="tab">Bus route</div>
              <div className="tab">Boarding point</div>
              <div className="tab">Dropping point</div>
              <div className="tab">Rest stop</div>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Why book this bus? */}
              <div className="tab-panel active">
                <h3>Why book this bus?</h3>
                <div className="feature-cards">
                  <div className="feature-card">
                    <div className="feature-icon"><FaFemale /></div>
                    <div className="feature-text">Highly rated by women</div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon"><FaWifi /></div>
                    <div className="feature-content">
                      <div className="feature-title">Live Tracking</div>
                      <div className="feature-desc">You can now track your bus and plan your commute to the boarding...</div>
                    </div>
                    <div className="feature-arrow">▼</div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon"><FaTicketAlt /></div>
                    <div className="feature-content">
                      <div className="feature-title">Flexi Ticket</div>
                      <div className="feature-desc">Change your travel date for free up to 8 hours before the depature. Ge...</div>
                    </div>
                    <div className="feature-arrow">▼</div>
                  </div>
                </div>
              </div>

              {/* Bus route */}
              <div className="tab-panel">
                <h3>Bus route</h3>
                <div className="route-info">
                  <div className="route-duration">7 hr 15 min</div>
                  <div className="route-path">
                    {currentBus.from === 'Bangalore' && currentBus.to === 'Sringeri' 
                      ? 'Bangalore ▸▸ Chikmagalur ▸▸ Aldur ▸▸ Balehonnur ▸▸ Jayapura ▸▸ Sringeri'
                      : currentBus.from === 'Sringeri' && currentBus.to === 'Bangalore'
                      ? 'Sringeri ▸▸ Jayapura ▸▸ Balehonnur ▸▸ Aldur ▸▸ Chikmagalur ▸▸ Bangalore'
                      : `${currentBus.from} ▸▸ ${currentBus.to}`
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        {selectedSeats.length > 0 && (
          <div className="action-bar">
            <div className="selected-info">
              <span>Selected Seats: {selectedSeats.map(s => s.number).join(', ')}</span>
              <span className="total-amount">Total: ₹{getTotalAmount()}</span>
            </div>
            <button className="continue-btn" onClick={handleContinue}>
              Continue
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onLoginSuccess={handleLoginSuccess}
          onClose={handleLoginClose}
        />
      )}
    </div>
  );
};

export default SeatSelection;