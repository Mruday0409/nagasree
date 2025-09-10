import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaExclamationTriangle, 
  FaUsers, 
  FaEnvelope, 
  FaCreditCard, 
  FaMobile, 
  FaUniversity 
} from 'react-icons/fa';
import './Payment.css';

const Payment = ({ bookingData, updateBookingData }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  
  // Use passenger details from bookingData if available, otherwise initialize empty
  const [passengerDetails, setPassengerDetails] = useState(
    bookingData.passengerDetails || 
    bookingData.selectedSeats?.map(() => ({
      name: '',
      age: '',
      gender: 'Male'
    })) || []
  );
  
  // Use contact details from bookingData if available, otherwise initialize empty
  const [contactDetails, setContactDetails] = useState(
    bookingData.contactDetails || {
      email: '',
      phone: ''
    }
  );
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Sync local state with bookingData when it changes
  useEffect(() => {
    console.log('Payment page - bookingData received:', bookingData);
    console.log('Payment page - passengerDetails from bookingData:', bookingData.passengerDetails);
    console.log('Payment page - contactDetails from bookingData:', bookingData.contactDetails);
    
    if (bookingData.passengerDetails) {
      setPassengerDetails(bookingData.passengerDetails);
    }
    if (bookingData.contactDetails) {
      setContactDetails(bookingData.contactDetails);
    }
  }, [bookingData]);

  // const handlePassengerChange = (index, field, value) => {
  //   const updated = [...passengerDetails];
  //   updated[index] = { ...updated[index], [field]: value };
  //   setPassengerDetails(updated);
  // };

  // const handleContactChange = (field, value) => {
  //   setContactDetails(prev => ({ ...prev, [field]: value }));
  // };

  const validateForm = () => {
    // Check if passenger details exist
    if (!passengerDetails || passengerDetails.length === 0) {
      alert('No passenger details found. Please go back to passenger info page and fill the details.');
      return false;
    }

    // Validate passenger details
    for (let i = 0; i < passengerDetails.length; i++) {
      const passenger = passengerDetails[i];
      if (!passenger || !passenger.name || !passenger.name.trim()) {
        alert(`Please enter a valid name for passenger ${i + 1}`);
        return false;
      }
      if (!passenger.age || passenger.age < 1 || passenger.age > 100) {
        alert(`Please enter a valid age (1-100) for passenger ${i + 1}`);
        return false;
      }
      if (!passenger.gender) {
        alert(`Please select gender for passenger ${i + 1}`);
        return false;
      }
    }

    // Validate contact details
    if (!contactDetails.email.trim() || !contactDetails.phone.trim()) {
      alert('Please fill in contact details');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactDetails.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(contactDetails.phone)) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return false;
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment Successful! You will receive your ticket to your email.');
      navigate('/');
    }, 3000);
  };

  // If no booking data, provide default data instead of redirecting
  if (!bookingData || !bookingData.selectedBus || !bookingData.selectedSeats?.length || !bookingData.pickup || !bookingData.drop) {
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
    if (!bookingData.pickup) {
      bookingData.pickup = {
        name: 'Gottigere',
        time: '20:15',
        address: 'GOTTIERE (bundland)'
      };
    }
    if (!bookingData.drop) {
      bookingData.drop = {
        name: 'Sringeri',
        time: '05:30',
        address: 'BUS STAND'
      };
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="payment">
      <div className="container">
        {/* Header - Progress Steps */}
        <div className="selection-header">
          <div className="bus-service-info-container">
            <div className="bus-service-info">
              <h1 className="bus-service-name">{bookingData.selectedBus.name}</h1>
              <p className="bus-route">{bookingData.from} → {bookingData.to}</p>
            </div>
          </div>
          <div className="booking-progress progress-steps-container">
            <div className="progress-step completed">
              <span className="step-number">1</span>
              <span className="step-text">Select seats</span>
            </div>
            <div className="progress-step completed">
              <span className="step-number">2</span>
              <span className="step-text">Board/Drop point</span>
            </div>
            <div className="progress-step completed">
              <span className="step-number">3</span>
              <span className="step-text">Passenger info</span>
            </div>
            <div className="progress-step active">
              <span className="step-number">4</span>
              <span className="step-text">Payment</span>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/passenger-info')}
            style={{ padding: '10px 20px' }}
          >
            ← Back to Passenger Info
          </button>
        </div>

        <div className="payment-content">
          {/* Warning Banner if no passenger details */}
          {(!passengerDetails || passengerDetails.length === 0) && (
            <div className="payment-section" style={{ 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7',
              borderLeft: '4px solid #f39c12'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}><FaExclamationTriangle /></span>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#856404' }}>Missing Passenger Information</h4>
                  <p style={{ margin: 0, color: '#856404' }}>
                    You need to fill in passenger details before proceeding to payment. 
                    Please go back to the passenger info page.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Passenger Summary */}
          <div className="payment-section">
            <div className="section-header">
              <h3><FaUsers /> Passenger Summary</h3>
              <p>Review passenger details before payment</p>
            </div>
            
            <div className="passenger-summary">
              {passengerDetails && passengerDetails.length > 0 ? (
                passengerDetails.map((passenger, index) => {
                  // Validate passenger data before rendering
                  if (!passenger || !passenger.name || !passenger.age || !passenger.gender) {
                    return (
                      <div key={index} className="passenger-summary-card error">
                        <div className="passenger-summary-header">
                          <h4>Passenger {index + 1}</h4>
                          <span className="seat-number">Seat: {passenger?.seatNumber || 'Unknown'}</span>
                        </div>
                        <div className="passenger-summary-details error">
                          <span className="error-message"><FaExclamationTriangle /> Incomplete passenger details</span>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div key={index} className="passenger-summary-card">
                      <div className="passenger-summary-header">
                        <h4>Passenger {index + 1}</h4>
                        <span className="seat-number">Seat: {passenger.seatNumber}</span>
                      </div>
                      <div className="passenger-summary-details">
                        <span><strong>Name:</strong> {passenger.name}</span>
                        <span><strong>Age:</strong> {passenger.age}</span>
                        <span><strong>Gender:</strong> {passenger.gender}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="passenger-summary-card error">
                  <div className="passenger-summary-header">
                    <h4><FaExclamationTriangle /> No Passenger Details Found</h4>
                  </div>
                  <div className="passenger-summary-details error">
                    <span className="error-message">
                      Passenger details are missing. Please go back to the passenger info page and fill in all required details.
                    </span>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => navigate('/passenger-info')}
                      style={{ marginTop: '15px' }}
                    >
                      ← Go Back to Passenger Info
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Summary */}
          <div className="payment-section">
            <div className="section-header">
              <h3><FaEnvelope /> Contact Summary</h3>
              <p>Review contact details before payment</p>
            </div>
            
            <div className="contact-summary">
              {contactDetails && contactDetails.email && contactDetails.phone ? (
                <>
                  <div className="contact-summary-item">
                    <span><strong>Email:</strong> {contactDetails.email}</span>
                  </div>
                  <div className="contact-summary-item">
                    <span><strong>Phone:</strong> {contactDetails.phone}</span>
                  </div>
                </>
              ) : (
                <div className="contact-summary-item error">
                  <span className="error-message"><FaExclamationTriangle /> Contact details not found. Please go back to complete contact information.</span>
                  <button className="btn btn-secondary" onClick={() => navigate('/passenger-info')}>
                    ← Back to Passenger Info
                  </button>
                </div>
              )}
            </div>
          </div>



          {/* Payment Methods */}
          <div className="payment-section">
            <div className="section-header">
              <h3><FaCreditCard /> Payment Method</h3>
              <p>Choose your preferred payment method</p>
            </div>
            
            <div className="payment-methods">
              <div 
                className={`payment-method ${paymentMethod === 'upi' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="method-info">
                  <div className="method-icon"><FaMobile /></div>
                  <div className="method-details">
                    <h4>UPI</h4>
                    <p>Pay using Google Pay, PhonePe, Paytm</p>
                  </div>
                </div>
                <div className="method-selector">
                  <div className={`radio-button ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                    {paymentMethod === 'upi' && <div className="radio-dot"></div>}
                  </div>
                </div>
              </div>

              <div 
                className={`payment-method ${paymentMethod === 'card' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="method-info">
                  <div className="method-icon"><FaCreditCard /></div>
                  <div className="method-details">
                    <h4>Credit/Debit Card</h4>
                    <p>Visa, Mastercard, RuPay cards accepted</p>
                  </div>
                </div>
                <div className="method-selector">
                  <div className={`radio-button ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    {paymentMethod === 'card' && <div className="radio-dot"></div>}
                  </div>
                </div>
              </div>

              <div 
                className={`payment-method ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('netbanking')}
              >
                <div className="method-info">
                  <div className="method-icon"><FaUniversity /></div>
                  <div className="method-details">
                    <h4>Net Banking</h4>
                    <p>All major banks supported</p>
                  </div>
                </div>
                <div className="method-selector">
                  <div className={`radio-button ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                    {paymentMethod === 'netbanking' && <div className="radio-dot"></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            
            <div className="summary-section">
              <h4>Onward Journey Details</h4>
              <div className="summary-item">
                <span>Bus:</span>
                <span>{bookingData.selectedBus.name}</span>
              </div>
              <div className="summary-item">
                <span>Route:</span>
                <span>{bookingData.from} → {bookingData.to}</span>
              </div>
              <div className="summary-item">
                <span>Date:</span>
                <span>{formatDate(bookingData.date)}</span>
              </div>
              <div className="summary-item">
                <span>Seats:</span>
                <span>{bookingData.selectedSeats.join(', ')}</span>
              </div>
            </div>

            {bookingData.isReturnTrip && bookingData.returnSelectedBus && (
              <div className="summary-section">
                <h4>Return Journey Details</h4>
                <div className="summary-item">
                  <span>Bus:</span>
                  <span>{bookingData.returnSelectedBus.name}</span>
                </div>
                <div className="summary-item">
                  <span>Route:</span>
                  <span>{bookingData.returnJourney?.from} → {bookingData.returnJourney?.to}</span>
                </div>
                <div className="summary-item">
                  <span>Date:</span>
                  <span>{formatDate(bookingData.returnJourney?.date)}</span>
                </div>
                <div className="summary-item">
                  <span>Seats:</span>
                  <span>{bookingData.returnSelectedSeats?.join(', ')}</span>
                </div>
              </div>
            )}

            <div className="summary-section">
              <h4>Pickup & Drop</h4>
              <div className="pickup-drop-info">
                <div className="pickup-info">
                  <strong>Pickup:</strong> {bookingData.pickup.name}
                  <span className="time">{bookingData.pickup.time}</span>
                </div>
                <div className="drop-info">
                  <strong>Drop:</strong> {bookingData.drop.name}
                  <span className="time">{bookingData.drop.time}</span>
                </div>
              </div>
            </div>

            <div className="summary-section">
              <div className="fare-breakdown">
                <div className="fare-item">
                  <span>Onward Fare ({bookingData.selectedSeats.length} seats)</span>
                  <span>₹{bookingData.totalAmount}</span>
                </div>
                {bookingData.isReturnTrip && bookingData.returnTotalAmount > 0 && (
                  <div className="fare-item">
                    <span>Return Fare ({bookingData.returnSelectedSeats?.length} seats)</span>
                    <span>₹{bookingData.returnTotalAmount}</span>
                  </div>
                )}
                <div className="fare-item">
                  <span>Taxes & Fees</span>
                  <span>₹0</span>
                </div>
                <div className="fare-total">
                  <span>Total Amount</span>
                  <span>₹{bookingData.totalAmount + (bookingData.returnTotalAmount || 0)}</span>
                </div>
              </div>
            </div>

            <button 
              className="pay-now-btn"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${bookingData.totalAmount + (bookingData.returnTotalAmount || 0)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
