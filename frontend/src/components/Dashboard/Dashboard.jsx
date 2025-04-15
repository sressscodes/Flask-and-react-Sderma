 import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Dashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'bookings'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("📦 Bookings fetched:", data);
        setBookings(data);
      } catch (error) {
        console.error('❌ Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>All Bookings (Admin)</h1>
        <p>Displaying everything from Firestore</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((b) => (
            <div key={b.id} className="booking-card">
              <div className="booking-header">
                <h3>{b.name || 'No name'} booked {b.doctor || 'No doctor'}</h3>
                <span className="booking-status">{b.email || 'No email'}</span>
              </div>
              <div className="booking-details">
                <p><strong>Date:</strong> {b.date || 'N/A'}</p>
                <p><strong>Time:</strong> {b.time || 'N/A'}</p>
                <p><strong>Concern:</strong> {b.concern || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
