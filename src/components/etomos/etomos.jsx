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
        <img src={image2} alt="Etomos content" className="etomos-image" />
      </div>
      <Footer />
    </div>
  );
};

export default Etomos;
