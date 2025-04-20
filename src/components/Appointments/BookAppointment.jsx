import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import styles from './BookAppointment.module.css';

const BookAppointment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: ''
  });
  const [availableTimes, setAvailableTimes] = useState([]);

  // Get the current date in YYYY-MM-DD format for the min attribute
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate a date 3 months from now for the max attribute
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  const maxDate = threeMonthsFromNow.toISOString().split('T')[0];

  useEffect(() => {
    // Fetch doctor data
    fetch('/src/data/db.json')
      .then(response => response.json())
      .then(data => {
        const foundDoctor = data.doctors.find(d => d.id === parseInt(id));
        if (foundDoctor) {
          setDoctor(foundDoctor);
          setLoading(false);
        } else {
          console.error('Doctor not found');
          navigate('/doctors');
        }
      })
      .catch(error => {
        console.error('Error loading doctor data:', error);
        setLoading(false);
      });
  }, [id, navigate]);

  // Generate available time slots based on selected date and doctor's availability
  useEffect(() => {
    if (doctor && formData.date) {
      const dayOfWeek = new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      
      // Check if the doctor works on the selected day
      if (doctor.availability[dayOfWeek]) {
        // Parse the availability hours
        const hours = doctor.availability[dayOfWeek];
        const [startStr, endStr] = hours.split(' - ');
        
        // Convert to 24-hour format for easier calculation
        const convertTo24Hour = (timeStr) => {
          const [time, modifier] = timeStr.split(' ');
          let [hours, minutes] = time.split(':');
          
          if (hours === '12') {
            hours = '00';
          }
          
          if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
          }
          
          return { hours: parseInt(hours, 10), minutes: parseInt(minutes, 10) };
        };
        
        const startTime = convertTo24Hour(startStr);
        const endTime = convertTo24Hour(endStr);
        
        // Generate time slots in 30-minute intervals
        const slots = [];
        let currentHour = startTime.hours;
        let currentMinute = startTime.minutes;
        
        while (currentHour < endTime.hours || (currentHour === endTime.hours && currentMinute < endTime.minutes)) {
          const formattedHour = currentHour % 12 === 0 ? 12 : currentHour % 12;
          const amPm = currentHour < 12 ? 'AM' : 'PM';
          slots.push(`${formattedHour}:${currentMinute.toString().padStart(2, '0')} ${amPm}`);
          
          currentMinute += 30;
          if (currentMinute >= 60) {
            currentHour += 1;
            currentMinute = 0;
          }
        }
        
        setAvailableTimes(slots);
      } else {
        setAvailableTimes([]);
      }
    }
  }, [doctor, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please log in to book an appointment');
      navigate('/signup');
      return;
    }
    
    // Create a new appointment object
    const newAppointment = {
      id: Date.now(), // Simple ID generation
      userId: user.uid,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorImage: doctor.image,
      specialization: doctor.specialization,
      hospital: 'ABC Hospital', // This would come from the doctor's data in a real app
      date: formData.date,
      time: formData.time,
      reason: formData.reason,
      notes: formData.notes,
      completed: false,
      prescription: null
    };
    
    // Get existing appointments from localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    // Add the new appointment
    const updatedAppointments = [...existingAppointments, newAppointment];
    
    // Save back to localStorage
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Navigate to the appointments page
    navigate('/appointments');
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.bookingContainer}>
      <div className={styles.bookingHeader}>
        <h1>Book an Appointment</h1>
        <p>Schedule a consultation with {doctor.name}</p>
      </div>
      
      <div className={styles.bookingContent}>
        <div className={styles.doctorCard}>
          <img src={doctor.image} alt={doctor.name} className={styles.doctorImage} />
          <div className={styles.doctorInfo}>
            <h2>{doctor.name}</h2>
            <p className={styles.doctorTitle}>{doctor.title}</p>
            <p className={styles.doctorSpecialty}>{doctor.specialization}</p>
            
            <div className={styles.availabilitySection}>
              <h3>Availability</h3>
              <div className={styles.availabilityList}>
                {Object.entries(doctor.availability).map(([day, hours]) => (
                  <div key={day} className={styles.availabilityItem}>
                    <span className={styles.day}>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                    <span className={styles.hours}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.bookingForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="date">
                <FaCalendarAlt className={styles.formIcon} />
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                max={maxDate}
                required
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="time">
                <FaClock className={styles.formIcon} />
                Select Time
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className={styles.formInput}
                disabled={!formData.date || availableTimes.length === 0}
              >
                <option value="">Select a time slot</option>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
              {formData.date && availableTimes.length === 0 && (
                <p className={styles.noAvailability}>
                  The doctor is not available on this day. Please select another date.
                </p>
              )}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="reason">
                <FaUser className={styles.formIcon} />
                Reason for Visit
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className={styles.formInput}
              >
                <option value="">Select a reason</option>
                <option value="General Checkup">General Checkup</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Consultation">Consultation</option>
                <option value="Urgent Care">Urgent Care</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="notes">Additional Notes (Optional)</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className={styles.formTextarea}
                placeholder="Any specific concerns or information the doctor should know..."
                rows="4"
              ></textarea>
            </div>
            
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className={styles.submitButton}>
                Book Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
