import React, { useState } from 'react';
import './Help.css';

const Help = () => {
  const [activeSection, setActiveSection] = useState('faq');

  const faqs = [
    {
      question: 'How do I book a bus ticket?',
      answer: 'Select your departure and destination cities, choose your travel date, pick your preferred bus, select seats, choose pickup/drop points, and complete the payment.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking up to 2-4 hours before departure depending on the bus operator. Cancellation charges may apply.'
    },
    {
      question: 'How do I get my ticket?',
      answer: 'Your ticket will be sent to your registered email and mobile number. You can also download it from your booking history.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept UPI, Credit/Debit Cards, Net Banking, and Digital Wallets like Paytm, PhonePe, etc.'
    },
    {
      question: 'Can I modify my booking?',
      answer: 'Yes, you can modify your booking subject to seat availability and operator policies. Modification charges may apply.'
    },
    {
      question: 'What if I miss my bus?',
      answer: 'Unfortunately, tickets are non-transferable to other buses. However, you can contact customer support for assistance.'
    }
  ];

  const contactInfo = [
    {
      type: 'Phone',
      value: '+91 80-1234-5678',
      icon: '📞',
      description: 'Call us 24/7 for immediate assistance'
    },
    {
      type: 'Email',
      value: 'support@nagasreetravels.com',
      icon: '📧',
      description: 'Email us for detailed queries'
    },
    {
      type: 'WhatsApp',
      value: '+91 80-1234-5678',
      icon: '💬',
      description: 'Chat with us on WhatsApp'
    }
  ];

  const policies = [
    {
      title: 'Booking Policy',
      content: 'Bookings can be made up to 30 days in advance. All bookings are subject to availability and confirmation.'
    },
    {
      title: 'Cancellation Policy',
      content: 'Free cancellation up to 24 hours before departure. 50% refund between 12-24 hours. No refund within 12 hours of departure.'
    },
    {
      title: 'Refund Policy',
      content: 'Refunds will be processed within 7-10 business days to the original payment method.'
    },
    {
      title: 'Baggage Policy',
      content: 'Each passenger is allowed 15kg of luggage. Additional charges apply for excess baggage.'
    }
  ];

  return (
    <div className="help-page">
      <div className="container">
        <div className="help-header">
          <h1>Help & Support</h1>
          <p>We're here to help you with your travel needs</p>
        </div>

        <div className="help-navigation">
          <button 
            className={`nav-btn ${activeSection === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveSection('faq')}
          >
            📋 FAQ
          </button>
          <button 
            className={`nav-btn ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveSection('contact')}
          >
            📞 Contact Us
          </button>
          <button 
            className={`nav-btn ${activeSection === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveSection('policies')}
          >
            📜 Policies
          </button>
        </div>

        <div className="help-content">
          {activeSection === 'faq' && (
            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h3 className="faq-question">{faq.question}</h3>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'contact' && (
            <div className="contact-section">
              <h2>Contact Information</h2>
              <div className="contact-grid">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-icon">{contact.icon}</div>
                    <div className="contact-details">
                      <h3>{contact.type}</h3>
                      <p className="contact-value">{contact.value}</p>
                      <p className="contact-description">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-form">
                <h3>Send us a message</h3>
                <form className="message-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" placeholder="Your name" />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" className="form-control" placeholder="Your email" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" className="form-control" placeholder="Message subject" />
                  </div>
                  <div className="form-group">
                    <label>Message</label>
                    <textarea className="form-control" rows="4" placeholder="Your message"></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              </div>
            </div>
          )}

          {activeSection === 'policies' && (
            <div className="policies-section">
              <h2>Terms & Policies</h2>
              <div className="policies-list">
                {policies.map((policy, index) => (
                  <div key={index} className="policy-item">
                    <h3>{policy.title}</h3>
                    <p>{policy.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Help;
