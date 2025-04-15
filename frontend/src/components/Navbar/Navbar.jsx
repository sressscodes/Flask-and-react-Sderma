import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import ProfileForm from '../ProfileForm/ProfileForm';

const Navbar = ({
  menu,
  setMenu,
  loginWithRedirect,
  logout,
  user,
  isAuthenticated,
  handleProtectedNavigation,
}) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle Profile Click
  const handleProfileClick = () => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));

    if (storedProfile) {
      if (storedProfile.role === 'patient') {
        navigate('/profilepatient', { state: { name: storedProfile.name } });
      } else if (storedProfile.role === 'dermatologist') {
        navigate('/profiledermatologist', { state: { name: storedProfile.name, id: storedProfile.id } });
      }
    } else {
      setIsProfileOpen(true);
    }
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
      </div>

      <div className="nav-menu">
        <li>
          <Link style={{ textDecoration: 'none', color: '#1c1c1c' }} to='/'>Home</Link>
          {location.pathname === '/' ? <hr /> : null}
        </li>
        <li>
          <Link style={{ textDecoration: 'none', color: '#1c1c1c' }} to='/articles'>Articles</Link>
          {location.pathname === '/articles' ? <hr /> : null}
        </li>
        <li onClick={() => handleProtectedNavigation("/booknow")}>
          <span style={{ textDecoration: 'none', color: '#1c1c1c', cursor: 'pointer' }}>Book Now</span>
          {location.pathname === '/booknow' ? <hr /> : null}
        </li>
        <li onClick={() => handleProtectedNavigation("/getrecommendations")}>
          <span style={{ textDecoration: 'none', color: '#1c1c1c', cursor: 'pointer' }}>Get Recommendations</span>
          {location.pathname === '/getrecommendations' ? <hr /> : null}
        </li>
      </div>

      {!isAuthenticated ? (
        <div className="nav-login">
          <button onClick={loginWithRedirect}>Log In</button>
        </div>
      ) : (
        <div className="profile">
          <p>Hi {user?.given_name || "User "}</p>
          <img 
            src={user?.picture || "default-profile.png"} 
            alt='profile-icon' 
            onClick={() => setShowProfilePopup(true)} 
          />

          {showProfilePopup && (
            <div className="profile-popup" ref={popupRef}>
              <div className="profile-popup-content">
                <div className="profile-card" onClick={handleProfileClick}>
                  <img src={user?.picture || "default-profile.png"} alt='profile-icon' />
                  <p>{user?.email}</p>
                </div>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && <ProfileForm setIsProfileOpen={setIsProfileOpen} />}
    </div>
  );
};

export default Navbar;