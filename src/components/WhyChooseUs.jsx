import React from 'react';
import styles from './whychooseus.module.css';
import doctorVideo from '../assets/doctor-video.mp4'; // Replace with your video path
import { CheckCircle } from 'lucide-react'; // Icon library (install using `npm install lucide-react`)
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  return (
    <div className={styles.containerwhy}>
    <section id="WhyChooseUs" className={`why-choose-section ${styles.whyChooseSection}`}>
      <h3 className={`sub-heading ${styles.subHeading}`}>Why Choose Us ?</h3>
      <h1 className={`main-heading ${styles.mainHeading}`}>Benefits of Our Healthcare Services</h1>
      <p className={`path-text ${styles.pathText}`}>Your Path to a Healthier Life</p>

      <div className={`choose-content ${styles.chooseContent}`}>
        <div className={`choose-media ${styles.chooseMedia}`}>
          <video className={`choose-video ${styles.chooseVideo}`} autoPlay loop muted playsInline>
            <source src={doctorVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className={`choose-details ${styles.chooseDetails}`}>
          <div className={`stats ${styles.stats}`}>
            <div className={`stat-box ${styles.statBox}`}>
              <h2>10+</h2>
              <p>Skilled Doctors</p>
            </div>
            <div className={`stat-box ${styles.statBox}`}>
              <h2>99%</h2>
              <p>Patient Satisfaction</p>
            </div>
            <div className={`stat-box ${styles.statBox}`}>
              <h2>20K+</h2>
              <p>Appointment Booked</p>
            </div>
          </div>

          <ul className={`feature-list ${styles.featureList}`}>
            <li><CheckCircle size={20} className={`tick-icon ${styles.tickIcon}`} /> Simple, secure, and accessible online consultations.</li>
            <li><CheckCircle size={20} className={`tick-icon ${styles.tickIcon}`} /> Expert healthcare, anytime, anywhere.</li>
            <li><CheckCircle size={20} className={`tick-icon ${styles.tickIcon}`} /> Trusted doctors, just a click away.</li>
          </ul>

          <Link to="/doctors">
            <button className={`appointment-btn ${styles.appointmentBtn}`}>Book Your Appointment</button>
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
};

export default WhyChooseUs;