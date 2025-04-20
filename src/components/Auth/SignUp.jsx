import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Auth.module.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    acceptTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      ...formData,
      isAuthenticated: true
    };
    // Login the user
    login(userData);
    // Redirect to health profile form
    navigate('/profile/edit');
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        <div className={styles.authImage}>
          <div className={styles.authOverlay}>
            <h1>OmniDoctor</h1>
            <p>Your Health, Our Priority</p>
          </div>
        </div>
        
        <div className={styles.authFormContainer}>
          <h2>Sign up For account</h2>
          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.terms}`}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  required
                />
                <span>I accept all</span>
              </label>
              <a href="#" className={styles.termsLink}>terms and condition</a>
            </div>

            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>

            <div className={styles.authFooter}>
              <p>
                Already have an account?{' '}
                <a href="#" className={styles.loginLink}>Log in</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
