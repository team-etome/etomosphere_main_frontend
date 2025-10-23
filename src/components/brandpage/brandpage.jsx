import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './brandpage.css';
import { useSelector } from "react-redux";
import axios from "axios";
import image6 from '../../assets/image6.png';

const Brandpage = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get products from localStorage
    const storedProducts = localStorage.getItem('selectedCategoryProducts');
    const storedCategory = localStorage.getItem('selectedCategory');
    
    if (storedProducts) {
      try {
        const products = JSON.parse(storedProducts);
        setCategoryProducts(products);
        setSelectedCategory(storedCategory || '');
        setLoading(false);
      } catch (error) {
        console.error('Error parsing stored products:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Handle product click - filter products by brand
  const handleProductClick = (clickedProduct) => {
    // Get all products from the same brand
    const brandProducts = categoryProducts.filter(p => p.brand === clickedProduct.brand);
    
    // Store brand products in localStorage
    localStorage.setItem('selectedBrandProducts', JSON.stringify(brandProducts));
    localStorage.setItem('selectedBrand', clickedProduct.brand);
    
    // Navigate to brandproduct
    navigate('/brandproduct');
  };

  if (loading) {
    return (
      <div className="brandpage-container">
        <Header />
        <main className="brandpage-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (categoryProducts.length === 0) {
    return (
      <div className="brandpage-container">
        <Header />
        <main className="brandpage-main">
          <div className="no-products-container">
            <h2>No Products Found</h2>
            <p>No products available for this category.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="brandpage-container">
      <Header />

      <main className="brandpage-main">
        {/* Category Header */}
        <div className="brandpage-header">
          <h1 className="brandpage-title">{selectedCategory} Products</h1>
          <p className="brandpage-description">
            Explore all products in the {selectedCategory} category
          </p>
        </div>

        {/* Dynamic Cards based on category products */}
        <div className="brandpage-cards-container">
          {categoryProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="brandpage-product-card"
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <div className="brandpage-front">
                <img
                  src={product.productImages && product.productImages.length > 0 
                    ? product.productImages[0].image || product.productImages[0].image_url || product.productImages[0]
                    : product.image}
                  alt={product.name}
                  loading="lazy"
                />
              </div>
              <div className="brandpage-brand-name">{product.brand}</div>
              {/* <div className="brandpage-product-name">{product.name}</div>
              <div className="brandpage-price">{product.price}</div> */}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Brandpage;