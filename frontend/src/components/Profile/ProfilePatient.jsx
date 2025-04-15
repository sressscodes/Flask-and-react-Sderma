import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import './Profile.css';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const ProfilePatient = ({ user, logout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || {};
  const [activeSection, setActiveSection] = useState("profile");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (!user?.email) return;

      try {
        const q = query(
          collection(db, 'bookings'),
          where('email', '==', user.email)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("📦 User bookings fetched:", data);
        setBookings(data);
      } catch (error) {
        console.error('❌ Failed to fetch user bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [user?.email]);

  const handleResetProfile = () => {
    localStorage.removeItem("userProfile");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} handleResetProfile={handleResetProfile} logout={logout} />
      <div className="content">
        {activeSection === "profile" && (
          <div className="profile-details">
            <div className="profile-icon">
              <img src={user?.picture || "default-profile.png"} alt='profile-icon' />
            </div>
            <h1>Welcome, {name}!</h1>
            <p><strong>Username: </strong>{name}</p>
            <p><strong>Name: </strong>{user?.given_name && user?.family_name ? `${user.given_name} ${user.family_name}` : "Name"}</p>
            <p><strong>Email: </strong>{user?.email || "User email "}</p>
          </div>
        )}

        {activeSection === "bookings" && (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h1>My Bookings</h1>
              <p>Your appointment history</p>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : bookings.length === 0 ? (
              <p>You don’t have any bookings yet.</p>
            ) : (
              <div className="bookings-list">
                {bookings.map((b) => (
                  <div key={b.id} className="booking-card">
                    <div className="booking-header">
                      <h3>You booked <strong>{b.doctor || 'a doctor'}</strong> </h3>
                      <span className="booking-status">Confirmed</span>
                    </div>
                    <hr/>
                    <div className="booking-details">
                      <p><strong>Date:</strong> {b.date}</p>
                      <p><strong>Time:</strong> {b.time}</p>
                      <p><strong>Concern:</strong> {b.concern}</p>
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

export default ProfilePatient;