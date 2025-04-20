import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecondSection from './components/secondsection';
import ServicesSection from './components/ServicesSection';
import Services from './components/Services/Services';
import Marquee from './components/Marquee/Marquee';
import ContactUs from './components/ContactUs/ContactUs';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonial from './components/Testimonial';
import Works from './components/Works';
import FAQ from './components/FAQ';
import DoctorsList from './components/DoctorsList/DoctorsList';
import DoctorPage from './components/DoctorPage/DoctorPage';
import VideoConsultation from './components/VideoConsultation/VideoConsultation';
import AboutUs from './components/AboutUs/AboutUs';
import MyAppointments from './components/Appointments/MyAppointments';
import BookAppointment from './components/Appointments/BookAppointment';
import UserProfileForm from './components/UserProfile/UserProfileForm';
import UserProfileView from './components/UserProfile/UserProfileView';
import SignUp from './components/Auth/SignUp';
import PrivateRoute from './components/Auth/PrivateRoute';
import Footer from './components/Footer/Footer';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import homeStyles from './components/Home/Home.module.css';
import { Link } from 'react-router-dom';


const AppContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // If user is logged in but no profile exists, redirect to profile edit
      const userProfile = localStorage.getItem('userProfile');
      if (!userProfile) {
        navigate('/profile/edit');
      }
    }
  }, [user, navigate]);

  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className={`hero-section ${homeStyles.heroSection}`}>
                <div className={`hero-content ${homeStyles.heroContent}`}>
                  <div className={`tag-line ${homeStyles.tagLine}`}>
                    <LocalHospitalIcon className={`icon ${homeStyles.icon}`} />
                    <span>Say goodbye to long waiting rooms and hello to instant care.</span>
                  </div>

                  <h1>
                    Your <span className={`highlight ${homeStyles.highlight}`}>Best Healthcare</span><br />
                    <span className={`highlight ${homeStyles.highlight}`}>Experience</span> Awaits
                  </h1>

                  <p className={`subtitle ${homeStyles.subtitle}`}>
                    Access top-notch medical care from the comfort of your home.<br />
                    Connect with certified doctors anytime, anywhere — your health, simplified.
                  </p>

                  <Link to="/services">
  <button className={`explore-button ${homeStyles.exploreButton}`}>
    Explore Our Services
  </button>
</Link>                </div>

                <div className={`hero-image ${homeStyles.heroImage}`}>
                  <img src="/images/doctor.png" alt="Doctor" />
                </div>
              </div>

              <AppointmentForm />
              <SecondSection />
              <Marquee />
              <ServicesSection />
              <Marquee />
              <WhyChooseUs />
              <Testimonial />
              <Works />
              <FAQ />
              <Footer />
            </div>
          }
        />
        <Route path="/services" element={<><Services /><Footer /></>} />
        <Route path="/contact" element={<><ContactUs /><Footer /></>} />
        <Route path="/about" element={<><AboutUs /><Footer /></>} />
        <Route path="/signup" element={<><SignUp /><Footer /></>} />
        <Route
          path="/doctors"
          element={
            <PrivateRoute>
              <DoctorsList />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctors/:id"
          element={
            <PrivateRoute>
              <DoctorPage />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfileView />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <UserProfileForm />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/video-consultation"
          element={
            <PrivateRoute>
              <VideoConsultation />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <PrivateRoute>
              <MyAppointments />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="/book-appointment/:id"
          element={
            <PrivateRoute>
              <BookAppointment />
              <Footer />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
