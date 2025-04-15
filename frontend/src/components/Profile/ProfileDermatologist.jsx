import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserMd } from 'react-icons/fa';
import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';
import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ProfileDermatologist = ({ user, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, id } = location.state || {};
  const [activeSection, setActiveSection] = useState("profile");
  const [dermatologistData, setDermatologistData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDermatologistData = async () => {
      if (!id) {
        setError('Dermatologist ID not provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch dermatologist data from Firestore
        const dermatologistsRef = collection(db, 'dermatologists');
        const q = query(dermatologistsRef, where('Dermatologist ID', '==', parseInt(id)));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setDermatologistData({ id: doc.id, ...doc.data() });
        } else {
          setError('Dermatologist not found');
          setLoading(false);
          return;
        }

        // Fetch dermatologist's bookings
        const bookingsRef = collection(db, 'bookings');
        const bookingsQuery = query(
          bookingsRef,
          where('doctor', '==', name),
          orderBy('timestamp', 'desc')
        );
        const bookingsSnapshot = await getDocs(bookingsQuery);
        const bookingsData = bookingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching dermatologist data:', error);
        setError('Failed to fetch dermatologist data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDermatologistData();
  }, [id, name]);

  const handleResetProfile = () => {
    localStorage.removeItem("userProfile");
    navigate("/");
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleResetProfile={handleResetProfile}
        logout={logout}
      />

      <div className="content">
        {activeSection === "profile" && dermatologistData && (
          <div className="profile-details">
            <div className="profile-icon">
              <FaUserMd className='icon-style' />
            </div>
            <h1>Welcome, {dermatologistData.Name}!</h1>
            <p><strong>Bio:</strong> {dermatologistData.Bio}</p>
            <p><strong>Clinic Name:</strong> {dermatologistData["Clinic Name"]}</p>
            <p><strong>City:</strong> {dermatologistData.City}</p>
            <p><strong>Location:</strong> {dermatologistData.Location}</p>
            <p><strong>Expertise:</strong> {dermatologistData.Expertise}</p>
            <p><strong>Contact:</strong> {dermatologistData.Contact}</p>
            <p><strong>Consultation Fee:</strong> NPR {dermatologistData["Consultation Fee (NPR)"]}</p>
          </div>
        )}

        {activeSection === "visits" && (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h1>My Visits</h1>
            </div>
            {bookings.length === 0 ? (
              <p className="no-bookings">No appointments found.</p>
            ) : (
              <div className="bookings-list">
                {bookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <h3>Appointment with <strong>{booking.name}</strong></h3>
                      <span className="booking-status">Confirmed</span>
                    </div>
                    <hr />
                    <div className="booking-details">
                      <p><strong>Email:</strong> {booking.email}</p>
                      <p><strong>Date:</strong> {formatDate(booking.date)}</p>
                      <p><strong>Time:</strong> {formatTime(booking.time)}</p>
                      <p><strong>Concern:</strong> {booking.concern}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDermatologist;