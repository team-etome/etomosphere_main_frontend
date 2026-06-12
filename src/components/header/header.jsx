import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import etomosphereLogo from "../../assets/Etomosphere Full logo.png";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu  = () => setIsMenuOpen(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onClick = (e) => {
      if (
        isMenuOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest(".hamburger-menu")
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isMenuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/edumart" },
    { label: "Educosystem", to: "/educosystem" },
    { label: "Etome", to: "/etome" },
    { label: "About Us", to: "/ethos" },
  ];

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="brand">
            <Link to="/" className="brand-link">
              <img
                src={etomosphereLogo}
                alt="Etomosphere"
                className="brand-logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="navigation" aria-label="Primary">
            <div className="nav-container">
              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-item ${location.pathname === to ? "active" : ""}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="header-right">
            <Link to="/enquiry" className="nav-contact-btn">
              Contact Sales
            </Link>
            <Link to="/enquiry" className="nav-cta-btn">
              Request Demo
            </Link>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger-menu"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
            <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`} />
          </button>
        </div>

        {/* Backdrop */}
        <div
          className={`backdrop ${isMenuOpen ? "show" : ""}`}
          onClick={closeMenu}
        />

        {/* Mobile Nav Panel */}
        <div
          id="mobile-nav"
          ref={panelRef}
          className={`mobile-nav ${isMenuOpen ? "open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`mobile-nav-item ${location.pathname === to ? "active" : ""}`}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <div className="mobile-nav-buttons">
            <Link
              to="/enquiry"
              className="nav-contact-btn mobile-btn"
              onClick={closeMenu}
            >
              Contact Sales
            </Link>
            <Link to="/enquiry" className="nav-cta-btn mobile-btn" onClick={closeMenu}>
              Request Demo
            </Link>
          </div>
        </div>
      </header>

      {/* No spacer on home — video fills full viewport behind the floating navbar */}
      {!isHome && <div className="header-spacer" />}
    </>
  );
};

export default Header;
