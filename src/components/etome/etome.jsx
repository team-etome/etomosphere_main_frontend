import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import image8 from '../../assets/image8.png';
import image12 from '../../assets/image12.jpg';
import image13 from '../../assets/etomeBusiness.jpg';
import EtomeStylus from '../../assets/EtomeStylus.jpg';
import EtomeEcoBoard from '../../assets/EtomeEcoBoard.jpg';
import etomewitheco from '../../assets/etomewitheco.jpg';
import './etome.css';

const Etome = () => {
    const [showContactInfo, setShowContactInfo] = useState(false);

    const handleEnquireNow = () => {
        setShowContactInfo(true);
    };

    const closeContactInfo = () => {
        setShowContactInfo(false);
    };

    const productCards = [
        {
            id: "etome-dua",
            title: "Etome Dua",
            description:
                "Designed for readers, writers, and creators to work smarter and stay focused.",
            price: "Rs.38500",
            image: image13,
            buttons: [
             
                { kind: "secondary", label: "Enquiry Now", onClick: handleEnquireNow },
            ],        },
        {
            id: "etome-stylus",
            title: "Etome Stylus",
            description:
                "Precision at your fingertips for effortless writing and drawing.",
            price: "Rs.2000",
            image: EtomeStylus,
            buttons: [
             
                { kind: "secondary", label: "Enquiry Now", onClick: handleEnquireNow },
            ],        },
        {
            id: "etome-ecoboard",
            title: "Etome EcoBoard",
            description:
                "Empowering digital learning through smart, connected technology.",
            price: "Rs.40000",
            image: EtomeEcoBoard,
            buttons: [
             
                { kind: "secondary", label: "Enquiry Now", onClick: handleEnquireNow },
            ],
        },
    ];


    return (
        <div className="etome-container">
            <Header />

            <main style={{

                marginTop: "40px"
            }} className="etome-main">
                <div className="content-section">
                    <h1 className="content-heading">The Smarter Learning Device</h1>

                    <p style={{
                        fontSize: "32px",
                        width: "100%",
                        maxWidth: "none",      // ⬅️ cancels the 800px cap
                        margin: 0,             // ⬅️ avoid auto-centering width cap
                        display: "block",
                        boxSizing: "border-box",
                        textAlign: "center"
                    }} className="content-paragraph">
                        Powerful. Intuitive. Purpose-built for education. Etome tablets combine <br /> performance and versatility to bring classrooms to life. Explore features   <br /> and choose the perfect one for your learning environment. </p>

                </div>

                <div style={{

                    marginTop: "20px",

                }} className="content-image-container">
                    <img style={{


                    }}
                        src={etomewitheco}
                        alt="Etome content"
                        className="content-image"
                    />
                </div>



                {/* Two Column Section */}

                <div className="two-column-section">
                    <div className="left-column">
                        <h2 className="section-heading">Etome Dua Business</h2>
                        <p style={{
                            textAlign: "left",
                            fontSize: "20px"
                        }} className="section-paragraph">
                            Etome DUA Business empowers <br /> institutions with an integrated <br /> digital ecosystem that simplifies <br /> operations, enhances <br /> collaboration, and drives smarter <br /> decision-making for educational <br /> and business excellence.                        </p>
                        <div className="button-group">
                            <button className="buy-now-btn">Buy Now</button>
                            <Link to="/etomedetails" className="learn-more-btn">Learn More</Link>
                        </div>
                    </div>


                    <div className="right-column">
                        <img
                            src={image12}
                            alt="Etome Dua Business"
                            className="section-image"
                        />
                    </div>
                </div>

                {/* Additional Content Section */}


                {/* Products Section */}
                <div className="products-section">
                    <div className="products-container">
                        {productCards.map((p) => (
                            <div  key={p.id} className="product-card">
                                <div className="product-image-container">
                                    <img src={p.image} alt={p.title} className="product-card-image" />
                                </div>

                                <div className="product-info">
                                    <h3 className="product-title">{p.title}</h3>
                                    <p className="product-description">{p.description}</p>
                                    <div className="product-price">{p.price}</div>

                                    <div className="product-buttons">
                                        {p.buttons.map((b, i) =>
                                            b.kind === "primary" ? (
                                                <button key={i} className="add-to-cart-btn" onClick={b.onClick}>
                                                    {b.label}
                                                </button>
                                            ) : (
                                                <button key={i} className="learn-more-card-btn" onClick={b.onClick}>
                                                    {b.label}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </main>

            {showContactInfo && (
                <div className="contact-modal-overlay" onClick={closeContactInfo}>
                    <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="contact-modal-header">
                            <h3>Contact Information</h3>
                            <button className="close-btn" onClick={closeContactInfo}>×</button>
                        </div>
                        <div className="contact-modal-content">
                            <div className="contact-item">
                                <div className="contact-icon">📞</div>
                                <div className="contact-details">
                                    <h4>Phone Number</h4>
                                    <p className="contact-value">9061576222</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">📧</div>
                                <div className="contact-details">
                                    <h4>Email Address</h4>
                                    <p className="contact-value">info@etome.in</p>
                                </div>
                            </div>
                            <div className="contact-actions">
                                <button className="copy-btn" onClick={() => navigator.clipboard.writeText('9061576222')}>
                                    Copy Phone
                                </button>
                                <button className="copy-btn" onClick={() => navigator.clipboard.writeText('info@etome.in')}>
                                    Copy Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Etome;
