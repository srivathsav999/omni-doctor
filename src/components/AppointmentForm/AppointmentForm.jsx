import React, { useState, useEffect } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import styles from './AppointmentForm.module.css';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate max date (3 months from today)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Validate form data
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        // Get existing appointments from localStorage or initialize empty array
        const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        
        // Create new appointment with ID and status
        const newAppointment = {
          ...formData,
          id: Date.now().toString(),
          status: 'scheduled',
          createdAt: new Date().toISOString()
        };
        
        // Add to existing appointments
        existingAppointments.push(newAppointment);
        
        // Save back to localStorage
        localStorage.setItem('appointments', JSON.stringify(existingAppointments));
        
        // Show success message
        setSuccessMessage('Appointment booked successfully! We will contact you shortly.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          service: ''
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } catch (error) {
        console.error('Error booking appointment:', error);
        setErrorMessage('Failed to book appointment. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1000); // Simulate 1 second delay for API call
  };
  
  const validateForm = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    // Validate phone number (simple validation for demo)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return false;
    }
    
    // Validate service selection
    if (!formData.service) {
      setErrorMessage('Please select a service');
      return false;
    }
    
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className={styles.appointmentForm}>
      <h2 className={styles.formTitle}>Book Your Appointment</h2>
      
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <PersonOutlineIcon className={styles.icon} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <EmailIcon className={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <PhoneIcon className={styles.icon} />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
            disabled={isSubmitting}
            maxLength="10"
          />
        </div>

        <div className={styles.formGroup}>
          <MedicalServicesIcon className={styles.icon} />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className={styles.input}
            disabled={isSubmitting}
          >
            <option value="">Select Service</option>
            <option value="general">General Checkup</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="dermatology">Dermatology</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <CalendarTodayIcon className={styles.icon} />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={styles.input}
            min={today}
            max={maxDateString}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <AccessTimeIcon className={styles.icon} />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className={styles.input}
            disabled={isSubmitting}
            min="09:00"
            max="18:00"
            step="1800"
          />
        </div>

        <button 
          type="submit" 
          className={styles.bookButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
