import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const panelRef = useRef(null);
  const exploreRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const [activeLeft, setActiveLeft] = useState(null);
  const [activeMiddle, setActiveMiddle] = useState(null);

  const toggleExplore = () => {
    if (!isExploreOpen) {
      // Opening - reset to initial state
      setActiveLeft(null);
      setActiveMiddle(null);
    }
    setIsExploreOpen((v) => !v);
  };

  const closeExplore = () => {
    setIsExploreOpen(false);
    // Reset state when closing
    setActiveLeft(null);
    setActiveMiddle(null);
  };

  const handleEcademyClick = (e) => {
    e.preventDefault();
    alert("Ecademy is coming soon! Stay tuned for updates.");
  };

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (isMenuOpen) {
        if (
          panelRef.current &&
          !panelRef.current.contains(e.target) &&
          !e.target.closest(".hamburger-menu")
        ) {
          closeMenu();
        }
      }
      if (isExploreOpen) {
        if (
          exploreRef.current &&
          !exploreRef.current.contains(e.target) &&
          !e.target.closest(".explore-btn")
        ) {
          closeExplore();
        }
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isMenuOpen, isExploreOpen]);

  // Close on Esc
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
    "School",
    "College",
    "Students",
    "Competitive Exams",
    "Educators",
    "Professionals",
    "Enterprises",
    "Corporates",
    "Public Sector",
  ];

  const middleCol = [
    "Interactive Learning",
    "Learning Tools",
    "School Management",
    "Digital Classroom",
  ];

  const rightCol = ["Early Edge", "AR/VR", "Education Toys", "STEM Kits"];

  // Mapping: which middle items to show for a given left item
  const middleByLeft = {
    Montessori: [
      "Interactive Learning",
      "Learning Ecosystem(Montessori)",
      "Administration(Montessori)",
    ],
    School: [
      "Smart Classroom",
      "Learning Ecosystem(School)",
      "Administration(School)",
      "Infrastructure & Display(School)",
      "Skill Development(School)",
    ],
    College: [
      "Interactive(College)",
      "Academic Tools",
      "Wellness and utilities",
      "Infrastructure & Display(College)",
      "Skill Development(College)",
      "Administration(College)",
    ],
    Students: [
      "Smart Devices(Students)",
      "Learning Aid(Students)",
      "Skill Development(Students)",
      "Accessories",
    ],
    "Competitive Exams": [
      "Smart Devices(Competitive Exams)",
      "Learning Platforms",
    ],
    Educators: [
      "Teaching Tools",
      "Management Tools",
      "Professional Growth",
    ],
    Professionals: [
      "Productivity Devices",
      "Wellness & Utilities(Professionals)",
    ],
    Enterprises: [
      "Display Solution(Enterprises)",
      "Workforce Management",
      "Security & Infrastructure(Enterprises)",
      "Wellness & Utilities(Enterprises)",
    ],
    Corporates: [
      "Display Solution(Corporates)",
      "Smart Devices(Corporates)",
      "Wellness & Utilities(Corporates)",
      "Security & Infrastructure(Corporates)",
    ],
    "Public Sector": [
      "Display Solution(Public Sector)",
      "Learning Ecosystem(Public Sector)",
      "Security & Infrastructure(Public Sector)",
      "Administration(Public Sector)",
    ],
  };
  const rightByMiddle = {
    // Montessori
    "Interactive Learning": [
      "Active Floor",
      "Ecoboard",
      "Projector",
      "Rhyming Toys",
      "IFP (Interactive Flat Panel)",
    ],
    "Learning Ecosystem(Montessori)": ["Early Edge", "Jingle Bells"],
    "Administration(Montessori)": [
      "ERP (Entab)",
      "Security Solutions",
      "Admin Solution",
    ],
    // School
    "Smart Classroom": ["IFP", "Digital Podium", "Ecoboard", "Projector"],
    "Learning Ecosystem(School)": [
      "Etome eNote",
      "Etome Educosystem",
      "Digital Library",
      "Cyber Square",
      "LMS Integration",
      "Tata Class Edge",
      "Publishers",
    ],
    "Administration(School)": [
      "ERP",
      "Attendance & Visitor Management",
      "Security",
    ],
    "Infrastructure & Display(School)": [
      "Commercial Display",
      "Digital Signage",
      "AV Solutions",
      "Kiosk",
      "LED Wall",
      "Furniture",
      "All in one PC",
    ],
    "Skill Development(School)": [
      "LMS",
      "Cyber Square",
      "Lab Solutions",
      "Robotics & STEM Kits",
      "Sports",
      "AR/VR Labs",
    ],
    // College
    "Interactive(College)": ["IFP", "Ecoboard", "Digital Podium", "Projector"],
    "Academic Tools": ["Etome eNote", "Etome Educosystem", "LMS"],
    "Wellness and utilities": [
      "Coffee Machines",
      "Sanitary Pad Dispensers",
      "Smart Vending Solutions",
    ],
    "Infrastructure & Display(College)": [
      "Kiosk",
      "Commercial Display",
      "Digital Signage",
      "LED Wall",
      "Furniture",
      "AV",
    ],
    "Skill Development(College)": ["AR/VR Labs"],
    "Administration(College)": [
      "ERP",
      "Attendance & Visitor Management",
      "Security Solutions",
    ],
    // Students
    "Smart Devices(Students)": ["Etome eNote", "All in one PC", "Smart Pens"],
    "Learning Aid(Students)": ["LMS", "Digital Library"],
    "Skill Development(Students)": ["AR/VR Learning", "STEM & Robotics Kits"],
    "Accessories": [
      "eNote Covers",
      "Stationery",
      "Backpacks",
      "Reusable Notebooks",
    ],
    // Competitive Exams
    "Smart Devices(Competitive Exams)": ["Etome eNote", "Smart Pens"],
    "Learning Platforms": [
      "LMS & Test Platforms",
      "Reusable Notebooks",
      "Digital Library",
      "Study Companion Apps",
    ],
    // Educators
    "Teaching Tools": [
      "Etome eNote",
      "Projector",
      "Eslate",
      "Scan Translator",
      "IFP",
      "Ecoboard",
      "Lesson Planner Tools",
    ],
    "Management Tools": ["LMS Integration", "ERP"],
    "Professional Growth": ["Training & Certification Programs"],
    // Professionals
    "Productivity Devices": ["Etome eNote", "Smart Pens", "Planner Tools"],
    "Wellness & Utilities(Professionals)": [
      "Coffee Machines",
      "Sanitary Pad Dispensers",
      "Smart Vending Solutions",
    ],
    // Enterprises
    "Display Solution(Enterprises)": [
      "IFP",
      "Commercial Display",
      "LED Wall",
      "Kiosk",
      "Digital Signage",
      "Projector",
      "Ecoboard",
      "Podium",
    ],
    "Workforce Management": [
      "ERP Integration",
      "Attendance & Visitor Management",
      "CRM",
    ],
    "Security & Infrastructure(Enterprises)": [
      "Security",
      "Furniture",
      "Smart Lighting",
      "Access Control",
      "AV",
    ],
    "Wellness & Utilities(Enterprises)": [
      "Coffee Machines",
      "Sanitary Pad Dispensers",
      "Smart Vending Solutions",
    ],
    // Corporates
    "Display Solution(Corporates)": [
      "IFP",
      "Ecoboard",
      "LED Wall",
      "Kiosk Systems",
      "Digital Signage",
      "Commercial Display",
      "Digital Podium",
      "Projector",
    ],
    "Smart Devices(Corporates)": ["Etome eNote", "Smart Pens", "Scan Translator"],
    "Wellness & Utilities(Corporates)": [
      "Coffee Machines",
      "Sanitary Pad Dispensers",
      "Smart Vending Solutions",
    ],
    "Security & Infrastructure(Corporates)": [
      "Security",
      "Energy Management",
      "Smart Lighting",
      "Access Control",
      "AV",
    ],
    // Public Sector
    "Display Solution(Public Sector)": [
      "IFP",
      "Digital Podium",
      "Ecoboard",
      "Digital Signage",
      "Kiosk",
      "LED Wall",
      "Projector",
      "Commercial Display",
    ],
    "Learning Ecosystem(Public Sector)": [
      "Etome eNote",
      "Etome Educosystem",
      "Digital Library",
      "LMS Integration",
    ],
    "Administration(Public Sector)": ["ERP", "Attendance & Visitor Management"],
    "Security & Infrastructure(Public Sector)": ["Security", "AV", "Furniture"],
  };
  
  
  const derivedMiddle = activeLeft ? middleByLeft[activeLeft] || middleCol : [];
  const derivedRight = activeMiddle && rightByMiddle[activeMiddle] ? rightByMiddle[activeMiddle] : [];

  // ---- Navigation on right-item click ----
  const SPECIAL_TO_ETOME = new Set(["Etome", "Etome eNote", "Ecoboard", "Nirmana (Sketch & Notes App)"]);
  const handleRightItemClick = (item) => {
    if (SPECIAL_TO_ETOME.has(item) || /(^|\s)etome(\s|$)/i.test(item)) {
      navigate("/etome");
    } else {
      navigate(`/edumart?search=${encodeURIComponent(item)}`);
    }
    closeExplore();
  };

  return (
    <header style={{
      boxShadow:"0 0 10px 0 rgba(0, 0, 0, 0.1)",
    }} className="header">
      <div className="header-container">
        {/* Brand */} 
        <div className="brand">
          <Link to="/" className="brand-link">
            <h1
              style={{ fontSize: "30px", fontFamily: "'Anton', sans-serif", fontWeight: "400" }}
              className="brand-name"
            >
              ETOMOSPHERE
            </h1>
          </Link>
        </div>

        <button
          type="button"
          className="explore-btn"
          aria-haspopup="menu"
          aria-expanded={isExploreOpen}
          onClick={toggleExplore}
        >
          <span className="explore-text">Explore</span>
          <svg className="caret" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M7 10l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="navigation" aria-label="Primary">
          <div className="nav-container">
            <Link to="/edumart" className={`nav-item ${location.pathname === "/edumart" ? "active" : ""}`}>
              Products
            </Link>
            <Link
              to="/educosystem"
              className={`nav-item ${location.pathname === "/educosystem" ? "active" : ""}`}
            >
              Educosystem
            </Link>
            <Link to="/etome" className={`nav-item ${location.pathname === "/etome" ? "active" : ""}`}>
              Etome
            </Link>
            <Link to="/ethos" className={`nav-item ${location.pathname === "/ethos" ? "active" : ""}`}>
              About Us
            </Link>
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
              style={{
                borderRadius: "999px",
                border: "1px solid black",
                width: "227px",
                height: "40px",
                color: "black",
              }}
            />
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

      {/* Explore Backdrop for mobile */}
      {isExploreOpen && <div className="explore-backdrop" onClick={closeExplore} />}

      {/* Explore Mega Menu */}
      {isExploreOpen && (
        <div className="explore-menu" ref={exploreRef} role="menu" aria-label="Explore">
          <button className="explore-close-btn" onClick={closeExplore} aria-label="Close Explore Menu">
            ×
          </button>

          {/* Desktop view - progressive columns on hover */}
          <div style={{ background: "white" }} className="explore-col desktop-explore">
            {leftCol.map((t) => (
              <button
                key={t}
                className={`explore-item ${activeLeft === t ? "active" : ""}`}
                type="button"
                onMouseEnter={() => {
                  setActiveLeft(t);
                  setActiveMiddle(null); // Reset middle when hovering left
                }}
              >
                <span>{t}</span>
                <span className="arrow">›</span>
              </button>
            ))}
          </div>

          {activeLeft && (
            <div style={{ background: "white" }} className="explore-col desktop-explore">
              {derivedMiddle.map((t) => (
                <button
                  key={t}
                  className={`explore-item ${activeMiddle === t ? "active" : ""}`}
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
            <div style={{ background: "white" }} className="explore-col desktop-explore">
              {derivedRight.map((t) => (
                <button key={t} className="explore-item" type="button" onClick={() => handleRightItemClick(t)}>
                  <span>{t}</span>
                </button>
              ))}
            </div>
          )}

          {/* Mobile view - progressive disclosure */}
          {!activeLeft && (
            <div className="explore-col mobile-explore">
              {leftCol.map((t) => (
                <button
                  key={t}
                  className={`explore-item ${activeLeft === t ? "active" : ""}`}
                  type="button"
                  onClick={() => {
                    setActiveLeft(t);
                    setActiveMiddle(null);
                  }}
                >
                  <span>{t}</span>
                  <span className="arrow">›</span>
                </button>
              ))}
            </div>
          )}

          {activeLeft && !activeMiddle && (
            <div className="explore-col mobile-explore">
              <button className="explore-back-btn" onClick={() => setActiveLeft(null)} type="button">
                ← Back
              </button>
              {derivedMiddle.map((t) => (
                <button
                  key={t}
                  className={`explore-item ${activeMiddle === t ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveMiddle(t)}
                >
                  <span>{t}</span>
                  <span className="arrow">›</span>
                </button>
              ))}
            </div>
          )}

          {activeMiddle && (
            <div className="explore-col mobile-explore">
              <button className="explore-back-btn" onClick={() => setActiveMiddle(null)} type="button">
                ← Back
              </button>
              {derivedRight.map((t) => (
                <button key={t} className="explore-item" type="button" onClick={() => handleRightItemClick(t)}>
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
        <Link
          to="/edumart"
          className={`mobile-nav-item ${location.pathname === "/edumart" ? "active" : ""}`}
          onClick={closeMenu}
        >
          products
        </Link>
        <a href="/educosystem" className="mobile-nav-item" onClick={closeMenu}>
          Educosystem
        </a>
        <Link
          to="/etome"
          className={`mobile-nav-item ${location.pathname === "/etome" ? "active" : ""}`}
          onClick={closeMenu}
        >
          Etome
        </Link>
        <Link
          to="/ethos"
          className={`mobile-nav-item ${location.pathname === "/ethos" ? "active" : ""}`}
          onClick={closeMenu}
        >
          Ethos
        </Link>
      </div>
    </header>
  );
};

export default Header;
