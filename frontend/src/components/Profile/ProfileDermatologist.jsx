import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserMd } from 'react-icons/fa';
import './Profile.css';
import Sidebar from '../Sidebar/Sidebar';

const ProfileDermatologist = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const location = useLocation();
  const { name, id } = location.state || {};
  const [activeSection, setActiveSection] = useState("profile");
  const [dermatologistDetails, setDermatologistDetails] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dermatologists');
      const jsonData = await response.json();
      setData(jsonData);

      const foundDermatologist = jsonData.find(
        (d) => d["Dermatologist ID"].toString() === id
      );
      setDermatologistDetails(foundDermatologist);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleResetProfile = () => {
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="profile-container">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleResetProfile={handleResetProfile}
        handleLogout={handleLogout}
      />
      
      <div className="content">
        {activeSection === "profile" && dermatologistDetails && (
          <div className="profile-details">
            <div className="profile-icon">
              <FaUserMd className='icon-style' />
            </div>
            <h1>Welcome, {dermatologistDetails.Name}!</h1>
            <p><strong>Bio:</strong> {dermatologistDetails.Bio}</p>
            <p><strong>Clinic Name:</strong> {dermatologistDetails["Clinic Name"]}</p>
            <p><strong>City:</strong> {dermatologistDetails.City}</p>
            <p><strong>Location:</strong> {dermatologistDetails.Location}</p>
            <p><strong>Expertise:</strong> {dermatologistDetails.Expertise}</p>
            <p><strong>Contact:</strong> {dermatologistDetails.Contact}</p>
            <p><strong>Consultation Fee:</strong> NPR {dermatologistDetails["Consultation Fee (NPR)"]}</p>
          </div>
        )}

        {activeSection === "visits" && (
          <div className="visit-history">
            <h1>My Visits</h1>
            <p>Visit history will be displayed here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDermatologist;
