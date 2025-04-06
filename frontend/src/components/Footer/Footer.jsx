import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom";
import logo from '../../assets/footer-logo.png'
import facebook from '../../assets/facebook-icon.png'
import instagram from '../../assets/instagram-icon.png'
import twitter from '../../assets/twitter-icon.png'
import linkedin from '../../assets/linkedin-icon.png'


const Footer = ({ handleProtectedNavigation }) => {
  return (
    <div>
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-logo">
            <img src={logo} alt="Company Logo" />
            <p>Your trusted skincare partner.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/articles">Articles</Link></li>
              <li onClick={() => { handleProtectedNavigation("/getrecommendations"); }}><span>Get Recommendations</span></li>
              <li onClick={() => { handleProtectedNavigation("/booknow"); }} ><span>Book Now</span></li>
              <li><Link to='/'>FAQs</Link></li>
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
