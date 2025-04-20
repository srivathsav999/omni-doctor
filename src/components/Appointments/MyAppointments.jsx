import React, { useState, useEffect } from 'react';
import { FaSearch, FaCheck, FaFilePrescription } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import styles from './MyAppointments.module.css';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date-desc');
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch from a backend API
    // For now, we'll get appointments from localStorage or use demo data
    const storedAppointments = localStorage.getItem('appointments');
    
    if (storedAppointments) {
      const allAppointments = JSON.parse(storedAppointments);
      // Filter appointments for the current user
      const userAppointments = user ? allAppointments.filter(app => app.userId === user.uid) : [];
      
      // For demo purposes, set some appointments as completed
      const demoAppointments = userAppointments.map((app, index) => {
        // First appointment is completed
        if (index === 0) {
          return { ...app, completed: true, status: 'Completed' };
        }
        // Third appointment is completed (if it exists)
        else if (index === 2 && userAppointments.length > 2) {
          return { ...app, completed: true, status: 'Completed' };
        }
        // Others are pending
        return { ...app, completed: false, status: 'Pending' };
      });
      
      setAppointments(demoAppointments);
      setFilteredAppointments(demoAppointments);
    } else {
      // Demo data if no appointments exist
      const demoAppointments = [
        {
          id: 'demo1',
          doctorName: 'Dr. Sarah Chen',
          doctorImage: '/images/lady.jpg',
          specialization: 'Family Medicine',
          hospital: 'City Medical Center',
          date: '2025-04-25',
          time: '10:30 AM',
          userId: user?.uid || 'demo-user',
          completed: true,
          status: 'Completed'
        },
        {
          id: 'demo2',
          doctorName: 'Dr. Michael Rodriguez',
          doctorImage: '/images/men.jpg',
          specialization: 'Psychiatry',
          hospital: 'Mind Wellness Clinic',
          date: '2025-05-03',
          time: '2:00 PM',
          userId: user?.uid || 'demo-user',
          completed: false,
          status: 'Pending'
        },
        {
          id: 'demo3',
          doctorName: 'Dr. James Wilson',
          doctorImage: '/images/men.jpg',
          specialization: 'Family Medicine',
          hospital: 'Health First Hospital',
          date: '2025-04-30',
          time: '11:15 AM',
          userId: user?.uid || 'demo-user',
          completed: true,
          status: 'Completed'
        }
      ];
      
      setAppointments(demoAppointments);
      setFilteredAppointments(demoAppointments);
    }
  }, [user]);

  useEffect(() => {
    let result = [...appointments];
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      result = result.filter(app => 
        app.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'doctor-name':
        result.sort((a, b) => a.doctorName.localeCompare(b.doctorName));
        break;
      case 'specialization':
        result.sort((a, b) => a.specialization.localeCompare(b.specialization));
        break;
      default:
        break;
    }
    
    setFilteredAppointments(result);
  }, [searchTerm, sortOption, appointments]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const addAppointment = () => {
    // In a real app, this would navigate to a booking form
    // For demo purposes, we'll just alert
    alert('This would navigate to the appointment booking form');
  };

  return (
    <div className={styles.appointmentsContainer}>
      <div className={styles.appointmentsHeader}>
        <h1>My Appointments</h1>
        <p>Manage and view all your scheduled appointments</p>
      </div>
      
      <div className={styles.controlsContainer}>
        <div className={styles.leftControls}>
          <button className={styles.addButton} onClick={addAppointment}>
            Add Appointment
          </button>
          
          <div className={styles.searchBar}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by doctor or specialization"
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
          </div>
        </div>
        
        <div className={styles.rightControls}>
          <div className={styles.filterControl}>
            <span>Filter By</span>
            {/* Filter options would go here */}
          </div>
          
          <div className={styles.sortControl}>
            <span>Sort By</span>
            <select value={sortOption} onChange={handleSortChange} className={styles.sortSelect}>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="doctor-name">Doctor Name</option>
              <option value="specialization">Specialization</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={styles.appointmentsList}>
        {filteredAppointments.length === 0 ? (
          <div className={styles.noAppointments}>
            <p>You don't have any appointments scheduled.</p>
            <button className={styles.bookButton} onClick={addAppointment}>Book an Appointment</button>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className={styles.appointmentCard}>
              <div className={styles.doctorImageContainer}>
                <img src={appointment.doctorImage} alt={appointment.doctorName} className={styles.doctorImage} />
              </div>
              
              <div className={styles.appointmentDetails}>
                <div className={styles.doctorInfo}>
                  <h3>{appointment.doctorName}</h3>
                  <p className={styles.hospitalName}>{appointment.hospital}</p>
                </div>
                
                <div className={styles.specialization}>
                  <h4>Physician</h4>
                  <p>{appointment.specialization}</p>
                </div>
                
                <div className={styles.appointmentTime}>
                  <h4>{appointment.date}</h4>
                  <p>{appointment.time}</p>
                </div>
                
                <div className={styles.prescriptionContainer}>
                  <h4>Prescription</h4>
                  <button className={styles.viewButton}>
                    View Here
                  </button>
                </div>
                
                <div className={styles.statusContainer}>
                  <div className={appointment.completed ? styles.statusCompleted : styles.statusPending}>
                    {appointment.completed && <FaCheck className={styles.checkIcon} />}
                    {!appointment.completed && <span className={styles.pendingText}>•••</span>}
                  </div>
                  <span className={styles.statusText}>{appointment.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
