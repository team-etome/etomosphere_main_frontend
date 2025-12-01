import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* Left Section - Logo and Tagline */}
          <div className="footer-left">
            <h1 className="footer-logo">ETOMOSPHERE</h1>
            <p className="footer-tagline">See. Touch. Believe.</p>
          </div>

          {/* Right Section - Three Columns */}
          <div className="footer-columns">
            {/* Support Column */}
            {/* <div className="footer-column">
              <h3 className="column-heading">Support</h3>
              <div className="contact-items-wrapper">

                <div className="contact-item">

                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>

                  <span>Email: info@etome.com</span>

                </div>



                <div className="contact-item">
                  <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Phone: 9061576222</span>
                </div>


              </div>
              
              <button className="contact-sales-btn">Contact Sales</button>
              
            </div> */}

            {/* Privacy & Terms Column */}
            <div className="footer-column">
              <h3 className="column-heading">Privacy & Terms</h3>
              <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link to="/terms-conditions" className="footer-link">Terms and Conditions</Link>
              <Link to="/refund-policy" className="footer-link">Cancellation & Refund Policy</Link>
            </div>

            {/* Office Address Column */}
            <div className="footer-column">
              <h3 className="column-heading">Office Address</h3>
              <p className="office-address">
                142 C, Arickathil Business Centre, <br /> Kurisummoodu, Changanacherry, <br /> Kottayam, Kerala, India - 686104
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright and Social Media */}
      <div className="footer-bottom">
        <div className="footer-container">
         
          <div className="footer-bottom-right">
            <div className="social-icons">
              <a href="#" className="social-link" aria-label="Instagram">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Email">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="X (Twitter)">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8a4 4 0 0 0-4 4c0 1.1.4 2.1 1.1 2.7.1.1.2.1.3 0 .1-.1.1-.2 0-.3-.6-.5-1-1.3-1-2.2 0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.2-1.3 4-3.2 4-.5 0-1-.2-1.2-.5 0 1.1.8 2.1 2 2.1.8 0 1.5-.4 2-1 .4-.6.6-1.4.6-2.2 0-3-2.4-5.4-5.4-5.4S6.6 9 6.6 12c0 .9.3 1.7.8 2.3.1.1.1.2.1.3 0 .2-.1.4-.3.4h-.2c-1.1-.3-1.8-1.3-1.8-2.5 0-3.5 2.8-6.3 6.3-6.3s6.3 2.8 6.3 6.3c0 3.5-2.2 6.3-5.2 6.3-1 0-1.9-.5-2.2-1.2l-.6 2.3c-.2.8-.7 1.9-1 2.5h2.5c.1-.1.2-.2.2-.3l.5-2.1c.3.4.8.7 1.4.7 1.7 0 3-1.4 3-3.2 0-2.2-1.8-4-4-4z" />
                </svg>
              </a>
              <a href="#" className="social-link" aria-label="Reddit">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      
    </footer>
  );
};

export default Footer;
