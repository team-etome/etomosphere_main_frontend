import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const panelRef = useRef(null);
  const exploreRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(v => !v);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleExplore = () => setIsExploreOpen(v => !v);
  const closeExplore = () => setIsExploreOpen(false);

  const handleEcademyClick = (e) => {
    e.preventDefault();
    alert('Ecademy is coming soon! Stay tuned for updates.');
  };

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (isMenuOpen) {
        if (panelRef.current && !panelRef.current.contains(e.target) && !e.target.closest(".hamburger-menu")) {
          closeMenu();
        }
      }
      if (isExploreOpen) {
        if (exploreRef.current && !exploreRef.current.contains(e.target) && !e.target.closest(".explore-btn")) {
          closeExplore();
        }
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isMenuOpen, isExploreOpen]);

  // Close on Esc + lock body scroll for mobile panel
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        closeMenu();
        closeExplore();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const leftCol = [
    "Montessori",
    "College",
    "School",
    "Competitive Exams",
    "Professionals",
    "Corporates",
    "Students",
    "Educators",
    "Enterprises",
    "Public Sector",
  ];
  const middleCol = [
    "Interactive Learning",
    "Learning Tools",
    "School Management",
    "Digital Classroom",
  ];
  const rightCol = [
    "Early Edge",
    "AR/VR",
    "Education Toys",
    "STEM Kits",
  ];

  // Mapping: which middle items to show for a given left item
  const middleByLeft = {
    Montessori: ["Interactive Learning", "Learning Tools","School Management"],
    School: ["Digital Classroom", "Learning Ecosystem ,Administration","Security & Infrastructure","Skill Development"],
    College: ["Digital Learning Devices", "Productivity Tools", "Support Systems"],
    "Competitive Exams": ["Learning Tools", "Digital Classroom"],
    Professionals: ["Interactive Learning", "Digital Classroom"],
    Corporates: ["School Management", "Digital Classroom"],
    Students: ["Interactive Learning", "Learning Tools"],
    Educators: ["Interactive Learning", "School Management"],
    Enterprises: ["School Management", "Digital Classroom"],
    "Public Sector": ["School Management", "Digital Classroom"],
  };

  // Mapping: which right items to show for a given middle item
  const rightByMiddle = {
    "Interactive Learning": ["Early Edge", "AR/VR"],
    "Learning Tools": ["Education Toys", "STEM Kits"],
    "School Management": ["Early Edge", "Education Toys"],
    "Digital Classroom": ["AR/VR", "STEM Kits"],
  };

  const [activeLeft, setActiveLeft] = useState(null);
  const [activeMiddle, setActiveMiddle] = useState(null);
  const derivedMiddle = activeLeft ? (middleByLeft[activeLeft] || middleCol) : [];
  const derivedRight = (activeMiddle && rightByMiddle[activeMiddle]) || [];

  return (
    <header className="header">
      <div className="header-container">
        {/* Brand */}
        <div className="brand">
          <Link to="/" className="brand-link">
            <h1 style={{ fontSize: "30px" }} className="brand-name">ETOMOSPHERE</h1>
          </Link>
        </div>

        <button
          type="button"
          className="explore-btn"
          aria-haspopup="menu"
          aria-expanded={isExploreOpen}
          onClick={toggleExplore}
          style={{ marginLeft: "40px" }}
        >
          <span>Explore</span>
          <svg className="caret" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="navigation" aria-label="Primary">
          <div className="nav-container">
            <Link to="/edumart" className={`nav-item ${location.pathname === '/edumart' ? 'active' : ''}`}>Edumart</Link>
            <Link to="/educosystem" className={`nav-item ${location.pathname === '/educosystem' ? 'active' : ''}`}>Educosystem</Link>
            <Link to="/etome" className={`nav-item ${location.pathname === '/etome' ? 'active' : ''}`}>Etome</Link>
            <Link to="/ethos" className={`nav-item ${location.pathname === '/ethos' ? 'active' : ''}`}>Ethos</Link>
          </div>
        </nav>

        {/* Desktop Right: search + icons */}
        <div className="header-right" aria-label="Quick actions">
          <div className="search-wrapper" role="search">
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              aria-label="Search"
              style={{ borderRadius: "999px", border: "1px solid black", width: "227px", height: "40px", color: "black" }}
            />
          </div>
          <div className="header-icons">
            <Link to="/signup" className="icon-btn" aria-label="Profile">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
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

      {/* Explore Mega Menu */}
      {isExploreOpen && (
        <div className="explore-menu" ref={exploreRef} role="menu" aria-label="Explore">
          <div className="explore-col">
            {leftCol.map((t) => (
              <button
                key={t}
                className={`explore-item ${activeLeft === t ? 'active' : ''}`}
                type="button"
                onMouseEnter={() => {
                  setActiveLeft(t);
                  const nextMiddle = (middleByLeft[t] || middleCol);
                  setActiveMiddle(nextMiddle[0] || null);
                }}
              >
                <span>{t}</span>
                <span className="arrow">›</span>
              </button>
            ))}
          </div>
          {activeLeft && (
            <div className="explore-col highlight">
              {derivedMiddle.map((t) => (
                <button
                  key={t}
                  className={`explore-item ${activeMiddle === t ? 'active' : ''}`}
                  type="button"
                  onMouseEnter={() => setActiveMiddle(t)}
                >
                  <span>{t}</span>
                  <span className="arrow">›</span>
                </button>
              ))}
            </div>
          )}
          {activeMiddle && (
            <div className="explore-col">
              {derivedRight.map((t) => (
                <button key={t} className="explore-item" type="button">
                  <span>{t}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

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
        <a href="/educosystem" className="mobile-nav-item" onClick={closeMenu}>Educosystem</a>
        {/* <a href="#ecademy" className="mobile-nav-item" onClick={(e) => { handleEcademyClick(e); closeMenu(); }}>Ecademy</a> */}
        <Link to="/etome" className={`mobile-nav-item ${location.pathname === '/etome' ? 'active' : ''}`} onClick={closeMenu}>Etome</Link>

        
      </div>
    </header>
  );
};

export default Header;
