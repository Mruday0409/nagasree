import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

// Component to handle navbar visibility
const AppContent = ({ bookingData, updateBookingData }) => {
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    // Initialize state from localStorage immediately
    return localStorage.getItem('nagasree_admin_logged_in') === 'true';
  });

  useEffect(() => {
    // Check if admin is logged in
    const checkAdminStatus = () => {
      const adminLoggedIn = localStorage.getItem('nagasree_admin_logged_in') === 'true';
      setIsAdminLoggedIn(adminLoggedIn);
    };

    // Initial check
    checkAdminStatus();

    // Listen for admin state changes
    const handleAdminStateChange = () => {
      checkAdminStatus();
    };

    // Listen for storage changes (in case of multiple tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'nagasree_admin_logged_in') {
        checkAdminStatus();
      }
    };

    window.addEventListener('adminStateChanged', handleAdminStateChange);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('adminStateChanged', handleAdminStateChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Show navbar unless we're on admin page AND admin is logged in
  const shouldShowNavbar = !(location.pathname === '/admin' && isAdminLoggedIn);

  return (
    <div className="App">
      {shouldShowNavbar && <Navbar />}
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
        <Route path="*" element={<Home bookingData={bookingData} updateBookingData={updateBookingData} />} />
      </Routes>
    </div>
  );
};

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

  const updateBookingData = (data) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  return (
    <Router>
      <AppContent bookingData={bookingData} updateBookingData={updateBookingData} />
    </Router>
  );
}

export default App;