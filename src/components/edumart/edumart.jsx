import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import './edumart.css';
import { useSelector } from "react-redux";
import axios from "axios";

const groupProductsByCategory = (items) => {
  const map = {};
  const categoryMap = {}; // Track unique categories
  
  items.forEach((p) => {
    const letter = p.category?.charAt(0)?.toUpperCase() || "#";
    const category = p.category;
    
    // Only add if we haven't seen this category before
    if (!categoryMap[category]) {
      categoryMap[category] = true;
      map[letter] = map[letter] ? [...map[letter], p] : [p];
    }
  });
  
  return Object.keys(map)
    .sort()
    .map((letter) => ({ letter, items: map[letter] }));
};

const Edumart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const APIURL = useSelector((state) => state.APIURL?.url);


  console.log(products,"products")

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching products from:', `${APIURL}/api/products/`);
      
      const response = await axios.get(`${APIURL}/api/products/`);
      console.log('Products fetched successfully:', response.data);
      
          // Transform backend data to match frontend structure
          const transformedProducts = response.data.products.map((product, index) => ({
            id: product.id || index + 1,
            // Store the specific fields you requested
            name: product.name || 'Unnamed Product',
            category: product.brand?.category?.name || 'General',
            image: product.brand?.category?.images && product.brand.category.images.length > 0
              ? product.brand.category.images[0].image_url
              : product.images && product.images.length > 0
              ? product.images[0].image
              : 'https://via.placeholder.com/300x200',
            description: product.description || product.brand?.category?.description || 'No description available.',
            // Additional pricing and display data
            price: product.variants && product.variants.length > 0
              ? `Rs. ${product.variants[0].price || 'N/A'}`
              : 'Price not available',
            rating: 4.5, // Default rating since not in backend
            // Store additional data for detailed view
            specs: product.spec_json || {},
            features: product.variants && product.variants.length > 0
              ? product.variants[0].spec_json || {}
              : {},
            stockStatus: product.variants && product.variants.length > 0
              ? product.variants[0].stock_status || 'in_stock'
              : 'in_stock',
            // Store original backend data for reference
            brand: product.brand?.name || 'Unknown Brand',
            lifecycleStatus: product.lifecycle_status || 'active',
            shortCode: product.short_code || '',
            createdAt: product.created_at || '',
            // Store category details
            categorySlug: product.brand?.category?.slug || '',
            categoryDescription: product.brand?.category?.description || '',
            // Store product images
            productImages: product.images || []
          }));
      
      setProducts(transformedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Using sample data.');
      // Fallback to sample data if API fails
      setProducts([
        { id: 1, name: 'Etome Dua Business', category: 'Digital Note-taking Device', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 399', rating: 4.6, description: 'Paper-like writing with advanced palm rejection.' },
        { id: 2, name: 'Etome Pro Max', category: 'Professional Tablet', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 599', rating: 4.6, description: 'Paper-like writing with advanced palm rejection.' },
        { id: 3, name: 'Digital Whiteboard', category: 'Interactive Display', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 799', rating: 4.6, description: 'Paper-like writing with advanced palm rejection.' },
        { id: 4, name: 'Smart Pen', category: 'Accessory', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 199', rating: 4.6, description: 'Paper-like writing with advanced palm rejection.' },
        { id: 5, name: 'Study Tablet', category: 'Educational Device', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 499' },
        { id: 6, name: 'Learning Monitor', category: 'Display', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 899' },
        { id: 7, name: 'Note Pad Pro', category: 'Digital Writing', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 349' },
        { id: 8, name: 'E-Ink Reader', category: 'Reading Device', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 449' },
        { id: 9, name: 'Advanced Calculator', category: 'Accessory', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 299' },
        { id: 10, name: 'Business Tablet', category: 'Professional Tablet', image: 'https://imgs.search.brave.com/UAoO7zfp3sAa18neVJ4ldklkL_Q4ER1CAPbtYtiRDDs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/ZnJvbnQuZnJlZXBp/ay5jb20vaG9tZS9h/bm9uLXJ2bXAvY3Jl/YXRpdml0eS91cHNj/YWxlci1tYWduaWZp/Yy1tb2RlbHMtcG9z/dGVyLXYyLndlYnA', price: 'Rs. 699' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [APIURL]);

  // Handle product click
  const handleProductClick = (product) => {
    // Get all products from the same category
    const categoryProducts = products.filter(p => p.category === product.category);
    
    // Store all products from this category in localStorage
    localStorage.setItem('selectedCategoryProducts', JSON.stringify(categoryProducts));
    localStorage.setItem('selectedCategory', product.category);
    
    // Navigate to brandpage
    navigate('/brandpage');
  };

  // Group products by category
  const productGroups = groupProductsByCategory(products);

  return (
    <div className="edumart-container">
      <Header />

      <main className="edumart-main">
        <section className="products-section">
          <h1 className="products-title">All Products</h1>
          <p className="products-description">
            Explore our complete range of trusted solutions — from displays and
            tablets<br />
            to software and AR/VR. Find exactly what you need for smarter
            learning and<br />
            collaboration.
          </p>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={fetchProducts} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="alphabet-products-container gp-wrap">
          {productGroups.map(({ letter, items }) => {
            const isSingle = items.length === 1;
            return (
              <section
                key={letter}
                className={`alpha-row ${isSingle ? "single" : "multi"}`}
                aria-label={`Products with category starting with ${letter}`}
              >
                <div className="alpha-letter">{letter}</div>

                <div className={`alpha-items ${isSingle ? "single" : "multi"}`}>
                  {items.map((product) => (
                    <article
                      key={product.id}
                      className="product-card"
                      role="button"
                      tabIndex={0}
                      aria-label={`${product.category} card`}
                      onClick={() => handleProductClick(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="thumb">
                        {/* Front side — product image */}
                        <div className="front" aria-hidden="false">
                          <img
                            src={product.image}
                            alt={product.category}
                            loading="lazy"
                          />
                        </div>

                        {/* Back side — more details */}
                        <div className="back" aria-hidden="true">
                          {/* Top badge */}
                          {product.badge && (
                            <span className="badge">{product.badge}</span>
                          )}

                          {/* Title + price */}
                          <h3 className="title">{product.name}</h3>
                          <div className="price-row">
                            <div className="price">{product.price}</div>
                            <div className="brand">{product.brand}</div>
                          </div>

                          {/* Short description */}
                          <p className="description">
                            {product.description?.length > 90
                              ? product.description.slice(0, 90) + "…"
                              : product.description ||
                                "No description available."}
                          </p>

                          {/* Quick specs / features */}
                          {(product.specs && Object.keys(product.specs).length > 0) && (
                            <div className="quick-specs">
                              <ul className="specs">
                                {Object.entries(product.specs)
                                  .slice(0, 3) // Show only first 3 specs
                                  .map(([key, value], index) => (
                                    <li key={index}>
                                      <strong>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong>{" "}
                                      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}

                          {/* Features array */}
                          {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                            <div className="quick-specs">
                              <ul className="features">
                                {product.features
                                  .slice(0, 3)
                                  .map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                  ))}
                              </ul>
                            </div>
                          )}

                          {/* Meta row */}
                       

                          {/* Tags */}
                          {product.tags?.length ? (
                            <div className="tags">
                              {product.tags.slice(0, 3).map((t, i) => (
                                <span className="tag" key={i}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          {/* Actions */}
                        
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
          </div>
        )}

        {/* No Products State */}
        {!loading && !error && products.length === 0 && (
          <div className="no-products-container">
            <p>No products available at the moment.</p>
            <button onClick={fetchProducts} className="refresh-button">
              Refresh
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Edumart;