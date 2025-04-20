import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaTwitter, FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();
  
  const scrollToSection = (sectionId) => {
    // Only execute if we're on the homepage
    if (location.pathname === '/' || location.pathname === '') {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>OmniDoctor</h3>
          <p>Through secure video calls, chats, and digital prescriptions, you can consult licensed doctors without leaving your home. Our ecosystem is designed to fit into your daily life — saving you time while keeping your health in check.</p>
          <div className={styles.socialLinks}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className={styles.socialIcon} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className={styles.socialIcon} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className={styles.socialIcon} />
            </a>
            <a href="mailto:example@gmail.com" aria-label="Email">
              <FaEnvelope className={styles.socialIcon} />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Company</h3>
          <Link to="/#faq" onClick={() => scrollToSection('FAQ')}>FAQ</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
          <Link to="/#testimonial" onClick={() => scrollToSection('Testimonial')}>Testimonials</Link>
        </div>

        <div className={styles.footerSection}>
          <h3>Contact Info</h3>
          <p><FaPhone className={styles.contactIcon} /> <a href="tel:18007800293">1800 7800 2938</a></p>
          <p><FaEnvelope className={styles.contactIcon} /> <a href="mailto:example@gmail.com">example@gmail.com</a></p>
          <p><FaMapMarkerAlt className={styles.contactIcon} /> <a href="https://maps.google.com/?q=New+York,+400890" target="_blank" rel="noopener noreferrer">New York, 400890</a></p>
        </div>

        <div className={styles.footerSection}>
          <h3>Clinic Hours</h3>
          <div className={styles.clinicHoursFooter}>
            <div>Monday - Friday<span>9:00 - 6:00</span></div>
            <div>Saturday<span>11:00 - 2:00</span></div>
            <div>Sunday<span>Closed</span></div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© 2024 OmniDoctor - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
