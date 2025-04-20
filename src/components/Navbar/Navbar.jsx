import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaUser, FaEdit, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const navigateToProfile = () => {
    navigate('/profile');
  };

  const navigateToEditProfile = () => {
    navigate('/profile/edit');
    setShowProfileMenu(false);
  };

  return (
    <nav className={`navbar ${styles.navbar}`}>
      <div className={`nav-content ${styles.navContent}`}>
        <Link to="/" className={`logo ${styles.logo}`}>
          <span className={`logo-text ${styles.logoText}`}>OmniDoctor</span>
        </Link>
        
        <div className={`nav-links ${styles.navLinks}`}>
          <Link to="/" className={isActive('/') ? `nav-link active ${styles.navLink} ${styles.active}` : `nav-link ${styles.navLink}`}>Home</Link>
          <Link to="/services" className={isActive('/services') ? `nav-link active ${styles.navLink} ${styles.active}` : `nav-link ${styles.navLink}`}>Services</Link>
          <Link to="/doctors" className={isActive('/doctors') ? `nav-link active ${styles.navLink} ${styles.active}` : `nav-link ${styles.navLink}`}>Doctors</Link>
          <Link to="/appointments" className={isActive('/appointments') ? `nav-link active ${styles.navLink} ${styles.active}` : `nav-link ${styles.navLink}`}>My Appointments</Link>
          <Link to="/contact" className={isActive('/contact') ? `nav-link active ${styles.navLink} ${styles.active}` : `nav-link ${styles.navLink}`}>Contact Us</Link>
          <Link to="/about" className={isActive('/about') ? `nav-link active ${styles.navLink} ${styles.active}` : `nav-link ${styles.navLink}`}>About Us</Link>
      </div>

        <div className={`profile-menu-container ${styles.profileMenuContainer}`}>
          {user ? (
            <>
              <button className={`profile-button ${styles.profileButton}`} onClick={navigateToProfile}>
                <FaUserCircle className={`profile-icon ${styles.profileIcon}`} />
              </button>
              
              
            </>
          ) : (
            <button className={`profile-button ${styles.profileButton}`} onClick={() => navigate('/signup')}>
              <FaSignInAlt className={`profile-icon ${styles.profileIcon}`} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
