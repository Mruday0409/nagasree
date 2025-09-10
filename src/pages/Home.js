import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBus } from 'react-icons/fa';
import BookingForm from '../components/BookingForm';
import OffersSection from '../components/OffersSection';
import WhatsNewSection from '../components/WhatsNewSection';
import LoginModal from '../components/LoginModal';
import './Home.css';

const Home = ({ bookingData, updateBookingData }) => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingSearch, setPendingSearch] = useState(null);

  const handleSearch = (searchData) => {
    // Allow search without login - login will be required later when selecting seats
    updateBookingData(searchData);
    navigate('/search');
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (pendingSearch) {
      updateBookingData(pendingSearch);
      navigate('/search');
      setPendingSearch(null);
    }
    // Dispatch a custom event to notify navbar about login state change
    window.dispatchEvent(new CustomEvent('loginStateChanged'));
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
    setPendingSearch(null);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                   online<br />
                  bus ticket booking site
                </h1>
                <p className="hero-subtitle">
                  Book your bus tickets easily and travel comfortably with Nagasree Travels
                </p>
              </div>
              
              <div className="hero-image">
                <div className="bus-illustration">
                  <FaBus />
                </div>
              </div>
            </div>
            
            <div className="booking-form-container">
              <BookingForm onSearch={handleSearch} initialData={bookingData} />
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <OffersSection />

      {/* What's New Section */}
      <WhatsNewSection />

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

export default Home;
