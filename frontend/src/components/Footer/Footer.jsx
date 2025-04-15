import React from 'react'
import './Footer.css'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/footer-logo.png'
import facebook from '../../assets/facebook-icon.png'
import instagram from '../../assets/instagram-icon.png'
import twitter from '../../assets/twitter-icon.png'
import linkedin from '../../assets/linkedin-icon.png'


const Footer = ({ handleProtectedNavigation }) => {

  const navigate = useNavigate();

  const handleFAQClick = () => {
    if (window.location.pathname === "/") {
      const section = document.querySelector(".faq-section");
      section?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate("/", { state: { scrollToFaq: true } });
    }
  };

  return (
    <div>
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-logo">
            <img src={logo} alt="Company Logo" />
            <p>Your trusted skincare partner.</p>
            <button onClick={() => { handleProtectedNavigation("/booknow"); }} >Book Now</button>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/articles">Articles</Link></li>
              <li onClick={() => { handleProtectedNavigation("/getrecommendations"); }}><span>Get Recommendations</span></li>
              <li onClick={handleFAQClick}><span>FAQs</span></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@skincarehub.com</p>
            <p>Phone: +123-456-7890</p>
            <div className="footer-socials">
              <a href="#"><img src={facebook} alt="Facebook" /></a>
              <a href="#"><img src={twitter} alt="Twitter" /></a>
              <a href="#"><img src={instagram} alt="Instagram" /></a>
              <a href="#"><img src={linkedin} alt="LinkedIn" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 S Derma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
