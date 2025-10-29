import React, { useMemo, useState, useEffect } from "react";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import image7 from "../../assets/image7.png";
import "./cart.css";
import axios from "axios";
import { useSelector } from "react-redux";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartData, setCartData] = useState(null);


  console.log(cartItems,"cartItems")

  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  // Get API URL from Redux store
  const APIURL = useSelector((state) => state.APIURL?.url);
  // Fetch product details for cart items
  const fetchProductDetails = async (productIds) => {
    try {
      const productDetails = {};
      
      // Fetch each product's details
      for (const productId of productIds) {
        try {
          const response = await axios.get(`${APIURL}/api/products/${productId}/`);
          if (response.data) {
            productDetails[productId] = {
              name: response.data.name || `Product ${productId}`,
              description: response.data.description || '',
              brand: response.data.brand?.name || 'Unknown Brand'
            };
          }
        } catch (error) {
          console.warn(`Failed to fetch details for product ${productId}:`, error);
          // Fallback to default values
          productDetails[productId] = {
            name: `Product ${productId}`,
            description: '',
            brand: 'Unknown Brand'
          };
        }
      }
      
      return productDetails;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return {};
    }
  };

  // Fetch cart data from backend
  const fetchCartData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get user ID from localStorage (assuming it's stored there after login)
      const userData = localStorage.getItem('userData');
      if (!userData) {
        setError('User not logged in');
        setLoading(false);
        return;
      }
      
      const user = JSON.parse(userData);
      const userId = user.id || user.user_id;
      
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${APIURL}/api/addCart/`, {
        params: {
          user_id: userId
        }
      });

      if (response.data && response.data.items) {
        // Get product IDs for fetching details
        const productIds = response.data.items.map(item => item.product_id);
        
        // Fetch product details
        const productDetails = await fetchProductDetails(productIds);
        
        // Transform backend data to match frontend structure
        const transformedItems = response.data.items.map((item, index) => ({
          id: item.product_id, // Use product_id as the main ID
          name: productDetails[item.product_id]?.name || `Product ${item.product_id}`,
          image: item.image || image7, // Use the image from backend
          price: parseFloat(item.price || 0),
          quantity: item.quantity,
          product_id: item.product_id,
          total_price: parseFloat(item.price || 0) * item.quantity,
          brand: productDetails[item.product_id]?.brand || 'Unknown Brand',
          description: productDetails[item.product_id]?.description || ''
        }));
        
        setCartItems(transformedItems);
        setCartData(response.data);
      } else {
        setCartItems([]);
        setCartData(null);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
      setError('Failed to load cart data');
      // Fallback to empty cart
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, [APIURL]);

  const subtotal = useMemo(
    () => cartItems.reduce((t, i) => t + i.price * i.quantity, 0),
    [cartItems]
  );

  const deliveryFee = cartItems.length ? 250 : 0;
  const total = Math.max(0, subtotal - discountAmount) + deliveryFee;

  const handleQuantityChange = (id, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim().toLowerCase() === "save10") {
      setDiscountAmount(subtotal * 0.1);
    } else {
      setDiscountAmount(0);
    }
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  const handleContinueShopping = () => {
    console.log("Continue shopping...");
  };

  return (
    <div className="cart-container">
      <Header />

      <main className="cart-main">
        <div className="cart-content">
          {/* Left: Cart */}
          <section className="cart-section">
            <h1 className="cart-title">My Cart</h1>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading cart items...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={fetchCartData} className="retry-btn">
                  Retry
                </button>
              </div>
            ) : (
              <div className="cart-items-container" role="table" aria-label="Cart items">
              {/* Desktop/tablet header */}
              <div className="cart-table-header" role="rowgroup">
                <div className="header-product" role="columnheader">Product</div>
                <div className="header-quantity" role="columnheader">Quantity</div>
                <div className="header-price" role="columnheader">Price</div>
                <div className="header-actions" role="columnheader"></div>
              </div>

              {cartItems.length > 0 ? (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item" role="row">
                    <div className="item-product" role="cell">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="product-image"
                      />
                      <div className="product-info">
                        <span className="product-name">{item.name}</span>
                        {item.brand && <span className="product-brand">{item.brand}</span>}
                        <span className="mobile-price">{inr.format(item.price)}</span>
                      </div>
                    </div>

                     <div className="item-quantity" role="cell">
                      
                       <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                         <button
                           className="quantity-btn minus"
                           onClick={() => handleQuantityChange(item.id, -1)}
                           aria-label="Decrease quantity"
                           disabled={item.quantity <= 1}
                         >
                           -
                         </button>
                         <span className="quantity-label">Qty</span>
                         <button
                           className="quantity-btn plus"
                           onClick={() => handleQuantityChange(item.id, 1)}
                           aria-label="Increase quantity"
                         >
                           +
                         </button>
                       </div>
                     </div>

                    <div className="item-price" role="cell">
                      {/* <span className="mobile-label">Price:</span> */}
                      <span className="price-value">{inr.format(item.price)}</span>
                    </div>

                    <div className="item-actions" role="cell">
                      {/* <span className="mobile-label">Actions:</span> */}
                      <button
                        className="delete-btn"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        title="Remove"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-cart">
                  <p>Your cart is empty</p>
                </div>
              )}
              </div>
            )}
          </section>

          {/* Right: Summary */}
          <aside className="order-summary-section" aria-label="Order summary">
            <div className="order-summary-container">
              <h2 className="order-summary-title">Order Summary</h2>

              <div className="discount-section">
                <input
                  type="text"
                  placeholder="Discount Code"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  className="discount-input"
                  aria-label="Discount code"
                />
                <button style={{
                    color:"black"
                }} className="apply-btn" onClick={handleApplyDiscount}>
                  Apply
                </button>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Sub Total</span>
                  <span>{inr.format(subtotal)}</span>
                </div>
{/* 
                <div className="price-row">
                  <span>Discount</span>
                  <span>- {inr.format(discountAmount)}</span>
                </div> */}
{/* 
                <div className="price-row">
                  <span>Delivery Fee</span>
                  <span>{inr.format(deliveryFee)}</span>
                </div> */}

                <div className="price-divider"></div>

                <div className="price-row total">
                  <span>Total</span>
                  <span>{inr.format(total)}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="checkout-btn" onClick={handleCheckout} disabled={!cartItems.length}>
                  Checkout
                </button>

                <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
