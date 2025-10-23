import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import image8 from '../../assets/image8.png';
import image9 from '../../assets/image9.png';
import image10 from '../../assets/image10.png';
import image12 from '../../assets/image12.jpg';
import './etome.css';

const Etome = () => {
    return (
        <div className="etome-container">
            <Header />

            <main  className="etome-main">
                <div style={{
                
                }} className="content-section">
                    <h1 className="content-heading">Heading</h1>

                    <p style={{
                       
                   
                    }} className="content-paragraph">
                        Ut vehicula sapien eget leo euismod, at egestas sem volutpat. Aenean facilisis in arcu ut gravida. Suspendisse rhoncus aliquam neque.
                    </p>
                </div>

                <div className="content-image-container">
                    <img
                        src={image8}
                        alt="Etome content"
                        className="content-image"
                    />
                </div>



                {/* Two Column Section */}
                
                <div className="two-column-section">
                    <div className="left-column">
                        <h2 className="section-heading">Etome Dua Business</h2>
                        <p className="section-paragraph">
                            Ut vehicula sapien eget leo euismod, at egestas sem volutpat. <br /> Aenean facilisis in arcu ut gravida. <br /> Suspendisse rhoncus aliquam <br /> neque.
                        </p>
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
                <div className="additional-content-section">
                    <h2 className="additional-heading">Heading</h2>
                    <p className="additional-paragraph">
                        Ut vehicula sapien eget leo euismod, at egestas sem volutpat. <br /> Aenean facilisis in arcu ut gravida.  Suspendisse rhoncus <br /> aliquam neque.
                    </p>
                </div>
                
                {/* Products Section */}
                <div className="products-section">
                    <div className="products-container">
                        <div className="product-card">
                            <div className="product-image-container">
                                <img 
                                    src={image12} 
                                    alt="Etome Business"
                                    className="product-card-image"
                                />
                               
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">Etome Business</h3>
                                <p className="product-description">Ut vehicula sapien eget leo euismod</p>
                                <div className="product-price">Rs. 399</div>
                                <div className="product-buttons">
                                    <button className="add-to-cart-btn">Add to Cart</button>
                                    <button className="learn-more-card-btn">Learn More</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="product-card">
                            <div className="product-image-container">
                                <img 
                                    src={image10} 
                                    alt="Etome Business"
                                    className="product-card-image"
                                />
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">Etome Business</h3>
                                <p className="product-description">Ut vehicula sapien eget leo euismod</p>
                                <div className="product-price">Rs. 399</div>
                                <div className="product-buttons">
                                    <button className="add-to-cart-btn">Add to Cart</button>
                                    <button className="learn-more-card-btn">Learn More</button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="product-card">
                            <div className="product-image-container">
                                <img 
                                    src={image10} 
                                    alt="Etome Business"
                                    className="product-card-image"
                                />
                                <div className="image-overlay">bg-fb/f4 with image without bg</div>
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">Etome Business</h3>
                                <p className="product-description">Ut vehicula sapien eget leo euismod</p>
                                <div className="product-price">Rs. 399</div>
                                <div className="product-buttons">
                                    <button className="add-to-cart-btn">Add to Cart</button>
                                    <button className="learn-more-card-btn">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </main>

            <Footer />
        </div>
    );
};

export default Etome;
