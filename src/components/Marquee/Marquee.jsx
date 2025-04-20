import React from 'react';
import './Marquee.css';
import { FaUserMd, FaHeartbeat, FaClock } from 'react-icons/fa';

const Marquee = () => {
  const items = [
    { text: 'EXPERT CARE', icon: <FaUserMd /> },
    { text: 'TRUSTED SERVICE', icon: <FaHeartbeat /> },
    { text: 'ALWAYS AVAILABLE', icon: <FaClock /> }
  ];

  return (
    <div className="marquee-container">
      <div className="marquee">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="marquee-content">
            {items.map((item, index) => (
              <span key={index} className="marquee-item">
                <span className="icon">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
