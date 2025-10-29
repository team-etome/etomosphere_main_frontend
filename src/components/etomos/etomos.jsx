import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import image1 from '../../assets/image1.jpeg';
import image2 from '../../assets/image2.png';
import './etomos.css';

const Etomos = () => {
  return (
    <div className="etomos-container">
      <Header />
      <div className="image-container">
        <video 
          className="etomos-video"
          autoPlay
          loop
          playsInline
          width="100%"
          height="100%"
        >
          <source src="/src/assets/etomosphere.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Footer />
    </div>
  );
};

export default Etomos;
