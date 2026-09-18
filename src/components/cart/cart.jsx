import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import { useCart } from '../../context/CartContext.jsx';
import EnquiryModal from '../enquiry/EnquiryModal.jsx';
import './cart.css';

const PLACEHOLDER = 'https://via.placeholder.com/400x400?text=Product';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const [showEnquiry, setShowEnquiry] = useState(false);
  const navigate = useNavigate();

  const isEmpty = cartItems.length === 0;
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

  const itemKey = (item) => item.variantId ?? item.productId;

  return (
    <div className="eq-page">
      <Header />

      <main className="eq-main">
        <div className="eq-inner">

          <div className="eq-layout">

            {/* ── Left: header + item list ── */}
            <div className="eq-left-col">
              <div className="eq-page-header">
                <h1 className="eq-title">Enquiry Cart</h1>
                <p className="eq-subtitle">
                  Review your selected products and submit an enquiry to receive personalised
                  assistance, pricing, and availability details from our team.
                </p>
              </div>
            <div className="eq-items">
              {isEmpty ? (
                <div className="eq-empty">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  <p>Your enquiry cart is empty.</p>
                  <Link to="/edumart" className="eq-browse-link">Browse Products →</Link>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={itemKey(item)} className="eq-item">
                    <div className="eq-item-img">
                      <img src={item.image || PLACEHOLDER} alt={item.name} />
                    </div>
                    <div className="eq-item-body">
                      <h3 className="eq-item-name">{item.name}</h3>
                      {item.brandName && (
                        <p className="eq-item-brand">{item.brandName}</p>
                      )}
                      {item.description && (
                        <p className="eq-item-desc">{item.description}</p>
                      )}
                      <div className="eq-item-footer">
                        <div className="eq-qty">
                          <button
                            className={`eq-qty-btn${item.quantity <= 1 ? ' eq-qty-del' : ''}`}
                            onClick={() => item.quantity <= 1 ? removeFromCart(itemKey(item)) : updateQty(itemKey(item), item.quantity - 1)}
                            aria-label={item.quantity <= 1 ? 'Remove item' : 'Decrease quantity'}
                          >
                            {item.quantity <= 1 ? (
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            ) : '—'}
                          </button>
                          <span className="eq-qty-val">
                            {String(item.quantity).padStart(2, '0')}
                          </span>
                          <button
                            className="eq-qty-btn"
                            onClick={() => updateQty(itemKey(item), item.quantity + 1)}
                            aria-label="Increase quantity"
                          >+</button>
                        </div>
                        <button
                          className="eq-remove"
                          onClick={() => removeFromCart(itemKey(item))}
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            </div>

            {/* ── Right: summary ── */}
            <aside className="eq-summary">
              <h2 className="eq-summary-title">Enquiry Summary</h2>

              <div className="eq-summary-count">
                <span>Selected Products</span>
                <span className="eq-count-badge">{totalQty} {totalQty === 1 ? 'item' : 'items'}</span>
              </div>

              <ul className="eq-summary-list">
                {cartItems.map(item => (
                  <li key={itemKey(item)} className="eq-summary-item">
                    <svg className="eq-summary-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                    <span className="eq-summary-name">{item.name}</span>
                  </li>
                ))}
              </ul>

              <button
                className="eq-enquire-btn"
                onClick={() => setShowEnquiry(true)}
                disabled={isEmpty}
              >
                Enquire for Discounts
              </button>

              <button
                className="eq-browse-btn"
                onClick={() => navigate('/edumart')}
              >
                Continue Browsing
              </button>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      <EnquiryModal isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} cartItems={cartItems} />
    </div>
  );
};

export default Cart;
