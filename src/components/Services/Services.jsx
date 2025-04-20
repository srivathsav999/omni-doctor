import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Services.module.css';
import { FaShieldAlt, FaCalendarCheck, FaVideo } from 'react-icons/fa';

// Import service images
import medicineImage from '../../assets/medicine.jpeg';
import psychologyImage from '../../assets/physcology.png';
import psychiatryImage from '../../assets/psychiatry.jpg';
import gynecologyImage from '../../assets/gynecology.jpg';

// Define the four main services
const services = [
  {
    title: "Family Medicine",
    description: "Comprehensive care for all ages, all in one place.",
    image: medicineImage,
    specialty: "Family Medicine"
  },
  {
    title: "Psychology",
    description: "Support for your mental and emotional well-being.",
    image: psychologyImage,
    specialty: "Psychology"
  },
  {
    title: "Psychiatry",
    description: "Expert treatment for mental health with medical insight.",
    image: psychiatryImage,
    specialty: "Psychiatry"
  },
  {
    title: "Gynecology",
    description: "Specialized care for women's health at every stage.",
    image: gynecologyImage,
    specialty: "Gynecology"
  },
];

const Services = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch doctors data from db.json
    fetch('/src/data/db.json')
      .then(response => response.json())
      .then(data => {
        setDoctors(data.doctors);
      })
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);
  
  // Navigate to doctors page with specialty filter
  const handleSpecialtyClick = (specialty) => {
    // Navigate to doctors page with the specialty filter
    navigate(`/doctors?specialty=${encodeURIComponent(specialty)}`);
  };
  
  // Handle book appointment button click
  const handleBookAppointment = (specialty, event) => {
    // Stop propagation to prevent the card click handler from firing
    event.stopPropagation();
    // Navigate to doctors page with the specialty filter
    navigate(`/doctors?specialty=${encodeURIComponent(specialty)}`);
  };
  
  // Handle video consultation button click
  const handleVideoConsultation = (specialty, event) => {
    // Stop propagation to prevent the card click handler from firing
    event.stopPropagation();
    // Navigate to video consultation page
    navigate('/video-consultation');
  };
  return (
    <div className={styles['services-container']}>
      <div className={styles['services-title-container']}>
        <h1 className={styles['services-title']}>Our Services</h1>
      </div>
      
      <div className={styles['services-diagram']}>
        {/* Top Row Cards */}
        <div className={`${styles['service-card']} ${styles['top-left']}`}>
          <div className={styles['service-header']}>
            <h2>Mental Wellness Support</h2>
          </div>
          <div className={styles['service-content']}>
            <p>We strive to create a welcoming and supportive environment that puts our patients at ease.</p>
          </div>
        </div>
        
        <div className={`${styles['service-card']} ${styles['top-right']}`}>
          <div className={styles['service-header']}>
            <h2>Chronic Care Management</h2>
          </div>
          <div className={styles['service-content']}>
            <p>We believe in practicing medicine with integrity and honesty. We always put our patients' interests first.</p>
          </div>
        </div>
        
        {/* Center Logo */}
        <div className={styles['center-logo']}>
          <div className={styles['connecting-lines']}>
            <div className={`${styles['line']} ${styles['line-top-left']}`}></div>
            <div className={`${styles['line']} ${styles['line-top-right']}`}></div>
            <div className={`${styles['line']} ${styles['line-bottom-left']}`}></div>
            <div className={`${styles['line']} ${styles['line-bottom-right']}`}></div>
          </div>
          
          <div className={styles['logo-container']}>
            <div className={styles['logo-content']}>
              <span className={styles['logo-text']}>OMNI</span>
              <span className={styles['logo-subtext']}>DOCTOR</span>
              <FaShieldAlt className={styles['logo-icon']} />
            </div>
          </div>
        </div>
        
        {/* Bottom Row Cards */}
        <div className={`${styles['service-card']} ${styles['bottom-left']}`}>
          <div className={styles['service-header']}>
            <h2>Preventive Checkups</h2>
          </div>
          <div className={styles['service-content']}>
            <p>We treat all individuals with respect and dignity. We believe that every person deserves to be treated with compassion and kindness.</p>
          </div>
        </div>
        
        <div className={`${styles['service-card']} ${styles['bottom-right']}`}>
          <div className={styles['service-header']}>
            <h2>E-Prescriptions</h2>
          </div>
          <div className={styles['service-content']}>
            <p>Receive digital prescriptions after your consultation and get medicines delivered straight to your door.</p>
          </div>
        </div>
      </div>
      
      {/* Specialty Categories Section */}
      <div className={styles['specialty-section']}>
        <div className={styles['services-header']}>
          <div>
            <p className={styles['sub-heading']}>OUR SERVICES</p>
            <h2>
              <span className={styles['highlight']}>A Wide Range of Services</span>
              <br />
              <span className={styles['bold-heading']}>for Your Health</span>
            </h2>
          </div>
        </div>
        
        <div className={styles['specialty-grid']}>
          {services.map((service, index) => {
            // Find doctors with this specialty
            const specialtyDoctors = doctors.filter(doctor => 
              doctor.specialization === service.specialty
            );
            
            return (
              <div 
                key={index} 
                className={styles['specialty-card']}
                onClick={() => handleSpecialtyClick(service.specialty)}
              >
                <div className={styles['service-image']}>
                  <img src={service.image} alt={service.title} />
                </div>
                
                <div className={styles['service-content']}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                
                <div className={styles['specialty-actions']}>
                  <button 
                    className={styles['book-btn']}
                    onClick={(e) => handleBookAppointment(service.specialty, e)}
                  >
                    <FaCalendarCheck /> Book Appointment
                  </button>
                  <button 
                    className={styles['video-btn']}
                    onClick={(e) => handleVideoConsultation(service.specialty, e)}
                  >
                    <FaVideo /> Video Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
