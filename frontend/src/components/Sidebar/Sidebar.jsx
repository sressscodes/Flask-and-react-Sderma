import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ProfileForm from"../ProfileForm/ProfileForm"; // import the form

const Sidebar = ({ activeSection, setActiveSection, logout }) => {
  const [role, setRole] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false); // new state

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (userProfile) {
      setRole(userProfile.role);
    }
  }, []);

  // Handle Reset Profile
  const handleResetProfile = () => {
    setIsProfileOpen(true); // open the form
  };

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

      {/* Profile Modal */}
      {isProfileOpen && <ProfileForm setIsProfileOpen={setIsProfileOpen} />}
    </div>
  );
};

export default Sidebar;