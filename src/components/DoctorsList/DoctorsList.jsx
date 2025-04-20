import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styles from './DoctorsList.module.css';

const categories = ["All", "Family Medicine", "Psychiatry", "Gynecology", "Psychology"];

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('/src/data/db.json')
      .then(response => response.json())
      .then(data => {
        setDoctors(data.doctors);
        setFilteredDoctors(data.doctors);
        
        // Check for specialty parameter in URL
        const params = new URLSearchParams(location.search);
        const specialtyParam = params.get('specialty');
        
        if (specialtyParam && categories.includes(specialtyParam)) {
          setSelectedCategory(specialtyParam);
        }
      })
      .catch(error => console.error('Error loading doctors:', error));
  }, [location.search]);

  useEffect(() => {
    let result = doctors;

    if (selectedCategory !== 'All') {
      result = result.filter(doc => doc.specialization === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      result = result.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(result);
  }, [searchTerm, selectedCategory, doctors]);

  const handleGetMoreInfo = (doctorId) => {
    navigate(`/doctors/${doctorId}`);
  };

  return (
    <div className={styles.doctorContainer}>
      <h1 className={styles.pageTitle}>
        Our Dedicated <span className={styles.highlight}>Doctors</span> Team
      </h1>

      <div className={styles.filtersSection}>
        <div className={styles.specialties}>
          <h2>Specialties</h2>
          <div className={styles.categoryPills}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.pill} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Doctor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.doctorGrid}>
        {filteredDoctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          filteredDoctors.map((doctor) => (
            <div className={styles.doctorCard} key={doctor.id}>
  <div className={styles.experienceBadge}>{doctor.experience}</div>
  <img
    src={doctor.image}
    alt={doctor.name}
    className={styles.doctorPic}
  />
  <div className={styles.doctorInfo}>
    <h3 className={styles.doctorName}>Dr. {doctor.name}</h3>
    <p className={styles.doctorTitle}>{doctor.title}</p>
    <p className={styles.doctorSpecialization}><strong>Specialization:</strong> {doctor.specialization}</p>
    <button onClick={() => handleGetMoreInfo(doctor.id)} className={styles.infoBtn}>
      More Info
    </button>
  </div>
</div>

          ))
        )}
      </div>
    </div>
  );
};

export default DoctorsList;