import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import pic11 from '../../assets/E.png';
import './etome.css';

const Etome = () => {
  const navigate = useNavigate();

  return (
    <div className="etome-page">
      <Header />

      {/* Hero Section */}
      <section className="etome-hero">
        {/* Gradient blobs */}
        <div className="hero-blob hero-blob-blue" />
        <div className="hero-blob hero-blob-green" />

        <div className="hero-content">
          <h1 className="hero-title">
            Building the<br />Future of<br />Learning
          </h1>
          <p className="hero-subtitle">
            Connecting technology, innovation, and sustainability to create
            smarter learning experiences for modern educational environments.
          </p>
          <button className="hero-btn" onClick={() => navigate('/edumart')}>
            Learn More
          </button>
        </div>

        {/* Right side image — blended into background */}
        <div className="hero-image-wrap">
          <img src={pic11} alt="Etome platform" className="hero-image" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Etome;
