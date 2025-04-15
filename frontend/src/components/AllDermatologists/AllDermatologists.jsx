import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import './AllDermatologists.css';
import { FaUserMd, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const AllDermatologists = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const snapshot = await getDocs(collection(db, "dermatologists"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Remove duplicates by Name
        const uniqueDoctors = data.filter((doctor, index, self) =>
          index === self.findIndex(d => d.Name === doctor.Name)
        );

        setDoctors(uniqueDoctors.slice(0, 50));
      } catch (error) {
        console.error("❌ Error fetching all dermatologists:", error);
        setError("Failed to load dermatologists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="loading-container"><p>Loading dermatologists...</p></div>;
  }

  if (error) {
    return <div className="error-container"><p>{error}</p></div>;
  }

  return (
    <div className="all-dermatologists-page">
      <div className="page-header">
        <h1>Meet Our Dermatologists</h1>
        <p>Find the right specialist for your skin health needs.</p>
      </div>

      {doctors.length === 0 && (
        <div className="no-doctors-message">
          <p>No dermatologists are listed at the moment. Please check back later.</p>
        </div>
      )}

      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card-container">
            <div className="doctor-card-image-placeholder">
              <FaUserMd size={50} color="#bdc3c7" />
            </div>
            <div className="doctor-card-content">
              <h3>{doctor.Name || "Dr. Anonymous"}</h3>
              {doctor["Clinic Name"] && <p className="doctor-clinic">{doctor["Clinic Name"]}</p>}

              <div className="doctor-details">
                {doctor.Expertise && (
                  <div className="detail-item">
                    <FaBriefcase className="detail-icon" />
                    <span>{doctor.Expertise}</span>
                  </div>
                )}
                {(doctor.City || doctor.Location) && (
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{doctor.Location ? `${doctor.Location}, ${doctor.City}` : doctor.City}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDermatologists;