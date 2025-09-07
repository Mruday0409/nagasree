import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PassengerInfo.css';

const PassengerInfo = ({ bookingData, updateBookingData }) => {
  const navigate = useNavigate();
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({
    passengers: [],
    contact: {}
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Initialize passenger details based on selected seats
  React.useEffect(() => {
    if (bookingData.selectedSeats && bookingData.selectedSeats.length > 0) {
      const initialDetails = bookingData.selectedSeats.map((seatNumber, index) => ({
        name: '',
        age: '',
        gender: 'Male',
        seatNumber: seatNumber
      }));
      setPassengerDetails(initialDetails);
    }
  }, [bookingData.selectedSeats]);

  const handlePassengerChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index] = { ...updatedDetails[index], [field]: value };
    setPassengerDetails(updatedDetails);
    
    // Clear error for this field when user starts typing
    if (errors.passengers[index] && errors.passengers[index][field]) {
      const updatedErrors = [...errors.passengers];
      updatedErrors[index] = { ...updatedErrors[index] };
      delete updatedErrors[index][field];
      setErrors({ ...errors, passengers: updatedErrors });
    }
    
    // Clear success message when user starts editing
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const handleContactChange = (field, value) => {
    setContactDetails(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors.contact[field]) {
      const updatedContactErrors = { ...errors.contact };
      delete updatedContactErrors[field];
      setErrors({ ...errors, contact: updatedContactErrors });
    }
    
    // Clear success message when user starts editing
    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const handleContinue = () => {
    console.log('Validating passenger details:', passengerDetails);
    console.log('Validating contact details:', contactDetails);
    
    // Clear previous errors
    setErrors({ passengers: [], contact: {} });
    
    // Validate all passenger details
    const passengerErrors = [];
    passengerDetails.forEach((passenger, index) => {
      if (!passenger || !passenger.name || !passenger.name.trim()) {
        passengerErrors[index] = { ...passengerErrors[index], name: 'Name is required' };
      }
      if (!passenger || !passenger.age || passenger.age < 1 || passenger.age > 100) {
        passengerErrors[index] = { ...passengerErrors[index], age: 'Age must be between 1 and 100' };
      }
      if (!passenger || !passenger.gender) {
        passengerErrors[index] = { ...passengerErrors[index], gender: 'Gender is required' };
      }
    });

    // Validate contact details
    const contactErrors = {};
    if (!contactDetails.email.trim()) {
      contactErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDetails.email)) {
      contactErrors.email = 'Please enter a valid email address';
    }
    
    if (!contactDetails.phone.trim()) {
      contactErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(contactDetails.phone)) {
      contactErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Check if there are any errors
    if (passengerErrors.some(error => error && Object.keys(error).length > 0) || Object.keys(contactErrors).length > 0) {
      setErrors({ passengers: passengerErrors, contact: contactErrors });
      return;
    }

    // Clear all errors since validation passed
    setErrors({ passengers: [], contact: {} });

    // Ensure all passenger data is properly formatted
    const validatedPassengerDetails = passengerDetails.map(passenger => ({
      name: passenger.name.trim(),
      age: passenger.age,
      gender: passenger.gender,
      seatNumber: passenger.seatNumber
    }));

    const validatedContactDetails = {
      email: contactDetails.email.trim(),
      phone: contactDetails.phone.trim()
    };

    console.log('Saving validated data:', { validatedPassengerDetails, validatedContactDetails });
    console.log('Calling updateBookingData with:', { 
      passengerDetails: validatedPassengerDetails,
      contactDetails: validatedContactDetails
    });

    // Update booking data with passenger and contact details
    updateBookingData({ 
      passengerDetails: validatedPassengerDetails,
      contactDetails: validatedContactDetails
    });

    console.log('After updateBookingData call - navigating to payment');
    
    // Show success message
    setShowSuccess(true);
    
    // Navigate to payment page after a short delay to show success message
    setTimeout(() => {
      navigate('/payment');
    }, 1500);
  };

  const handleBack = () => {
    navigate('/pickup-drop');
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

  return (
    <div className="passenger-info">
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
            <div className="progress-step completed">
              <span className="step-number">2</span>
              <span className="step-text">Board/Drop point</span>
            </div>
            <div className="progress-step active">
              <span className="step-number">3</span>
              <span className="step-text">Passenger info</span>
            </div>
            <div className="progress-step">
              <span className="step-number">4</span>
              <span className="step-text">Payment</span>
            </div>
          </div>
        </div>

        <div className="passenger-info-content">
          {/* Journey Summary */}
          <div className="journey-summary">
            <div className="summary-header">
              <h3>Journey Summary</h3>
            </div>
            <div className="summary-details">
              <div className="summary-item">
                <span className="label">From:</span>
                <span className="value">{bookingData.pickup?.name} ({bookingData.pickup?.time})</span>
              </div>
              <div className="summary-item">
                <span className="label">To:</span>
                <span className="value">{bookingData.drop?.name} ({bookingData.drop?.time})</span>
              </div>
              <div className="summary-item">
                <span className="label">Bus:</span>
                <span className="value">{bookingData.selectedBus?.name}</span>
              </div>
              <div className="summary-item">
                <span className="label">Seats:</span>
                <span className="value">{bookingData.selectedSeats?.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Passenger Details Form */}
          <div className="passenger-form-section">
            <div className="section-header">
              <h3>👥 Passenger Details</h3>
              <p>Please provide details for all passengers. All fields marked with * are required.</p>
            </div>
            
            {/* Form Requirements Summary */}
            <div style={{ 
              background: '#e8f4fd', 
              border: '1px solid #bee5eb', 
              borderRadius: '8px', 
              padding: '15px', 
              marginBottom: '20px' 
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#0c5460' }}>📋 What you need to fill:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#0c5460' }}>
                <li><strong>Full Name:</strong> Enter the complete name as it appears on ID proof</li>
                <li><strong>Age:</strong> Must be between 1 and 100 years</li>
                <li><strong>Gender:</strong> Select from the dropdown</li>
                <li><strong>Contact Details:</strong> Email and phone number for booking confirmation</li>
              </ul>
            </div>

            {/* Error Summary */}
            {(errors.passengers.some(error => error && Object.keys(error).length > 0) || Object.keys(errors.contact).length > 0) && (
              <div style={{ 
                background: '#f8d7da', 
                border: '1px solid #f5c6cb', 
                borderRadius: '8px', 
                padding: '15px', 
                marginBottom: '20px' 
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#721c24' }}>⚠️ Please fix the following errors:</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#721c24' }}>
                  {errors.passengers.map((error, index) => {
                    if (error && Object.keys(error).length > 0) {
                      return Object.entries(error).map(([field, message]) => (
                        <li key={`${index}-${field}`}>
                          <strong>Passenger {index + 1} - {field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {message}
                        </li>
                      ));
                    }
                    return null;
                  })}
                  {Object.entries(errors.contact).map(([field, message]) => (
                    <li key={field}>
                      <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Success Message */}
            {showSuccess && (
              <div style={{ 
                background: '#d4edda', 
                border: '1px solid #c3e6cb', 
                borderRadius: '8px', 
                padding: '15px', 
                marginBottom: '20px' 
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#155724' }}>✅ All details are valid!</h4>
                <p style={{ margin: 0, color: '#155724' }}>
                  You can now proceed to the payment page.
                </p>
              </div>
            )}
            
            <div className="passengers-form">
              {passengerDetails.map((passenger, index) => (
                <div key={index} className="passenger-card">
                  <div className="passenger-header">
                    <h4>Passenger {index + 1}</h4>
                    <span className="seat-number">Seat: {passenger.seatNumber}</span>
                  </div>
                  
                  <div className="passenger-fields">
                    <div className="field-group">
                      <label>Full Name *</label>
                                             <input
                         type="text"
                         className={`form-control ${errors.passengers[index]?.name ? 'invalid' : passenger.name && passenger.name.trim() ? 'valid' : ''}`}
                         value={passenger.name}
                         onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                         placeholder="Enter full name"
                         required
                       />
                                             {errors.passengers[index]?.name && (
                         <small style={{ color: '#e74c3c', fontSize: '12px' }}>
                           {errors.passengers[index].name}
                         </small>
                       )}
                    </div>
                    
                    <div className="field-group">
                      <label>Age *</label>
                                             <input
                         type="number"
                         className={`form-control ${errors.passengers[index]?.age ? 'invalid' : passenger.age && passenger.age >= 1 && passenger.age <= 100 ? 'valid' : ''}`}
                         value={passenger.age}
                         onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                         placeholder="Age"
                         min="1"
                         max="100"
                         required
                       />
                                             {errors.passengers[index]?.age && (
                         <small style={{ color: '#e74c3c', fontSize: '12px' }}>
                           {errors.passengers[index].age}
                         </small>
                       )}
                    </div>
                    
                                         <div className="field-group">
                       <label>Gender *</label>
                       <select
                         className={`form-control ${errors.passengers[index]?.gender ? 'invalid' : ''}`}
                         value={passenger.gender}
                         onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                       >
                         <option value="Male">Male</option>
                         <option value="Female">Female</option>
                         <option value="Other">Other</option>
                       </select>
                       {errors.passengers[index]?.gender && (
                         <small style={{ color: '#e74c3c', fontSize: '12px' }}>
                           {errors.passengers[index].gender}
                         </small>
                       )}
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="contact-form-section">
            <div className="section-header">
              <h3>📧 Contact Details</h3>
              <p>We'll send booking confirmation to these details</p>
            </div>
            
            <div className="contact-form">
                             <div className="field-group">
                 <label>Email Address *</label>
                 <input
                   type="email"
                   className={`form-control ${errors.contact.email ? 'invalid' : ''}`}
                   value={contactDetails.email}
                   onChange={(e) => handleContactChange('email', e.target.value)}
                   placeholder="Enter email address"
                   required
                 />
                 {errors.contact.email && (
                   <small style={{ color: '#e74c3c', fontSize: '12px' }}>
                     {errors.contact.email}
                   </small>
                 )}
               </div>
              
                             <div className="field-group">
                 <label>Phone Number *</label>
                 <input
                   type="tel"
                   className={`form-control ${errors.contact.phone ? 'invalid' : ''}`}
                   value={contactDetails.phone}
                   onChange={(e) => handleContactChange('phone', e.target.value)}
                   placeholder="Enter 10-digit phone number"
                   maxLength="10"
                   required
                 />
                 {errors.contact.phone && (
                   <small style={{ color: '#e74c3c', fontSize: '12px' }}>
                     {errors.contact.phone}
                   </small>
                 )}
               </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={handleBack}>
              ← Back
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleContinue}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Continue to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
