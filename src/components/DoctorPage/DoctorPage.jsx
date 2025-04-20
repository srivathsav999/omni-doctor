import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaGraduationCap, FaCertificate, FaLanguage, FaClock } from 'react-icons/fa';
import styles from './DoctorPage.module.css';

const DoctorPage = () => {
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch('/src/data/db.json')
      .then(response => response.json())
      .then(data => {
        const foundDoctor = data.doctors.find(d => d.id === parseInt(id));
        if (foundDoctor) {
          setDoctor(foundDoctor);
        } else {
          console.error('Doctor not found');
        }
      })
      .catch(error => console.error('Error loading doctor data:', error));
  }, [id]);

  if (!doctor) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.doctorPage}>
      <div className={styles.doctorHeader}>
        <div className={styles.doctorProfile}>
          <img src={doctor.image} alt={doctor.name} className={styles.doctorImage} />
          <div className={styles.doctorInfo}>
            <h1>{doctor.name}</h1>
            <h2>{doctor.title}</h2>
            <p className={styles.specialization}>{doctor.specialization}</p>
            <div className={styles.rating}>
              <FaStar className={styles.starIcon} />
              <span>{doctor.rating}</span>
              <span className={styles.reviews}>({doctor.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.doctorContent}>
        <div className={styles.mainContent}>
          <section>
            <h3>About</h3>
            <p>{doctor.bio}</p>
          </section>

          <section>
            <h3>
              <FaGraduationCap className={styles.sectionIcon} />
              Education
            </h3>
            <ul>
              {doctor.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Areas of Expertise</h3>
            <div className={styles.expertiseTags}>
              {doctor.expertise.map((exp, index) => (
                <span key={index} className={styles.expertiseTag}>{exp}</span>
              ))}
            </div>
          </section>

          <section>
            <h3>
              <FaCertificate className={styles.sectionIcon} />
              Certifications
            </h3>
            <ul>
              {doctor.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <section>
              <h3>
                <FaLanguage className={styles.sectionIcon} />
                Languages
              </h3>
              <div className={styles.languageTags}>
                {doctor.languages.map((lang, index) => (
                  <span key={index} className={styles.languageTag}>{lang}</span>
                ))}
              </div>
            </section>

            <section>
              <h3>
                <FaClock className={styles.sectionIcon} />
                Availability
              </h3>
              <div className={styles.schedule}>
                {Object.entries(doctor.availability).map(([day, hours]) => (
                  <div key={day} className={styles.scheduleRow}>
                    <span className={styles.day}>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    <span className={styles.hours}>{hours}</span>
                  </div>
                ))}
              </div>
            </section>

            <button 
              className={styles.bookAppointmentBtn} 
              onClick={() => navigate(`/book-appointment/${id}`)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
