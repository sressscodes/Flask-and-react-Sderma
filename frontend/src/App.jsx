import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import HomePage from './pages/HomePage';
import Articles from './pages/Articles';
import GetRecommendations from './pages/GetRecommendation';
import BookNow from './pages/BookNow';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/footer/footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ProfileDermatologist from './components/Profile/ProfileDermatologist';
import ProfilePatient from './components/Profile/ProfilePatient';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [menu, setMenu] = useState("homepage");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const location = useLocation(); 

  const handleProtectedNavigation = (navigate, path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      setShowLoginPopup(true);
    }
  };

  const hideFooterPages = ["/profiledermatologist", "/profilepatient"];

  return (
    <>
      <NavbarWrapper 
        setMenu={setMenu}
        menu={menu}
        loginWithRedirect={loginWithRedirect}
        logout={logout}
        user={user}
        isAuthenticated={isAuthenticated}
        handleProtectedNavigation={handleProtectedNavigation}
      />
      <Routes>
        <Route path='/' element={<HomePage handleProtectedNavigation={handleProtectedNavigation} setMenu={setMenu} menu={menu} />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/getrecommendations' element={<GetRecommendations />} />
        <Route path='/booknow' element={<BookNow />} />
        <Route path='/profiledermatologist' element={<ProfileDermatologist />} />
        <Route path='/profilepatient' element={<ProfilePatient user={user} />} />
      </Routes>

      {!hideFooterPages.includes(location.pathname) && <Footer />}

      {showLoginPopup && <LoginPopup setShowLoginPopup={setShowLoginPopup} loginWithRedirect={loginWithRedirect} />}
    </>
  );
}

function NavbarWrapper(props) {
  const navigate = useNavigate();
  return <Navbar {...props} handleProtectedNavigation={(path) => props.handleProtectedNavigation(navigate, path)} />;
}

export default App;
