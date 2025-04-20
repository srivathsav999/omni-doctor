import React from 'react';
import SecondSection from '../secondsection';
import Footer from '../Footer/Footer';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.aboutUsHeader}>
        <h1>About <span className={styles.highlight}>OmniDoctor</span></h1>
        <p>Transforming healthcare delivery through technology and compassion</p>
      </div>
      
      <SecondSection />
      
      
      <div className={styles.aboutUsValues}>
        <h2>Our Core Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <h3>Accessibility</h3>
            <p>Making healthcare available to everyone, regardless of location or circumstance.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Excellence</h3>
            <p>Striving for the highest standards in medical care and customer service.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Innovation</h3>
            <p>Continuously improving our platform and services through technology and creative solutions.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Compassion</h3>
            <p>Treating every patient with empathy, respect, and understanding.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Integrity</h3>
            <p>Operating with honesty, transparency, and ethical standards in all we do.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Collaboration</h3>
            <p>Working together with patients, providers, and partners to improve health outcomes.</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AboutUs;
