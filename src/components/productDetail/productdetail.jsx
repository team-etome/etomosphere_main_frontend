import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import image7 from '../../assets/image7.png';
import './productdetail.css';
import { useSelector } from "react-redux";
import axios from "axios";

const ProductDetail = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(false);
    const [cartMessage, setCartMessage] = useState('');
    const [showContactInfo, setShowContactInfo] = useState(false);
    const navigate = useNavigate();
    
    const APIURL = useSelector((state) => state.APIURL?.url);

    useEffect(() => {
        // Get product data from localStorage
        const storedProduct = localStorage.getItem('selectedProduct');
        
        if (storedProduct) {
            try {
                const productData = JSON.parse(storedProduct);
                setProduct(productData);
                setLoading(false);
            } catch (error) {
                console.error('Error parsing stored product:', error);
                setLoading(false);
            }
        } else {
            // If no product data and user was redirected from login, show message
            const redirectUrl = localStorage.getItem('redirectAfterLogin');
            if (redirectUrl && redirectUrl.includes('/productdetail')) {
                setCartMessage('Please select a product to view details');
            }
            setLoading(false);
        }
    }, []);

    // Create product images array strictly from product_images
    const productImages = (product?.product_images && product.product_images.length > 0)
        ? product.product_images.map((img, index) => ({
            id: index + 1,
            src: img.image_url || 'https://via.placeholder.com/300x200',
            alt: `${product.name} - Image ${index + 1}`
        }))
        : [
            { id: 1, src: image7, alt: `${product?.name || 'Product'} - Main View` }
        ];

    const handleAddToCart = async () => {
        // Check if user is logged in
        const authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        console.log('Auth token:', authToken);
        console.log('User data:', userData);
        
        if (!userData) {
            // Store current page URL for redirect after login
            const currentUrl = window.location.pathname + window.location.search;
            localStorage.setItem('redirectAfterLogin', currentUrl);
            alert('Please login to add items to cart');
            navigate('/signin');
            return;
        }
        
        // If no authToken but userData exists, we might need to handle this differently
        if (!authToken) {
            console.log('No auth token found, but user is logged in. This might be a session-based auth.');
            // For now, we'll proceed without the token and see what the backend returns
        }
        
        try {
            setCartLoading(true);
            setCartMessage('');
            
            // Get user ID from stored user data
            const user = JSON.parse(userData);
            const userId = user.id;

            console.log(userId, "userId")
            
            // Prepare cart data
            const cartData = {

                product_id: product.id, 
                quantity: 1,
                user : userId
                
            };
            
            console.log('Adding to cart:', cartData);
            
            // Prepare headers
            const headers = {
                'Content-Type': 'application/json'
            };
            
            // Add Authorization header only if token exists
            if (authToken) {
                headers['Authorization'] = `Bearer ${authToken}`;
            }
            
            console.log('Making API call with headers:', headers);
            
            // Make API call to add to cart
            const response = await axios.post(`${APIURL}/api/addCart/`, cartData, {
                headers: headers
            });
            
            console.log('Cart response:', response.data);
            setCartMessage('Product added to cart successfully!');
            
            // Clear message after 3 seconds
            setTimeout(() => {
                setCartMessage('');
            }, 3000);
            
        } catch (error) {
            console.error('Error adding to cart:', error);
            
            if (error.response?.status === 401) {
                alert('Session expired. Please login again.');
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                navigate('/signin');
            } else if (error.response?.data) {
                setCartMessage(`Error: ${error.response.data.detail || 'Failed to add to cart'}`);
            } else {
                setCartMessage('Failed to add to cart. Please try again.');
            }
        } finally {
            setCartLoading(false);
        }
    };


    const handleEnquireNow = () => {
        setShowContactInfo(true);
    };

    const closeContactInfo = () => {
        setShowContactInfo(false);
    };

    const handleBuyAmazon = () => {
        console.log('Buy via Amazon');
        // Handle Amazon purchase
    };

    const handleBuyFromUs = () => {
        console.log('Buy from us');
        // Handle direct purchase
    };

    if (loading) {
        return (
            <div className="productdetail-container">
                <Header />
                <main className="productdetail-main">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Loading product details...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="productdetail-container">
                <Header />
                <main className="productdetail-main">
                    <div className="no-product-container">
                        <h2>No Product Found</h2>
                        <p>No product data available.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="productdetail-container">
            <Header />
            
            <main className="productdetail-main">
                <div className="product-detail-content">
                    {/* Left Column - Product Image Gallery */}
                    <div className="product-image-section">
                        <div className="responsive-image-container">
                            <img 
                                src={productImages[selectedImage]?.src || 'https://via.placeholder.com/300x200'} 
                                alt={productImages[selectedImage]?.alt || product.name} 
                                className="responsive-product-image"
                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x200'; }}
                            />
                        </div>
                        
                        {/* Image Navigation - only show if multiple images */}
                        {productImages.length > 1 && (
                            <div className="image-navigation">
                                <button className="nav-arrow left">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6"/>
                                    </svg>
                                </button>
                                
                                <div className="thumbnail-container">
                                    {productImages.map((image, index) => (
                                        <button
                                            key={image.id}
                                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img 
                                                src={image.src} 
                                                alt={image.alt}
                                                className="thumbnail-image"
                                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/100x100'; }}
                                            />
                                        </button>
                                    ))}
                                </div>
                                
                                <button className="nav-arrow right">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6"/>
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Additional Images Below - if more than 1 image */}
                       
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="product-info-section">
                        <div className="product-info">
                            <h1 className="product-title">{product.name}</h1>
                            
                            <p className="product-description">
                                {product.description || 'No description available.'}
                            </p>
                            
                            {/* <div className="product-price">{product.price}</div> */}
                            
                            <div className="action-buttons">
                                {/* <button 
                                    className="cart-button" 
                                    onClick={handleAddToCart}
                                    disabled={cartLoading}
                                >
                                    {cartLoading ? 'Adding to Cart...' : 'Add To Cart'}
                                </button> */}
                                
                                <button className="enquiry-button" onClick={handleEnquireNow}>
                                    Enquire Now
                                </button>
                            </div>
                            
                            {/* Cart Message */}
                            {cartMessage && (
                                <div className={`cart-message ${cartMessage.includes('Error') ? 'error' : 'success'}`}>
                                    {cartMessage}
                                </div>
                            )}
                            
                            <div className="product-details-section">
                                <button 
                                    className="details-toggle"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    <span>Product Details</span>
                                    <svg 
                                        className={`details-icon ${showDetails ? 'expanded' : ''}`} 
                                        viewBox="0 0 24 24" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        strokeWidth="2"
                                    >
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </button>
                                
                                {showDetails && (
                                    <div className="details-content">
                                        {/* Product Specifications */}
                                        {product.spec_json && Object.keys(product.spec_json).length > 0 && (
                                            <div className="specs-section">
                                                <h3>Product Specifications</h3>
                                                <div className="specs-grid">
                                                    {Object.entries(product.spec_json).map(([key, value], index) => (
                                                        <div key={index} className="spec-item">
                                                            <span className="spec-label">
                                                                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                                                            </span>
                                                            <span className="spec-value">
                                                                {typeof value === 'object' 
                                                                    ? (Array.isArray(value) 
                                                                        ? value.join(', ') 
                                                                        : Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', '))
                                                                    : String(value)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Product Variants */}
                                        {product.variants && product.variants.length > 0 && (
                                            <div className="variants-section">
                                                <h3>Product Variants</h3>
                                                <div className="variants-grid">
                                                    {product.variants.map((variant, index) => (
                                                        <div key={index} className="variant-item">
                                                            <h4>{variant.variant_name || `Variant ${index + 1}`}</h4>
                                                            <div className="variant-details">
                                                                {variant.price && (
                                                                    <div className="variant-detail">
                                                                        {/* <span className="variant-label">Price:</span> */}
                                                                        {/* <span className="variant-value">Rs. {variant.price}</span> */}
                                                                    </div>
                                                                )}
                                                                {variant.sku && (
                                                                    <div className="variant-detail">
                                                                        <span className="variant-label">SKU:</span>
                                                                        <span className="variant-value">{variant.sku}</span>
                                                                    </div>
                                                                )}
                                                                {variant.stock_status && (
                                                                    <div className="variant-detail">
                                                                        <span className="variant-label">Stock:</span>
                                                                        <span className="variant-value">{variant.stock_status}</span>
                                                                    </div>
                                                                )}
                                                                {variant.spec_json && Object.keys(variant.spec_json).length > 0 && (
                                                                    <div className="variant-specs">
                                                                        <h5>Variant Specifications:</h5>
                                                                        {Object.entries(variant.spec_json).map(([key, value], specIndex) => (
                                                                            <div key={specIndex} className="variant-spec-item">
                                                                                <span className="variant-spec-label">
                                                                                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:
                                                                                </span>
                                                                                <span className="variant-spec-value">
                                                                                    {typeof value === 'object' 
                                                                                        ? (Array.isArray(value) 
                                                                                            ? value.join(', ') 
                                                                                            : Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', '))
                                                                                        : String(value)}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Additional Product Information */}
                                       
                                    </div>
                                )}
                            </div>
                            
                        </div>
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

export default ProductDetail;

