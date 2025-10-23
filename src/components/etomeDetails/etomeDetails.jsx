import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import image8 from '../../assets/image8.png';
import image11 from '../../assets/image11.png';
import video1 from '../../assets/video1.mp4';
import './etomeDetails.css';

const EtomeDetails = () => {
    return (
        <div className="etomeDetails-container">
            <Header />

            <main className="etomeDetails-main">
                <div className="full-width-image-container">
                    <img
                        src={image8}
                        alt="EtomeDetails full width"
                        className="full-width-image"
                    />
                    <div className="image-overlay">
                        <h1 className="overlay-heading">Etome Dua Business</h1>
                        <p className="overlay-text">
                            Ut vehicula sapien eget leo euismod, at egestas sem volutpat. Aenean facilisis in arcu ut gravida. Suspendisse rhoncus aliquam neque.
                        </p>
                    </div>
                </div>

                <div className="full-width-image-container">
                    <img
                        src={image11}
                        alt="EtomeDetails image11"
                        className="full-width-image"
                    />
                </div>



                <div className="more-about-section">
                    <div  className="more-about-content">
                        <h2 className="section-heading">More about e-note</h2>

                        <div className="feature-tabs">
                            <div className="tab active">
                                <span>Eye-Friendly Display</span>
                            </div>
                            <div className="tab">
                                <span>Paper-Like Writing</span>
                            </div>
                            <div className="tab">
                                <span>Power that Adapts</span>
                            </div>
                            <div className="tab">
                                <span>All day Efficiency</span>
                            </div>
                        </div>

                        <p className="section-description">
                            A crystal-clear 10.3" E-Ink display ensures long hours of comfortable reading and writing – perfect for extended study sessions or deep professional work.
                        </p>
                    </div>

                    <div className="device-image-container">
                        <div className="device-mockup">
                            <div className="device-screen">
                                <div className="device-branding">
                                    <span className="brand-name">Etome</span>
                                    <div className="brand-logo"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                  



                </div>

                <div className="video-container">
                        <video
                            className="video-element"
                            controls
                            muted
                            loop
                            autoPlay
                            playsInline
                        >
                            <source src={video1} type="video/mp4" />
                            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

            </main>

            <Footer />
        </div>
    );
};

export default EtomeDetails;
