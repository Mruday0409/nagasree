import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PickupDrop.css';

const PickupDrop = ({ bookingData, updateBookingData }) => {
  const navigate = useNavigate();
  const [selectedPickup, setSelectedPickup] = useState('');
  const [selectedDrop, setSelectedDrop] = useState('dp1'); // Default to first drop point
  const [selectedReturnPickup, setSelectedReturnPickup] = useState('');
  const [selectedReturnDrop, setSelectedReturnDrop] = useState('');
  const [currentStep, setCurrentStep] = useState('onward'); // 'onward' or 'return'

  // Dynamic pickup and drop points based on route direction
  const getPickupPoints = (from, to) => {
    if (from === 'Bangalore' && to === 'Sringeri') {
      return [
        { id: 'bp1', time: '20:15', name: 'Nayandanahalli', address: 'Nayandanahalli Bus Stop', date: '28 Aug' },
        { id: 'bp2', time: '20:30', name: 'Kamakya', address: 'Kamakya Bus Stop', date: '28 Aug' },
        { id: 'bp3', time: '20:45', name: 'Sarakki', address: 'Sarakki Bus Stop', date: '28 Aug' },
        { id: 'bp4', time: '21:00', name: 'Banashankari', address: 'Banashankari Bus Stop', date: '28 Aug' },
        { id: 'bp5', time: '21:15', name: 'Jayanagar 4th Block', address: 'Jayanagar 4th Block Bus Stop', date: '28 Aug' },
        { id: 'bp6', time: '21:30', name: 'Silk Board', address: 'Silk Board Bus Stop', date: '28 Aug' },
        { id: 'bp7', time: '21:45', name: 'Madiwala', address: 'Madiwala Bus Stop', date: '28 Aug' },
        { id: 'bp8', time: '22:00', name: 'Wilson Garden', address: 'Wilson Garden Bus Stop', date: '28 Aug' },
        { id: 'bp9', time: '22:30', name: 'Majestic (Kempegowda Bus Station)', address: 'Majestic Bus Station', date: '28 Aug' },
        { id: 'bp10', time: '22:45', name: 'Rajajinagar', address: 'Rajajinagar Bus Stop', date: '28 Aug' },
        { id: 'bp11', time: '23:15', name: 'Yesvantpur', address: 'Yesvantpur Bus Stop', date: '28 Aug' },
      ];
    } else if (from === 'Sringeri' && to === 'Bangalore') {
      return [
        { id: 'bp1', time: '20:15', name: 'Sringeri', address: 'Sringeri Bus Stand', date: '28 Aug' },
        { id: 'bp2', time: '20:30', name: 'Kammaradi', address: 'Kammaradi Bus Stop', date: '28 Aug' },
        { id: 'bp3', time: '20:45', name: 'Heggodu', address: 'Heggodu Bus Stop', date: '28 Aug' },
        { id: 'bp4', time: '21:00', name: 'Kalmane', address: 'Kalmane Bus Stop', date: '28 Aug' },
        { id: 'bp5', time: '21:15', name: 'Thirthahalli', address: 'Thirthahalli Bus Stop', date: '28 Aug' },
      ];
    }
    return [];
  };

  const getDropPoints = (from, to) => {
    if (from === 'Bangalore' && to === 'Sringeri') {
      return [
        { id: 'dp1', time: '05:30', name: 'Sringeri', address: 'Sringeri Bus Stand', date: '29 Aug' },
        { id: 'dp2', time: '05:45', name: 'Kammaradi', address: 'Kammaradi Bus Stop', date: '29 Aug' },
        { id: 'dp3', time: '06:00', name: 'Heggodu', address: 'Heggodu Bus Stop', date: '29 Aug' },
        { id: 'dp4', time: '06:15', name: 'Kalmane', address: 'Kalmane Bus Stop', date: '29 Aug' },
        { id: 'dp5', time: '06:30', name: 'Thirthahalli', address: 'Thirthahalli Bus Stop', date: '29 Aug' },
      ];
    } else if (from === 'Sringeri' && to === 'Bangalore') {
      return [
        { id: 'dp1', time: '05:30', name: 'Yesvantpur', address: 'Yesvantpur Bus Stop', date: '29 Aug' },
        { id: 'dp2', time: '05:45', name: 'Rajajinagar', address: 'Rajajinagar Bus Stop', date: '29 Aug' },
        { id: 'dp3', time: '06:00', name: 'Majestic (Kempegowda Bus Station)', address: 'Majestic Bus Station', date: '29 Aug' },
        { id: 'dp4', time: '06:15', name: 'Wilson Garden', address: 'Wilson Garden Bus Stop', date: '29 Aug' },
        { id: 'dp5', time: '06:30', name: 'Madiwala', address: 'Madiwala Bus Stop', date: '29 Aug' },
        { id: 'dp6', time: '06:45', name: 'Silk Board', address: 'Silk Board Bus Stop', date: '29 Aug' },
        { id: 'dp7', time: '07:00', name: 'Jayanagar 4th Block', address: 'Jayanagar 4th Block Bus Stop', date: '29 Aug' },
        { id: 'dp8', time: '07:15', name: 'Banashankari', address: 'Banashankari Bus Stop', date: '29 Aug' },
        { id: 'dp9', time: '07:30', name: 'Sarakki', address: 'Sarakki Bus Stop', date: '29 Aug' },
        { id: 'dp10', time: '07:45', name: 'Kamakya', address: 'Kamakya Bus Stop', date: '29 Aug' },
        { id: 'dp11', time: '08:00', name: 'Nayandanahalli', address: 'Nayandanahalli Bus Stop', date: '29 Aug' },
      ];
    }
    return [];
  };

  // Get current route information
  const onwardFrom = bookingData?.selectedBus?.from || bookingData?.from || 'Bangalore';
  const onwardTo = bookingData?.selectedBus?.to || bookingData?.to || 'Sringeri';
  
  // For return journey, swap the from and to
  const returnFrom = bookingData?.returnSelectedBus?.from || bookingData?.returnJourney?.from || 'Sringeri';
  const returnTo = bookingData?.returnSelectedBus?.to || bookingData?.returnJourney?.to || 'Bangalore';
  
  // Get points based on current step
  const currentFrom = currentStep === 'onward' ? onwardFrom : returnFrom;
  const currentTo = currentStep === 'onward' ? onwardTo : returnTo;
  
  const pickupPoints = getPickupPoints(currentFrom, currentTo);
  const dropPoints = getDropPoints(currentFrom, currentTo);

  const handleContinue = () => {
    
    if (currentStep === 'onward') {
      if (!selectedPickup || !selectedDrop) {
        alert('Please select both pickup and drop points for onward journey');
        return;
      }
      
      const pickup = pickupPoints.find(p => p.id === selectedPickup);
      const drop = dropPoints.find(d => d.id === selectedDrop);
      
      updateBookingData({ 
        pickup: pickup,
        drop: drop
      });

      // If return trip, move to return journey selection
      if (bookingData.isReturnTrip && bookingData.returnSelectedBus) {
        setCurrentStep('return');
      } else {
        navigate('/passenger-info');
      }
    } else if (currentStep === 'return') {
      if (!selectedReturnPickup || !selectedReturnDrop) {
        alert('Please select both pickup and drop points for return journey');
        return;
      }
      
      const returnFrom = bookingData?.returnSelectedBus?.from || bookingData?.returnJourney?.from || 'Sringeri';
      const returnTo = bookingData?.returnSelectedBus?.to || bookingData?.returnJourney?.to || 'Bangalore';
      const returnPickup = getPickupPoints(returnFrom, returnTo).find(p => p.id === selectedReturnPickup);
      const returnDrop = getDropPoints(returnFrom, returnTo).find(d => d.id === selectedReturnDrop);
      
      updateBookingData({ 
        returnPickup: returnPickup,
        returnDrop: returnDrop
      });
      navigate('/passenger-info');
    }
  };


  // If no booking data, provide default data instead of redirecting
  if (!bookingData || !bookingData.selectedBus || !bookingData.selectedSeats?.length) {
    // Use default data to prevent crashes on reload
    if (!bookingData) {
      bookingData = {};
    }
    if (!bookingData.selectedBus) {
      bookingData.selectedBus = {
        name: 'Nagasree Express',
        from: bookingData?.from || 'Bangalore',
        to: bookingData?.to || 'Sringeri',
        date: bookingData?.date ? new Date(bookingData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }) : '31 Aug',
        rating: '3.7',
        reviews: '203'
      };
    }
    if (!bookingData.selectedSeats) {
      bookingData.selectedSeats = ['L1', 'L2']; // Default seats
    }
  }

  return (
    <div className="pickup-drop">
      <div className="container">
        {/* Header - Progress Steps */}
        <div className="selection-header">
          <div className="bus-service-info-container">
            <div className="bus-service-info">
              <h1 className="bus-service-name">{bookingData.selectedBus.name}</h1>
              <p className="bus-route">{bookingData.selectedBus.from} — {bookingData.selectedBus.to}</p>
            </div>
          </div>
          <div className="booking-progress progress-steps-container">
            <div className="progress-step completed">
              <span className="step-number">1</span>
              <span className="step-text">Select seats</span>
            </div>
            <div className="progress-step active">
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

        {/* Back Button */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/seats')}
            style={{ padding: '10px 20px' }}
          >
            ← Back to Seat Selection
          </button>
        </div>

        <div className="pickup-drop-content">
          {currentStep === 'onward' ? (
            <>
              {/* Onward Journey - Boarding Points */}
              <div className="points-section">
                <div className="points-header">
                  <h3>Boarding points - {currentFrom} to {currentTo}</h3>
                  <p>Select Boarding Point</p>
                </div>
                
                <div className="points-list">
                  {pickupPoints.map(point => (
                    <div 
                      key={point.id}
                      className={`point-card ${selectedPickup === point.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPickup(point.id)}
                    >
                      <div className="point-time">
                        <div className="time">{point.time}</div>
                      </div>
                      <div className="point-details">
                        <div className="point-name">{point.name}</div>
                        <div className="point-address">{point.address}</div>
                      </div>
                      <div className="point-radio">
                        <input 
                          type="radio" 
                          name="boarding" 
                          checked={selectedPickup === point.id}
                          onChange={() => setSelectedPickup(point.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Onward Journey - Dropping Points */}
              <div className="points-section">
                <div className="points-header">
                  <h3>Dropping points - {currentFrom} to {currentTo}</h3>
                </div>
                
                <div className="points-list">
                  {dropPoints.map(point => (
                    <div 
                      key={point.id}
                      className={`point-card ${selectedDrop === point.id ? 'selected' : ''}`}
                      onClick={() => setSelectedDrop(point.id)}
                    >
                      <div className="point-time">
                        <div className="time">{point.time}</div>
                      </div>
                      <div className="point-details">
                        <div className="point-name">{point.name}</div>
                        <div className="point-address">{point.address}</div>
                      </div>
                      <div className="point-radio">
                        <input 
                          type="radio" 
                          name="dropping" 
                          checked={selectedDrop === point.id}
                          onChange={() => setSelectedDrop(point.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Return Journey - Boarding Points */}
              <div className="points-section">
                <div className="points-header">
                  <h3>Return Journey - Boarding points - {currentFrom} to {currentTo}</h3>
                  <p>Select Boarding Point</p>
                </div>
                
                <div className="points-list">
                  {pickupPoints.map(point => (
                    <div 
                      key={point.id}
                      className={`point-card ${selectedReturnPickup === point.id ? 'selected' : ''}`}
                      onClick={() => setSelectedReturnPickup(point.id)}
                    >
                      <div className="point-time">
                        <div className="time">{point.time}</div>
                      </div>
                      <div className="point-details">
                        <div className="point-name">{point.name}</div>
                        <div className="point-address">{point.address}</div>
                      </div>
                      <div className="point-radio">
                        <input 
                          type="radio" 
                          name="return-boarding" 
                          checked={selectedReturnPickup === point.id}
                          onChange={() => setSelectedReturnPickup(point.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Return Journey - Dropping Points */}
              <div className="points-section">
                <div className="points-header">
                  <h3>Return Journey - Dropping points - {currentFrom} to {currentTo}</h3>
                </div>
                
                <div className="points-list">
                  {dropPoints.map(point => (
                    <div 
                      key={point.id}
                      className={`point-card ${selectedReturnDrop === point.id ? 'selected' : ''}`}
                      onClick={() => setSelectedReturnDrop(point.id)}
                    >
                      <div className="point-time">
                        <div className="time">{point.time}</div>
                      </div>
                      <div className="point-details">
                        <div className="point-name">{point.name}</div>
                        <div className="point-address">{point.address}</div>
                      </div>
                      <div className="point-radio">
                        <input 
                          type="radio" 
                          name="return-dropping" 
                          checked={selectedReturnDrop === point.id}
                          onChange={() => setSelectedReturnDrop(point.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Booking Summary */}
        <div className="pickup-drop-summary">
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            
            <div className="summary-section">
              <h4>Journey Details</h4>
              <div className="summary-item">
                <span>Bus:</span>
                <span>{bookingData.selectedBus.name}</span>
              </div>
              <div className="summary-item">
                <span>Route:</span>
                <span>{bookingData.from} → {bookingData.to}</span>
              </div>
              <div className="summary-item">
                <span>Seats:</span>
                <span>{bookingData.selectedSeats.join(', ')}</span>
              </div>
            </div>

            {selectedPickup && (
              <div className="summary-section">
                <h4>Pickup Point</h4>
                <div className="selected-point">
                  <strong>{pickupPoints.find(p => p.id === selectedPickup)?.name}</strong>
                  <span className="selected-time">{pickupPoints.find(p => p.id === selectedPickup)?.time}</span>
                </div>
              </div>
            )}

            {selectedDrop && (
              <div className="summary-section">
                <h4>Drop Point</h4>
                <div className="selected-point">
                  <strong>{dropPoints.find(d => d.id === selectedDrop)?.name}</strong>
                  <span className="selected-time">{dropPoints.find(d => d.id === selectedDrop)?.time}</span>
                </div>
              </div>
            )}

            <div className="summary-section">
              <div className="fare-total">
                <span>Total Amount</span>
                <span>₹{bookingData.totalAmount}</span>
              </div>
            </div>

            <button 
              className="continue-btn"
              onClick={handleContinue}
              disabled={
                currentStep === 'onward' 
                  ? !selectedPickup || !selectedDrop
                  : !selectedReturnPickup || !selectedReturnDrop
              }
            >
              {currentStep === 'return' ? 'Continue to passanger info' : 
               (bookingData.isReturnTrip && bookingData.returnSelectedBus ? 'Continue to Return Journey' : 'Continue to passanger info')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupDrop;
