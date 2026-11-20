import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

// Brand & Contact Icons
import FooterLogo from '../../assets/footer-logo.svg';
import MailIcon from '../../assets/icons/mail-icon.svg';
import PhoneIcon from '../../assets/icons/phone-icon.svg';

// Social Icons
import InstagramIcon from '../../assets/icons/social/instagram.svg';
import SocialMailIcon from '../../assets/icons/social/mail-outline.svg';
import LinkedInIcon from '../../assets/icons/social/linkedin.svg';
import XIcon from '../../assets/icons/social/x.svg';
import YouTubeIcon from '../../assets/icons/social/youtube.svg';
import PinterestIcon from '../../assets/icons/social/pinterest.svg';

const POLICY_LINKS = [
  { label: 'Privacy Policy', path: ROUTES.PRIVACY_POLICY },
  { label: 'Terms and Conditions', path: ROUTES.TERMS_CONDITIONS },
  { label: 'Return, Cancellation & Refund Policy', path: ROUTES.REFUND_POLICY },
  { label: 'Shipping and Delivery Policy', path: ROUTES.SHIPPING_POLICY },
];

const SOCIAL_LINKS = [
  { name: 'Instagram', href: '#', icon: InstagramIcon },
  { name: 'Email', href: 'mailto:aaa@gmail.com', icon: SocialMailIcon },
  { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { name: 'X', href: '#', icon: XIcon },
  { name: 'YouTube', href: '#', icon: YouTubeIcon },
  { name: 'Pinterest', href: '#', icon: PinterestIcon },
];

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      {/* Upper Section: Logo + 3 Columns */}
      <div className="site-footer__upper">
        <div className="site-footer__main">
          {/* Brand Logo */}
          <div className="site-footer__brand">
            <Link to={ROUTES.HOME} className="site-footer__logo-link">
              <img
                src={FooterLogo}
                alt="Etomosphere - See. Touch. Believe."
                className="site-footer__logo"
              />
            </Link>
          </div>

          {/* Right Columns Group */}
          <div className="site-footer__columns">
            {/* Column 1: Support */}
            <div className="site-footer__col--support">
              <div className="site-footer__support-top">
                <h3 className="site-footer__heading">Support</h3>

                <ul className="site-footer__list">
                  <li className="site-footer__contact-item">
                    <img
                      src={MailIcon}
                      alt=""
                      aria-hidden="true"
                      className="site-footer__contact-icon"
                    />
                    <a href="mailto:aaa@gmail.com" className="site-footer__link">
                      Email : aaa@gmail.com
                    </a>
                  </li>

                  <li className="site-footer__contact-item">
                    <img
                      src={PhoneIcon}
                      alt=""
                      aria-hidden="true"
                      className="site-footer__contact-icon"
                    />
                    <a href="tel:1234567890" className="site-footer__link">
                      Phone : 123-456-7890
                    </a>
                  </li>
                </ul>
              </div>

              <Link to={ROUTES.CONTACT_SALES} className="site-footer__cta">
                Contact Sales
              </Link>
            </div>

            {/* Column 2: Customer Service */}
            <div className="site-footer__col--service">
              <h3 className="site-footer__heading site-footer__heading--compact">
                Office Address
              </h3>
              <p className="site-footer__text">
                142 C, Arickathil Business Centre, Kurisummoodu, Changanacherry, Kottayam, Kerala, India - 686104
              </p>
            </div>

            {/* Column 3: Privacy & Terms */}
            <div className="site-footer__col--legal">
              <h3 className="site-footer__heading">Privacy &amp; Terms</h3>

              <ul className="site-footer__list">
                {POLICY_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="site-footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Social Icons */}
      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <p className="site-footer__copyright">
            © 2026 Etomosphere. All Rights Reserved.
          </p>

          <div className="site-footer__socials">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="site-footer__social-link"
              >
                <img
                  src={social.icon}
                  alt=""
                  aria-hidden="true"
                  className="site-footer__social-icon"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};