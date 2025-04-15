import React, { useState, useEffect } from 'react';
import './CSS/BookNow.css';

import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  limit
} from 'firebase/firestore';
import { db } from '../firebase';

const BookNow = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    concern: '',
    doctor: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsRef = collection(db, 'dermatologists');
        const q = query(doctorsRef, limit(50)); //  Limit to 50
        const snapshot = await getDocs(q);

        const rawDoctors = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().Name || doc.data().name
        }));

        //  Remove duplicates by name
        const uniqueDoctors = rawDoctors.filter(
          (doc, index, self) =>
            index === self.findIndex(d => d.name === doc.name)
        );

        setDoctors(uniqueDoctors);
      } catch (error) {
        console.error(' Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => setConfirmationMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [confirmationMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        timestamp: serverTimestamp()
      });

      setConfirmationMessage(' Your booking has been submitted!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        concern: '',
        doctor: ''
      });

    } catch (error) {
      console.error(' Failed to submit booking:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="book-now-container">
      <div className="book-now-header">
        <h1>Book Your Appointment</h1>
        <p>Schedule a consultation with our expert dermatologists</p>
      </div>

      <div className="booking-form-container">
        <form onSubmit={handleSubmit} className="booking-form">
          {confirmationMessage && (
            <div className="confirmation-message">
              {confirmationMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="doctor">Select Dermatologist</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Choose a dermatologist</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>{doc.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Preferred Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Preferred Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="concern">Skin Concern</label>
            <textarea
              id="concern"
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              required
              placeholder="Briefly describe your skin concern"
              rows="4"
            />
          </div>

          <button type="submit" className="submit-booking-btn">
            Confirm Booking
          </button>
        </form>

        <div className="booking-info">
          <h3>Important Information</h3>
          <ul>
            <li>Appointments are confirmed via email and SMS</li>
            <li>Please arrive 10 minutes before your scheduled time</li>
            <li>Cancellations must be made 24 hours in advance</li>
            <li>First-time patients should bring their ID and insurance information</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
