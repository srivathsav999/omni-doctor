import React from 'react';
import styles from './servicessection.module.css';
import medicineImage from '../assets/medicine.jpeg';
import physcologyImage from '../assets/physcology.png';
import psychiatryImage from '../assets/psychiatry.jpg';
import gynecologyImage from '../assets/gynecology.jpg';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Family Medicine",
    description: "Comprehensive care for all ages, all in one place.",
    image: medicineImage,
  },
  {
    title: "Psychology",
    description: "Support for your mental and emotional well-being.",
    image: physcologyImage,
  },
  {
    title: "Psychiatry",
    description: "Expert treatment for mental health with medical insight.",
    image: psychiatryImage,
  },
  {
    title: "Gynecology",
    description: "Specialized care for women’s health at every stage.",
    image: gynecologyImage,
  },
];

const ServicesSection = () => {
  return (
    <section className={`services-section ${styles.servicesSection}`}>
      <div className={`services-header ${styles.servicesHeader}`}>
        <div>
          <p className={`sub-heading ${styles.subHeading}`}>OUR SERVICES</p>
          <h2>
            <span className={`highlight ${styles.highlight}`}>A Wide Range of Services</span>
            <br />
            <span className={`bold-heading ${styles.boldHeading}`}>for Your Health</span>
          </h2>
        </div>
        <Link to="/services">
  <button className={`learn-btn ${styles.learnBtn}`}>Learn More
  </button>
</Link>
      </div>

      <div className={`cards-container ${styles.cardsContainer}`}>
        {services.map((service, index) => (
          <div key={index} className={`service-card ${styles.serviceCard}`}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;