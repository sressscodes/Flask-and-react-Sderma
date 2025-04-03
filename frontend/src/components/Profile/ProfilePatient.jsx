import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";

const ProfilePatient = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || {};
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    console.log(user); // Log to check user data
  }, [user]);

  const handleResetProfile = () => {
    localStorage.removeItem("userProfile");
    navigate("/");
  };

  const handleLogout = () => {
    navigate("/"); // Adjust this to actual logout logic if needed
  };

  return (
    <div className="profile-container">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} handleResetProfile={handleResetProfile} handleLogout={handleLogout} />
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
          <div>
            <h1>My Bookings</h1>
            <p>Booking history will be displayed here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePatient;
