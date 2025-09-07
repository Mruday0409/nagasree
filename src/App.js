import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import SeatSelection from './pages/SeatSelection';
import PickupDrop from './pages/PickupDrop';
import PassengerInfo from './pages/PassengerInfo';
import Payment from './pages/Payment';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [bookingData, setBookingData] = useState({
    from: '',
    to: '',
    date: '',
    selectedBus: null,
    selectedSeats: [],
    pickup: '',
    drop: '',
    totalAmount: 0,
    isReturnTrip: false,
    returnJourney: null,
    returnSelectedBus: null,
    returnSelectedSeats: [],
    returnPickup: '',
    returnDrop: '',
    returnTotalAmount: 0
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem('nagasree_admin_logged_in') === 'true';
    setIsAdminLoggedIn(adminLoggedIn);

    // Listen for admin state changes
    const handleAdminStateChange = () => {
      const adminLoggedIn = localStorage.getItem('nagasree_admin_logged_in') === 'true';
      setIsAdminLoggedIn(adminLoggedIn);
    };

    window.addEventListener('adminStateChanged', handleAdminStateChange);
    
    return () => {
      window.removeEventListener('adminStateChanged', handleAdminStateChange);
    };
  }, []);

  const updateBookingData = (data) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  return (
    <Router>
      <div className="App">
        {!isAdminLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Home bookingData={bookingData} updateBookingData={updateBookingData} />} />
          <Route path="/search" element={<SearchResults bookingData={bookingData} updateBookingData={updateBookingData} />} />
          <Route path="/seats" element={<SeatSelection bookingData={bookingData} updateBookingData={updateBookingData} />} />
          <Route path="/return-search" element={<SearchResults bookingData={bookingData} updateBookingData={updateBookingData} isReturnJourney={true} />} />
          <Route path="/return-seats" element={<SeatSelection bookingData={bookingData} updateBookingData={updateBookingData} isReturnJourney={true} />} />
          <Route path="/pickup-drop" element={<PickupDrop bookingData={bookingData} updateBookingData={updateBookingData} />} />
          <Route path="/passenger-info" element={<PassengerInfo bookingData={bookingData} updateBookingData={updateBookingData} />} />
          <Route path="/payment" element={<Payment bookingData={bookingData} updateBookingData={updateBookingData} />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;