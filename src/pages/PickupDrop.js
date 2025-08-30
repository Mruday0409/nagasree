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

  // Sample pickup and drop points - matching the image exactly
  const getPickupPoints = () => {
    return [
      { id: 'bp1', time: '20:15', name: 'Gottigere', address: 'GOTTIERE (bundland)', date: '28 Aug' },
      { id: 'bp2', time: '20:30', name: 'Bilekahalli', address: 'BELEKAVALLI', date: '28 Aug' },
      { id: 'bp3', time: '21:00', name: 'Jayanagar', address: '24th main road bus car showroom', date: '28 Aug' },
      { id: 'bp4', time: '22:30', name: 'Majestic (Kempegowda Bus Station)', address: 'PV Nursing college opp bus shop', date: '28 Aug' },
      { id: 'bp5', time: '23:15', name: 'Nelamangala', address: 'Private Bus Stop', date: '28 Aug' },
    ];
  };

  const getDropPoints = () => {
    return [
      { id: 'dp1', time: '05:30', name: 'Sringeri', address: 'BUS STAND', date: '29 Aug' },
    ];
  };

  const pickupPoints = getPickupPoints();
  const dropPoints = getDropPoints();

  const handleContinue = () => {
    console.log('handleContinue called', { selectedPickup, selectedDrop, currentStep });
    
    if (currentStep === 'onward') {
      if (!selectedPickup || !selectedDrop) {
        alert('Please select both pickup and drop points for onward journey');
        return;
      }
      
      const pickup = pickupPoints.find(p => p.id === selectedPickup);
      const drop = dropPoints.find(d => d.id === selectedDrop);
      
      console.log('Found pickup and drop:', { pickup, drop });
      
      updateBookingData({ 
        pickup: pickup,
        drop: drop
      });

      // If return trip, move to return journey selection
      if (bookingData.isReturnTrip && bookingData.returnSelectedBus) {
        setCurrentStep('return');
      } else {
        console.log('Navigating to passenger-info');
        navigate('/passenger-info');
      }
    } else if (currentStep === 'return') {
      if (!selectedReturnPickup || !selectedReturnDrop) {
        alert('Please select both pickup and drop points for return journey');
        return;
      }
      
      const returnPickup = getReturnPickupPoints().find(p => p.id === selectedReturnPickup);
      const returnDrop = getReturnDropPoints().find(d => d.id === selectedReturnDrop);
      
      updateBookingData({ 
        returnPickup: returnPickup,
        returnDrop: returnDrop
      });
      navigate('/passenger-info');
    }
  };

  const getReturnPickupPoints = () => {
    if (bookingData.returnJourney?.from === 'Bangalore') {
      return [
        {
          id: 'blr1',
          name: 'Nayandanahalli',
          time: '21:30',
          address: 'Nayandanahalli Metro Station',
          landmark: 'Near Metro Station'
        },
        {
          id: 'blr2',
          name: 'Kamakya',
          time: '21:45',
          address: 'Kamakya Junction',
          landmark: 'Main Road Junction'
        },
        {
          id: 'blr3',
          name: 'Sarakki',
          time: '22:00',
          address: 'Sarakki Industrial Area',
          landmark: 'Industrial Area'
        },
        {
          id: 'blr4',
          name: 'Banashankari',
          time: '22:15',
          address: 'Banashankari Bus Stand',
          landmark: 'Near Temple'
        },
        {
          id: 'blr5',
          name: 'Jainagar 4th',
          time: '22:30',
          address: 'Jainagar 4th Block',
          landmark: 'Near Shopping Complex'
        },
        {
          id: 'blr6',
          name: 'Silk Board',
          time: '22:45',
          address: 'Silk Board Junction',
          landmark: 'Near Forum Mall'
        },
        {
          id: 'blr7',
          name: 'Madiwala',
          time: '23:00',
          address: 'Madiwala Market',
          landmark: 'Near Market'
        },
        {
          id: 'blr8',
          name: 'Wilson Garden',
          time: '23:15',
          address: 'Wilson Garden Main Road',
          landmark: 'Main Road'
        },
        {
          id: 'blr9',
          name: 'Majestic',
          time: '23:30',
          address: 'Kempegowda Bus Station',
          landmark: 'City Railway Station'
        },
        {
          id: 'blr10',
          name: 'Rajajinagar',
          time: '23:45',
          address: 'Rajajinagar Main Road',
          landmark: 'Near Market'
        },
        {
          id: 'blr11',
          name: 'Yeshwantpur',
          time: '00:00',
          address: 'Yeshwantpur Junction',
          landmark: 'Railway Station'
        }
      ];
    } else if (bookingData.returnJourney?.from === 'Sringeri') {
      return [
        {
          id: 'sri1',
          name: 'Sringeri',
          time: '14:00',
          address: 'Sringeri Bus Stand',
          landmark: 'Near Sharada Temple'
        },
        {
          id: 'sri2',
          name: 'Kammaradi',
          time: '14:15',
          address: 'Kammaradi Village',
          landmark: 'Village Center'
        },
        {
          id: 'sri3',
          name: 'Heggodu',
          time: '14:30',
          address: 'Heggodu Junction',
          landmark: 'Main Road'
        },
        {
          id: 'sri4',
          name: 'Kalmane',
          time: '14:45',
          address: 'Kalmane Bus Stop',
          landmark: 'Highway Junction'
        },
        {
          id: 'sri5',
          name: 'Thirthahalli',
          time: '15:00',
          address: 'Thirthahalli Bus Stand',
          landmark: 'Town Center'
        }
      ];
    }
    return [];
  };

  const getReturnDropPoints = () => {
    if (bookingData.returnJourney?.to === 'Sringeri') {
      return [
        {
          id: 'sri1',
          name: 'Thirthahalli',
          time: '05:30',
          address: 'Thirthahalli Bus Stand',
          landmark: 'Town Center'
        },
        {
          id: 'sri2',
          name: 'Kalmane',
          time: '05:45',
          address: 'Kalmane Bus Stop',
          landmark: 'Highway Junction'
        },
        {
          id: 'sri3',
          name: 'Heggodu',
          time: '06:00',
          address: 'Heggodu Junction',
          landmark: 'Main Road'
        },
        {
          id: 'sri4',
          name: 'Kammaradi',
          time: '06:15',
          address: 'Kammaradi Village',
          landmark: 'Village Center'
        },
        {
          id: 'sri5',
          name: 'Sringeri',
          time: '06:30',
          address: 'Sringeri Bus Stand',
          landmark: 'Near Sharada Temple'
        }
      ];
    } else if (bookingData.returnJourney?.to === 'Bangalore') {
      return [
        {
          id: 'blr1',
          name: 'Yeshwantpur',
          time: '14:30',
          address: 'Yeshwantpur Junction',
          landmark: 'Railway Station'
        },
        {
          id: 'blr2',
          name: 'Rajajinagar',
          time: '14:45',
          address: 'Rajajinagar Main Road',
          landmark: 'Near Market'
        },
        {
          id: 'blr3',
          name: 'Majestic',
          time: '15:00',
          address: 'Kempegowda Bus Station',
          landmark: 'City Railway Station'
        },
        {
          id: 'blr4',
          name: 'Wilson Garden',
          time: '15:15',
          address: 'Wilson Garden Main Road',
          landmark: 'Main Road'
        },
        {
          id: 'blr5',
          name: 'Madiwala',
          time: '15:30',
          address: 'Madiwala Market',
          landmark: 'Near Market'
        },
        {
          id: 'blr6',
          name: 'Silk Board',
          time: '15:45',
          address: 'Silk Board Junction',
          landmark: 'Near Forum Mall'
        },
        {
          id: 'blr7',
          name: 'Jainagar 4th',
          time: '16:00',
          address: 'Jainagar 4th Block',
          landmark: 'Near Shopping Complex'
        },
        {
          id: 'blr8',
          name: 'Banashankari',
          time: '16:15',
          address: 'Banashankari Bus Stand',
          landmark: 'Near Temple'
        },
        {
          id: 'blr9',
          name: 'Sarakki',
          time: '16:30',
          address: 'Sarakki Industrial Area',
          landmark: 'Industrial Area'
        },
        {
          id: 'blr10',
          name: 'Kamakya',
          time: '16:45',
          address: 'Kamakya Junction',
          landmark: 'Main Road Junction'
        },
        {
          id: 'blr11',
          name: 'Nayandanahalli',
          time: '17:00',
          address: 'Nayandanahalli Metro Station',
          landmark: 'Near Metro Station'
        }
      ];
    }
    return [];
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
        from: 'Bangalore',
        to: 'Sringeri',
        date: '31 Aug',
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
              <h1 className="bus-service-name">Nagasree Express</h1>
              <p className="bus-route">Bangalore — Sringeri</p>
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
          {/* Boarding Points */}
          <div className="points-section">
            <div className="points-header">
              <h3>Boarding points</h3>
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

          {/* Dropping Points */}
          <div className="points-section">
            <div className="points-header">
              <h3>Dropping points</h3>
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
