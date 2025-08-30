import React from 'react';
import './OffersSection.css';

const OffersSection = () => {
  const offers = [
    {
      id: 1,
      title: 'FIRST50',
      description: 'Flat ₹50 off on your first booking',
      discount: '₹50 OFF',
      validTill: 'Valid till 31st Dec 2024',
      color: 'gradient-red'
    },
    {
      id: 2,
      title: 'WEEKEND25',
      description: 'Get 25% off on weekend bookings',
      discount: '25% OFF',
      validTill: 'Valid on weekends only',
      color: 'gradient-blue'
    },
    {
      id: 3,
      title: 'STUDENT15',
      description: 'Special discount for students',
      discount: '15% OFF',
      validTill: 'Valid with student ID',
      color: 'gradient-green'
    }
  ];

  return (
    <section className="offers-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Offers for You</h2>
          <p className="section-subtitle">Save more on your bus bookings</p>
        </div>
        
        <div className="offers-grid">
          {offers.map(offer => (
            <div key={offer.id} className={`offer-card ${offer.color}`}>
              <div className="offer-content">
                <div className="offer-badge">
                  <span className="offer-code">{offer.title}</span>
                </div>
                <div className="offer-details">
                  <h3 className="offer-discount">{offer.discount}</h3>
                  <p className="offer-description">{offer.description}</p>
                  <p className="offer-validity">{offer.validTill}</p>
                </div>
                <button className="offer-copy-btn">Copy Code</button>
              </div>
              <div className="offer-decoration">
                <div className="offer-icon">🎫</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
