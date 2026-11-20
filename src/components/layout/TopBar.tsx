import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

// Import exported Figma SVGs
import TruckIcon from '../../assets/icons/truck-icon.svg';
import BoltIcon from '../../assets/icons/bolt-icon.svg';
import HeadsetIcon from '../../assets/icons/headset-icon.svg';

export const TopBar: React.FC = () => {
  return (
    <div className="topbar">
      <div className="topbar__container">
        {/* Left Announcements */}
        <div className="topbar__announcements">
          <div className="topbar__item">
            <img
              src={TruckIcon}
              alt=""
              aria-hidden="true"
              className="topbar__icon topbar__icon--truck"
            />
            <span>Free Delivery on Eligible Orders</span>
          </div>

          <div className="topbar__item topbar__item--muted">
            <img
              src={BoltIcon}
              alt=""
              aria-hidden="true"
              className="topbar__icon topbar__icon--bolt"
            />
            <span>Exclusive Online Offers</span>
          </div>
        </div>

        {/* Right Utility Link */}
        <div className="topbar__actions">
          <Link to={ROUTES.CONTACT} className="topbar__link">
            <img
              src={HeadsetIcon}
              alt=""
              aria-hidden="true"
              className="topbar__icon topbar__icon--headset"
            />
            <span>Need Help? Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
};