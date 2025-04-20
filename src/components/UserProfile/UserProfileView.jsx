import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEdit, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import styles from './UserProfile.module.css';

const UserProfileView = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Also check userProfile in localStorage for consistency
  const [profileData, setProfileData] = React.useState(null);
  
  React.useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }
  }, []);
  
  // Use profile data from localStorage if available, otherwise fall back to user from auth context
  const profile = profileData || user;

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!profile) {
    return (
      <div className={`profile-view-container ${styles.profileViewContainer}`}>
        <div className="profile-card">
          <h2>No Profile Found</h2>
          <button onClick={() => navigate('/profile/edit')} className="edit-button">
            Create Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`profile-view-container ${styles.profileViewContainer}`}>
      <div className={`profile-cards-container ${styles.profileCardsContainer}`}>
        {/* Left Card - Basic Info */}
        <div className={`profile-basic-card ${styles.profileBasicCard}`}>
          <div className={`profile-photo ${styles.profilePhoto}`}>
            {profile.photo ? (
              <img src={profile.photo} alt={`${profile.firstName} ${profile.lastName}`} className={`profile-image ${styles.profileImage}`} />
            ) : (
              <div className={`profile-photo-placeholder ${styles.profilePhotoPlaceholder}`}>No Photo</div>
            )}
          </div>
          <div className={`profile-name ${styles.profileName}`}>{profile.firstName} {profile.lastName}</div>
          
          <div className={`profile-stat-row ${styles.profileStatRow}`}>
            <span className={`profile-stat-label ${styles.profileStatLabel}`}>Gender</span>
            <span className={`profile-stat-value ${styles.profileStatValue}`}>{profile.gender || 'Not specified'}</span>
          </div>
          
          <div className={`profile-stat-row ${styles.profileStatRow}`}>
            <span className={`profile-stat-label ${styles.profileStatLabel}`}>Age</span>
            <span className={`profile-stat-value ${styles.profileStatValue}`}>{profile.dateOfBirth ? calculateAge(profile.dateOfBirth) : 'N/A'}</span>
          </div>
          
          <div className={`profile-stat-row ${styles.profileStatRow}`}>
            <span className={`profile-stat-label ${styles.profileStatLabel}`}>Height</span>
            <span className={`profile-stat-value ${styles.profileStatValue}`}>{profile.height ? `${profile.height}cm` : 'Not specified'}</span>
          </div>
          
          <div className={`profile-stat-row ${styles.profileStatRow}`}>
            <span className={`profile-stat-label ${styles.profileStatLabel}`}>Weight</span>
            <span className={`profile-stat-value ${styles.profileStatValue}`}>{profile.weight ? `${profile.weight}kg` : 'Not specified'}</span>
          </div>
        </div>
        
        {/* Middle Card - Personal Details */}
        <div className={`profile-details-card ${styles.profileDetailsCard}`}>
          <div className={`profile-details-header ${styles.profileDetailsHeader}`}>
            <div className={`profile-details-title ${styles.profileDetailsTitle}`}>Personal Details</div>
            <button onClick={() => navigate('/profile/edit')} className={`profile-edit-button ${styles.profileEditButton}`}>
              <FaEdit />
            </button>
          </div>
          
          <div className={`profile-details-grid ${styles.profileDetailsGrid}`}>
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>First Name</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>{profile.firstName}</div>
            </div>
            
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>Last Name</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>{profile.lastName}</div>
            </div>
            
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>Birth Date</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>{profile.dateOfBirth ? formatDate(profile.dateOfBirth) : 'Invalid Date'}</div>
            </div>
            
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>Address</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>{profile.address || 'Not specified'}</div>
            </div>
            
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>Phone Number</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>{profile.phoneNumber || 'Not specified'}</div>
            </div>
            
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>Email</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>{profile.email || 'Not specified'}</div>
            </div>
            
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>Blood Group</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>{profile.bloodGroup || 'Not specified'}</div>
            </div>
            
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>Blood Pressure</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>{profile.bloodPressure || 'Not specified'}</div>
            </div>
            
            <div className={`profile-detail-item ${styles.profileDetailItem}`}>
              <div className={`profile-detail-label ${styles.profileDetailLabel}`}>Health Issues</div>
              <div className={`profile-detail-value ${styles.profileDetailValue}`}>
                {profile.healthIssues && profile.healthIssues.hasIssues === 'Yes' ? profile.healthIssues.details : 'None'}
              </div>
            </div>
          </div>
          
          <div className={`profile-logout ${styles.profileLogout}`} onClick={logout}>
            <FaSignOutAlt />
            <span>Log Out</span>
          </div>
        </div>
      </div>
      
      {/* Allergies Card - Now positioned below other cards and left-aligned */}
      <div className={`profile-allergies-card ${styles.profileAllergiesCard}`}>
        <div className={`profile-allergies-title ${styles.profileAllergiesTitle}`}>Allergies</div>
        
        <div className={`profile-allergies-list ${styles.profileAllergiesList}`}>
          {profile.allergies && profile.allergies.length > 0 ? (
            profile.allergies.map((allergy, idx) => (
              <div key={idx} className={`profile-allergy-item ${styles.profileAllergyItem}`}>
                <span className={`profile-allergy-name ${styles.profileAllergyName}`}>{allergy.name}</span>
                <span className={`profile-allergy-severity severity-${allergy.severity.toLowerCase()} ${styles.profileAllergySeverity} ${styles[`severity${allergy.severity}`]}`}>
                  {allergy.severity}
                </span>
              </div>
            ))
          ) : (
            <div>No allergies reported</div>
          )}
        </div>
        
        <div className={`profile-add-allergy ${styles.profileAddAllergy}`} onClick={() => navigate('/profile/edit')}>
          <FaPlus />
          <span>Add Allergy</span>
        </div>
      </div>


    </div>
  );
};

export default UserProfileView;
