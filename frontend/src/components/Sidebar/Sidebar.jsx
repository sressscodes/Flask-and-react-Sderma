import React, { useEffect, useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection, handleResetProfile, logout }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile) {
      setRole(userProfile.role);
    }
  }, []);

  return (
    <div className="sidebar">
      <ul>
        <li className={activeSection === "profile" ? "active" : ""} onClick={() => setActiveSection("profile")}>
          Profile
        </li>
        {role === "patient" && (
          <li className={activeSection === "bookings" ? "active" : ""} onClick={() => setActiveSection("bookings")}>
            My Bookings
          </li>
        )}
        {role === "dermatologist" && (
          <li className={activeSection === "visits" ? "active" : ""} onClick={() => setActiveSection("visits")}>
            My Visits
          </li>
        )}
        <li className="reset" onClick={handleResetProfile}>Reset Profile</li>
        <li className="logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
