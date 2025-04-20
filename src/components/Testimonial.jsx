import React from 'react';
import styles from './Testimonial.module.css';
import ladyImage from '../assets/lady.jpg';
import menImage from '../assets/men.jpg';
import { FaStar } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const testimonial = [
  {
    name: 'Sakshi Kore',
    role: 'Cardiologist Patient',
    image: ladyImage,
    rating: 5,
    text: 'Thanks for all the services, no doubt it is the best hospital.',
  },
  {
    name: 'Simon Targett',
    role: 'Neurologist Patient',
    image: menImage,
    rating: 5,
    text: 'Thanks for all the services, no doubt it is the best hospital.',
  },
  {
    name: 'Rajveer Singh',
    role: 'Cardiologist Patient',
    image: menImage,
    rating: 5,
    text: 'Thanks for all the services, no doubt it is the best hospital.',
  },
  
];

const Testimonial = () => {
  return (
    <div id="Testimonial" className={`testimonial-section ${styles.testimonialSection}`}>
      <h2 className={`testimonial-title ${styles.testimonialTitle}`}>Patients Testimonial</h2>
      <p className={`testimonial-subtitle ${styles.testimonialSubtitle}`}>Let’s see what our happy patients say</p>
      <div className={`testimonial-wrapper ${styles.testimonialWrapper}`}>
        <button className={`arrow left ${styles.arrow} ${styles.arrowLeft}`}><FaChevronLeft /></button>
        {testimonial.map((t, index) => (
          <div className={`testimonial-card ${styles.testimonialCard}`} key={index}>
            <img src={t.image} alt={t.name} className={`testimonial-img ${styles.testimonialImg}`} />
            <h3>{t.name}</h3>
            <p className={`role ${styles.role}`}>{t.role}</p>
            <div className={`stars ${styles.stars}`}>
              {[...Array(t.rating)].map((_, i) => (
                <FaStar key={i} className={`star ${styles.star}`} />
              ))}
            </div>
            <p className={`feedback ${styles.feedback}`}>{t.text}</p>
          </div>
        ))}
        <button className={`arrow right ${styles.arrow} ${styles.arrowRight}`}><FaChevronRight /></button>
      </div>
    </div>
  );
};

export default Testimonial;