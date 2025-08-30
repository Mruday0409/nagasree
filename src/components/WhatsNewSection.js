import React from 'react';
import './WhatsNewSection.css';

const WhatsNewSection = () => {
  const newsItems = [
    {
      id: 1,
      title: 'New Route Added',
      description: 'We have added more convenient timings for Bangalore - Sringeri route',
      date: '2 days ago',
      icon: '🛣️',
      category: 'Routes'
    },
    {
      id: 2,
      title: 'Mobile App Launch',
      description: 'Book tickets on the go with our new mobile application',
      date: '1 week ago',
      icon: '📱',
      category: 'Technology'
    },
    {
      id: 3,
      title: 'Safety First',
      description: 'Enhanced safety measures and sanitization protocols implemented',
      date: '2 weeks ago',
      icon: '🛡️',
      category: 'Safety'
    },
    {
      id: 4,
      title: 'Loyalty Program',
      description: 'Earn points on every booking and get exclusive discounts',
      date: '3 weeks ago',
      icon: '⭐',
      category: 'Rewards'
    }
  ];

  return (
    <section className="whats-new-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What's New</h2>
          <p className="section-subtitle">Stay updated with latest features and announcements</p>
        </div>
        
        <div className="news-grid">
          {newsItems.map(item => (
            <div key={item.id} className="news-card">
              <div className="news-icon">
                <span>{item.icon}</span>
              </div>
              <div className="news-content">
                <div className="news-category">{item.category}</div>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-description">{item.description}</p>
                <div className="news-date">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
