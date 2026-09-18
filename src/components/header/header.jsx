import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import etomosphereLogo from "../../assets/Etomosphere Full logo.png";
import RequestDemoModal from "../enquiry/RequestDemoModal.jsx";
import ContactModal from "../enquiry/ContactModal.jsx";
import { useCart } from "../../context/CartContext.jsx";
import "./header.css";

const Letters = ({ text }) =>
  [...text].map((ch, i) => (
    <span key={i} className="nav-letter" style={{ '--li': i }}>
      {ch === ' ' ? ' ' : ch}
    </span>
  ));

const Header = () => {
  const [isMenuOpen,  setIsMenuOpen]  = useState(false);
  const [showDemo,    setShowDemo]    = useState(false);
  const [showContact, setShowContact] = useState(false);
  const panelRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu  = () => setIsMenuOpen(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onClick = (e) => {
      if (isMenuOpen && panelRef.current && !panelRef.current.contains(e.target) && !e.target.closest(".hamburger-menu"))
        closeMenu();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeMenu(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const { cartCount } = useCart();

  const navLinks = [
    { label: "Home",       to: "/" },
    { label: "Products",   to: "/edumart" },
    { label: "Etome",      to: "/etome" },
    { label: "Programmes", to: "/programmes" },
    { label: "About Us",   to: "/ethos" },
    { label: "Reviews",    to: "/reviews" },
  ];

  return (
    <>
      <header className={`header${isHome ? ' header--dark' : ''}${isMenuOpen ? ' header--nav-open' : ''}`}>
        <div className="header-container">

          <div className="brand">
            <Link to="/" className="brand-link">
              <img src={etomosphereLogo} alt="Etomosphere" className="brand-logo" />
            </Link>
          </div>

          <nav className="navigation" aria-label="Primary">
            <div className="nav-container">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-item ${location.pathname === to ? "active" : ""}`}
                >
                  <Letters text={label} />
                </Link>
              ))}
            </div>
          </nav>

          <div className="header-right">
            <button onClick={() => setShowContact(true)} className="nav-contact-btn">
              <Letters text="Contact Sales" />
            </button>
            <button onClick={() => setShowDemo(true)} className="nav-cta-btn">
              Request Demo
            </button>
            <Link to="/cart" className="cart-icon-btn" aria-label="Enquiry cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount > 99 ? '99+' : cartCount}</span>
              )}
            </Link>
          </div>

          <button className={`hamburger-menu${isMenuOpen ? ' hamburger-open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
          </button>
        </div>

        <div className={`backdrop ${isMenuOpen ? "show" : ""}`} onClick={closeMenu} />

        <div
          id="mobile-nav"
          ref={panelRef}
          className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ label, to }) => (
            <Link key={to} to={to} className={`mobile-nav-item ${location.pathname === to ? "active" : ""}`} onClick={closeMenu}>
              {label}
            </Link>
          ))}
          <div className="mobile-nav-buttons">
            <button className="nav-contact-btn mobile-btn" onClick={() => { setShowContact(true); closeMenu(); }}>Contact Sales</button>
            <button className="nav-cta-btn mobile-btn"     onClick={() => { setShowDemo(true);    closeMenu(); }}>Request Demo</button>
            <Link to="/cart" className="mobile-cart-btn" onClick={closeMenu}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Enquiry Cart
              {cartCount > 0 && <span className="mobile-cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>

      {!isHome && <div className="header-spacer" />}

      <RequestDemoModal isOpen={showDemo}    onClose={() => setShowDemo(false)} />
      <ContactModal     isOpen={showContact} onClose={() => setShowContact(false)} />
    </>
  );
};

export default Header;
