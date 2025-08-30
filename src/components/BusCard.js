import React, { useState } from 'react';
import './BusCard.css';

const BusCard = ({ bus, onSelect }) => {
  const [showDetails, setShowDetails] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="bus-card">
      <div className="bus-card-main">
        <div className="bus-info">
          <div className="bus-header">
            <h3 className="bus-name">{bus.name}</h3>
            <span className="bus-type">{bus.type}</span>
          </div>
          
          <div className="bus-timing">
            <div className="time-info">
              <span className="time">{bus.departureTime}</span>
              <span className="location">{bus.route.split(' → ')[0]}</span>
            </div>
            <div className="duration">
              <span className="duration-text">{bus.duration}</span>
              <div className="route-line">
                <div className="route-dot start"></div>
                <div className="route-path"></div>
                <div className="route-dot end"></div>
              </div>
            </div>
            <div className="time-info">
              <span className="time">{bus.arrivalTime}</span>
              <span className="location">{bus.route.split(' → ')[1]}</span>
            </div>
          </div>
        </div>

        <div className="bus-rating">
          <div className="rating-stars">
            {renderStars(bus.rating)}
          </div>
          <span className="rating-value">{bus.rating}</span>
        </div>

        <div className="bus-seats">
          <span className="seats-available">{bus.seatsAvailable} seats</span>
          <span className="seats-label">available</span>
        </div>

        <div className="bus-pricing">
          <div className="price">
            <span className="currency">₹</span>
            <span className="amount">{bus.price}</span>
          </div>
          <button className="select-seats-btn" onClick={onSelect}>
            Select Seats
          </button>
        </div>
      </div>

      <div className="bus-card-actions">
        <button 
          className="view-details-btn"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        <div className="bus-amenities">
          {bus.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="amenity-tag">
              {amenity}
            </span>
          ))}
          {bus.amenities.length > 3 && (
            <span className="amenity-more">
              +{bus.amenities.length - 3} more
            </span>
          )}
        </div>
      </div>

      {showDetails && (
        <div className="bus-details">
          <div className="details-section">
            <h4>Amenities</h4>
            <div className="amenities-list">
              {bus.amenities.map((amenity, index) => (
                <span key={index} className="amenity-item">
                  ✓ {amenity}
                </span>
              ))}
            </div>
          </div>
          
          <div className="details-section">
            <h4>Cancellation Policy</h4>
            <p className="policy-text">{bus.cancellationPolicy}</p>
          </div>
          
          <div className="details-section">
            <h4>Bus Operator</h4>
            <p className="operator-text">{bus.busOperator}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusCard;
