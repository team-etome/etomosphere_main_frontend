import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import image1 from '../../assets/image1.jpeg';
import image2 from '../../assets/image2.png';
import landing from "../../assets/landing.mp4"
import './etomos.css';

const Etomos = () => {
  return (
    <div className="etomos-container">
      <Header />

      {/* Full-viewport background video — fixed behind everything */}
      <div className="image-container">
        <video
          className="etomos-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={landing} type="video/mp4" />
        </video>
      </div>

      {/* Pushes footer below the fold */}
      <div className="etomos-hero-spacer" />

      <Footer />
    </div>
  );
};

export default Etomos;
