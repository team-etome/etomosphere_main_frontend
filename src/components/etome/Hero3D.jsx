import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import pic11 from '../../assets/E.png';
import './etome.css';
import heroVideo from '../../assets/Link.mp4';
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
            Discover technologies designed to transform education through intelligent digital experiences and sustainable innovation, empowering institutions to teach, learn, and grow with confidence.
          </p>
          <button className="hero-btn" onClick={() => navigate('/edumart')}>
            Learn More
          </button>
        </div>

        {/* Right side image — blended into background */}
        <div className="hero-image-wrap">
          <video
            src={heroVideo}
            className="hero-image"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Etome;
