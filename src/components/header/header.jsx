import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu = () => setIsMenuOpen(false);

  // Close on outside click
  useEffect(() => {
    if (!isMenuOpen) return;
    const onClick = (e) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target) && !e.target.closest(".hamburger-menu")) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isMenuOpen]);

  // Close on Esc + lock body scroll
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeMenu();
    if (isMenuOpen) {
      document.addEventListener("keydown", onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        {/* Brand */}
        <div className="brand">
          <Link to="/" className="brand-link">
            <h1 style={{
              fontSize:"30px"
            }} className="brand-name">ETOMOSPHERE</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="navigation" aria-label="Primary">
          <div className="nav-container">
            <Link to="/ethos" className={`nav-item ${location.pathname === '/ethos' ? 'active' : ''}`}>Ethos</Link>
            <Link to="/edumart" className={`nav-item ${location.pathname === '/edumart' ? 'active' : ''}`}>Edumart</Link>
            <a href="#educosystem" className="nav-item">Educosystem</a>
            <a href="#ecademy" className="nav-item">Ecademy</a>
            <Link to="/etome" className={`nav-item ${location.pathname === '/etome' ? 'active' : ''}`}>Etome</Link>
          </div>
        </nav>

        {/* Desktop Icons */}
        <div className="header-right" aria-label="Quick actions">
          <div className="header-icons">
            <button className="icon-btn" aria-label="Wishlist">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <Link to="/signup" className="icon-btn" aria-label="Profile">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
        </button>
      </div>

      {/* Backdrop */}
      <div className={`backdrop ${isMenuOpen ? "show" : ""}`} onClick={closeMenu} />

      {/* Mobile Navigation */}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <Link to="/ethos" className={`mobile-nav-item ${location.pathname === '/ethos' ? 'active' : ''}`} onClick={closeMenu}>Ethos</Link>
        <Link to="/edumart" className={`mobile-nav-item ${location.pathname === '/edumart' ? 'active' : ''}`} onClick={closeMenu}>Edumart</Link>
        <a href="#educosystem" className="mobile-nav-item" onClick={closeMenu}>Educosystem</a>
        <a href="#ecademy" className="mobile-nav-item" onClick={closeMenu}>Ecademy</a>
        <Link to="/etome" className={`mobile-nav-item ${location.pathname === '/etome' ? 'active' : ''}`} onClick={closeMenu}>Etome</Link>

        <div className="mobile-icons">
          <button className="mobile-icon-btn">
            <svg className="mobile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>Wishlist</span>
          </button>
          <Link to="/signup" className="mobile-icon-btn" onClick={closeMenu}>
            <svg className="mobile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Profile</span>
          </Link>
          <Link to="/cart" className="mobile-icon-btn" onClick={closeMenu}>
            <svg className="mobile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span>Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
