import React, { useState, useEffect } from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './educosDetails.css';

const EducosDetails = () => {
    const [selectedSolution, setSelectedSolution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedSections, setExpandedSections] = useState({});
    const [selectedProduct, setSelectedProduct]   = useState(null);
    const [showContactInfo, setShowContactInfo]   = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const toggleSection = (sectionIndex) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionIndex]: !prev[sectionIndex]
        }));
    };

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        // Add to configuration if not already added
        setSelectedProducts(prev => {
            const exists = prev.find(p => p.title === product.title);
            if (!exists) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const handleEnquireNow = () => {
        setShowContactInfo(true);
    };

    const closeContactInfo = () => {
        setShowContactInfo(false);
    };
    

    const removeProduct = (productTitle) => {
        setSelectedProducts(prev => prev.filter(p => p.title !== productTitle));
    };

    console.log(selectedSolution, "solution")

    useEffect(() => {
        // Get the selected solution from localStorage
        const solutionData = localStorage.getItem('selectedSolution');
        if (solutionData) {
            setSelectedSolution(JSON.parse(solutionData));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="educos-details-container">
                <Header />
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading solution details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!selectedSolution) {
        return (
            <div className="educos-details-container">
                <Header />
                <div className="no-solution-container">
                    <h2>No Solution Selected</h2>
                    <p>Please go back and select a solution to configure.</p>
                </div>
                <Footer />
            </div>
        );
    }


    return (
        <div className="educos-details-container">
            <Header />

            <main className="educos-details-main">
                <div className="educos-details-content">
                    {/* Main Content Area - Left Side */}
                    <div className="main-content">
                        {/* Solution Header */}
                        <div className="solution-header">
                            <h1 className="solution-title">{selectedSolution.name}</h1>
                            <p className="solution-description">{selectedSolution.description}</p>
                        </div>

                        {/* Interactive Display Section */}
                        <div className="display-screen">
                            <div className="display-content">
                                <img
                                    src={selectedSolution.image}
                                    alt={selectedSolution.name}
                                    className="display-image"
                                />
                            </div>
                        </div>


                        {/* Configuration Section */}

                        <div className="configuration-section">
                           


                            {/* Configuration Summary */}
                            <div className="configuration-summary">
                                <h3 className="section-title">Your Configuration Summary</h3>

                                <div className="selected-items">
                                    {selectedProducts.length > 0 ? (
                                        selectedProducts.map((product, index) => (
                                            <div key={index} className="selected-item">
                                                <span>{product.title}</span>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removeProduct(product.title)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-items">
                                            <p>No products selected yet. Choose products from the categories on the right.</p>
                                        </div>
                                    )}
                                </div>
                                <p className="pricing-note">
                                    Prices and product details will be provided by our sales team after reviewing your request.
                                </p>
                                <button className="enquire-button" onClick={handleEnquireNow}>Enquire Now</button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Right Side */}
                    <div className="sidebar">
                        {/* Search Bar */}
                        <div className="search-section">
                            <div className="search-bar">
                                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                                    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                                </svg>
                                <input type="text" placeholder="Search" className="search-input" />
                            </div>
                        </div>

                        {/* Solution Sections */}
                        <div className="solution-sections">
                            {selectedSolution.sections && selectedSolution.sections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="section-container">
                                    <div
                                        className="category-header"
                                        onClick={() => toggleSection(sectionIndex)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <h3 className="category-title">{section.name}</h3>
                                        <svg
                                            className={`arrow-icon ${expandedSections[sectionIndex] ? 'expanded' : ''}`}
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" />
                                        </svg>
                                    </div>
                                    {expandedSections[sectionIndex] && (
                                        <div className="category-content">
                                            <div className="products-grid">
                                                {section.items && section.items.map((item, itemIndex) => (
                                                    <div
                                                        style={{
                                                            width: "180px",
                                                            height: "230px"
                                                        }}
                                                        key={itemIndex}
                                                        className="product-card"
                                                        onClick={() => handleProductSelect(item)}
                                                    >
                                                        <div className="product-image">
                                                            {item.image ? (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.title}
                                                                    className="product-img"
                                                                />
                                                            ) : (
                                                                <div className="product-placeholder">
                                                                    <span>No Image</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="product-info">
                                                            <h4 className="product-title">{item.title}</h4>
                                                            {/* <p className="product-description">{item.details}</p> */}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Contact Info Modal */}
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
        </div>
    );
};

export default EducosDetails;
