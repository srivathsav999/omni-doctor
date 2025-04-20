import React from 'react';
import styles from './secondsection.module.css';
import { FaCheckCircle } from 'react-icons/fa'; // Import the check circle icon
import doctorImage from '../assets/doctor2.png'; // Place your image in src/assets folder
import { Link}from 'react-router-dom';

const SecondSection = () => {
  return (
    <section className={`second-section ${styles.secondSection}`}>
      <div className={`hero-left ${styles.heroLeft}`}>
        <div className={`image-wrapper ${styles.imageWrapper}`}>
          <img src={doctorImage} alt="Doctors" />
        </div>
      </div>

      <div className={`hero-right ${styles.heroRight}`}>
        <h1>
          Bringing <span className={`highlight ${styles.highlight}`}>expert healthcare </span>
           to <br />your fingertips—<span className={`highlight ${styles.highlight}`}>24/7</span>.
        </h1>
        <p>OmniDoctor delivers instant access to professional healthcare, anytime and anywhere.</p>

        <ul className={`features ${styles.features}`}>
          <li>
            <FaCheckCircle className={`icon ${styles.icon}`} />
            <span>Simple, secure, and accessible online consultations.</span>
          </li>
          <li>
            <FaCheckCircle className={`icon ${styles.icon}`} />
            <span>Expert healthcare, anytime, anywhere.</span>
          </li>
          <li>
            <FaCheckCircle className={`icon ${styles.icon}`} />
            <span>Trusted doctors, just a click away.</span>
          </li>
        </ul>

        <Link to="/about">
  <button className={`learn-more-btn ${styles.learnMoreBtn}`}>
    Learn More
  </button>
</Link>    
  </div>
    </section>
  );
};

export default SecondSection;