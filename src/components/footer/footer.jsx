import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import EtomosphereLogo from '../../assets/Etomosphere Full logo.png';
import ContactModal from '../enquiry/ContactModal.jsx';

const Footer = () => {
  const [showContact, setShowContact] = useState(false);

  return (
    <footer className="footer">
      {/* Injecting a lightweight, standard icon stylesheet into the head dynamically.
        This provides beautiful, crisp, normal UI icons without requiring npm packages or local files.
      */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" 
      />

      <div className="footer-top">
        <div className="footer-container">

          {/* Left Section - Logo Image (pushed far left) */}
          <div className="footer-left">
            <img
              src={EtomosphereLogo}
              alt="Etomosphere"
              className="footer-logo-img"
            />
          </div>

          {/* Right Section - Three Columns */}
          <div className="footer-columns">

            {/* Support Column */}
            <div className="footer-column">
              <h3 className="column-heading">Support</h3>
              <div className="contact-items-wrapper">

                {/* Email Item */}
                <div className="contact-item">
                  <i className="bi bi-envelope contact-web-icon"></i>
                  <a href="mailto:info@etome.in" className="contact-text">Email : info@etome.in</a>
                </div>

                {/* Phone Item */}
                <div className="contact-item">
                  <i className="bi bi-telephone contact-web-icon"></i>
                  <span className="contact-text">Phone : 9061576222</span>
                </div>

              </div>
              <button className="contact-sales-btn" onClick={() => setShowContact(true)}>Contact Sales</button>
            </div>

            {/* Office Address Column */}
            <div className="footer-column">
              <h3 className="column-heading">Office Address</h3>
              <p className="office-address">
                142 C, Arickathil Business Centre,<br />
                Kurisummoodu, Changanacherry,<br />
                Kottayam, Kerala, India - 686104
              </p>
            </div>

            {/* Privacy & Terms Column */}
            <div className="footer-column">
              <h3 className="column-heading">Privacy &amp; Terms</h3>
              <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms-conditions" className="footer-link">Terms and Conditions</Link>
              <Link to="/refund-policy" className="footer-link">Return, Cancellation &amp; Refund Policy</Link>
              <Link to="/shipping-policy" className="footer-link">Shipping and Delivery Policy</Link>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Social Media */}
      <div className="footer-bottom">
        <div className="footer-container">
          <p className="footer-copyright">© 2026 Etomosphere. All Rights Reserved.</p>
          <div className="footer-bottom-right">
            <div className="social-icons">
              <a href="https://www.instagram.com/etomosphere/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.facebook.com/p/Etomosphere-Etome-61583826756485/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/etome-works" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@Etomosphere" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="mailto:info@etome.in" className="social-link" aria-label="Email">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </footer>
  );
};

export default Footer;