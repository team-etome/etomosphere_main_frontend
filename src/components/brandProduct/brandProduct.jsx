import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './brandProduct.css';

const BrandProduct = () => {
  const [brandProducts, setBrandProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get products from localStorage
    const storedProducts = localStorage.getItem('selectedBrandProducts');
    const storedBrand = localStorage.getItem('selectedBrand');
    
    if (storedProducts) {
      try {
        const products = JSON.parse(storedProducts);
        setBrandProducts(products);
        setSelectedBrand(storedBrand || '');
        setLoading(false);
      } catch (error) {
        console.error('Error parsing stored products:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Handle product click - pass specific product to ProductDetail
  const handleProductClick = (product) => {
    // Store the specific product data in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    
    // Navigate to ProductDetail
    navigate('/productdetail');
  };

  if (loading) {
    return (
      <div className="brandproduct-container">
        <Header />
        <main className="brandproduct-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (brandProducts.length === 0) {
    return (
      <div className="brandproduct-container">
        <Header />
        <main className="brandproduct-main">
          <div className="no-products-container">
            <h2>No Products Found</h2>
            <p>No products available for this brand.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  return (
    <div className="brandproduct-container">
      <Header />

      <main className="brandproduct-main">
        {/* Brand Header Section */}
       

        {/* Dynamic Cards based on brand products */}
        <div className="brandproduct-cards-container">
          {brandProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="brandproduct-card"
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <div className="brandproduct-card-image">
                <img
                  src={product.product_images && product.product_images.length > 0 
                    ? product.product_images[0].image_url || product.product_images[0].image
                    : product.image || 'https://via.placeholder.com/300x200'}
                  alt={product.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x200'; }}
                />
              </div>
              <div className="brandproduct-card-content">
                <h3 className="brandproduct-card-name">{product.name}</h3>
              
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrandProduct;
