import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './UserProfile.module.css';

const UserProfileForm = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Import login function from AuthContext
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phoneNumber: '',
    address: '',
    bloodGroup: '',
    bloodPressure: '',
    gender: '',
    healthIssues: {
      hasIssues: 'No',
      details: ''
    },
    weight: '',
    height: '',
    photo: null,
    allergies: []
  });

  useEffect(() => {
    // Initialize with user data if available
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        ...user,
        // Ensure allergies is always an array
        allergies: user.allergies || []
      }));
    }
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result;
        setPhotoPreview(photoUrl);
        setFormData(prev => ({ ...prev, photo: photoUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAllergy = () => {
    setFormData(prev => ({
      ...prev,
      allergies: [...prev.allergies, { name: '', severity: 'Low' }]
    }));
  };

  const handleAllergyChange = (index, field, value) => {
    setFormData(prev => {
      const newAllergies = [...prev.allergies];
      newAllergies[index] = { ...newAllergies[index], [field]: value };
      return { ...prev, allergies: newAllergies };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'hasHealthIssues') {
      // For health issues radio buttons
      console.log('Health issues changed to:', value);
      // Force a re-render by creating a new object
      const newHealthIssues = {
        hasIssues: value,
        details: value === 'No' ? '' : formData.healthIssues.details
      };
      
      setFormData(prev => ({
        ...prev,
        healthIssues: newHealthIssues
      }));
      
      // Log the updated state
      console.log('Updated health issues:', newHealthIssues);
    } else if (name === 'healthDetails') {
      // For health details text input
      console.log('Health details changed to:', value);
      setFormData(prev => ({
        ...prev,
        healthIssues: {
          ...prev.healthIssues,
          details: value
        }
      }));
    } else {
      // For all other form fields
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure all form data is properly formatted
    const profileData = {
      ...formData,
      allergies: formData.allergies || [], // Ensure allergies is always an array
      isAuthenticated: true
    };
    
    try {
      // Save to both user and userProfile in localStorage for consistency
      localStorage.setItem('userProfile', JSON.stringify(profileData));
      localStorage.setItem('user', JSON.stringify(profileData));
      
      // Update the auth context
      login(profileData);
      
      // Small delay to ensure data is saved before redirect
      setTimeout(() => {
        // Force redirect to personal details page
        window.location.href = '/profile';
      }, 100);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className={`profile-form-centered-container ${styles.profileFormCenteredContainer}`}>
      <div className={`profile-form-card beautiful-form animate-fade-in ${styles.profileFormCard} ${styles.animateFadeIn}`}>
        <h1 className={`profile-form-title ${styles.profileFormTitle}`}>Healthy Me !!</h1>
        <form onSubmit={handleSubmit} className={`health-form ${styles.healthForm}`}>
          {/* Profile photo upload */}
          <div className={`photo-upload-section ${styles.photoUploadSection}`}>
            <div className={`photo-preview ${styles.photoPreview}`}>
              {photoPreview ? (
                <img src={photoPreview} alt="Profile Preview" />
              ) : (
                <div className={`photo-placeholder ${styles.photoPlaceholder}`}>
                  <span>Click to add photo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className={`photo-input ${styles.photoInput}`}
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className={`form-group ${styles.formGroup}`}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={`form-group ${styles.formGroup}`}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Your Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Your Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Health Information */}
          <div className={`form-group ${styles.formGroup}`}>
            <label>Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              placeholder="e.g., B+ve"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={`form-group ${styles.formGroup}`}>
            <label>Blood Pressure</label>
            <input
              type="text"
              name="bloodPressure"
              placeholder="e.g., 90-120 mmHg"
              value={formData.bloodPressure}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label>Weight (kg)</label>
            <input
              type="text"
              name="weight"
              placeholder="Enter your Weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label>Height (cm)</label>
            <input
              type="text"
              name="height"
              placeholder="Enter your Height"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label>Gender</label>
            <div className={`gender-options ${styles.radioGroup}`}>
              <label className={`radio-label ${styles.radioOption}`}>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                Male
              </label>
              <label className={`radio-label ${styles.radioOption}`}>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                Female
              </label>
              <label className={`radio-label ${styles.radioOption}`}>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                Other
              </label>
            </div>
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label>Any health issues?</label>
            <div className={`radio-group ${styles.radioGroup}`}>
              <label className={`radio-option ${styles.radioOption}`}>
                <input
                  type="radio"
                  name="hasHealthIssues"
                  value="Yes"
                  checked={formData.healthIssues.hasIssues === 'Yes'}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label className={`radio-option ${styles.radioOption}`}>
                <input
                  type="radio"
                  name="hasHealthIssues"
                  value="No"
                  checked={formData.healthIssues.hasIssues === 'No'}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
            {formData.healthIssues.hasIssues === 'Yes' && (
              <div style={{marginTop: '10px'}}>
                <input
                  type="text"
                  name="healthDetails"
                  placeholder="Enter health issue details"
                  value={formData.healthIssues.details}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* Allergies Section */}
          <div className={`allergies-section ${styles.allergiesSection}`}>
            <div className={`allergies-header ${styles.allergiesHeader}`}>
              <h3>Allergies</h3>
              <button type="button" onClick={handleAddAllergy} className={`add-allergy-button ${styles.addAllergyButton}`}>
                <span>Add Allergy</span>
              </button>
            </div>
            <div className={`allergy-list ${styles.allergyList}`}>
              {formData.allergies.length > 0 ? (
                formData.allergies.map((allergy, index) => (
                  <div key={index} className={`allergy-item ${styles.allergyItem}`}>
                    <input
                      type="text"
                      placeholder="Allergy name"
                      value={allergy.name}
                      onChange={(e) => handleAllergyChange(index, 'name', e.target.value)}
                    />
                    <select
                      value={allergy.severity}
                      onChange={(e) => handleAllergyChange(index, 'severity', e.target.value)}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                ))
              ) : (
                <div>
                  <p>No allergies added</p>
                </div>
              )}
            </div>
          </div>

          <button type="submit" className={`submit-button ${styles.submitButton}`}>
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
