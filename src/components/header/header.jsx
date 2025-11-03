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
  const toggleExplore = () => {
    if (!isExploreOpen) {
      // Opening - reset to initial state
      setActiveLeft(null);
      setActiveMiddle(null);
    }
    setIsExploreOpen(v => !v);
  };
  
  const closeExplore = () => {
    setIsExploreOpen(false);
    // Reset state when closing
    setActiveLeft(null);
    setActiveMiddle(null);
  };

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
    School: ["Digital Classroom", "Learning Ecosystem" ,"Administration","Security & Infrastructure","Skill Development"],
    College: ["Digital Learning Devices", "Productivity Tools", "Support Systems"],
    "Competitive Exams": ["Learning Tools", "Digital Classroom"],
    Professionals: ["Productivity Devices", "Collaboration Tools","Wellness & Utilities"],
    Corporates: ["Presentation & Meeting", "Collaboration & Control","Office Automation"],
    Students: ["Learning Devices", "Creativity & Skills","Daily Use & Support"],
    Educators: ["Teaching Tools", "Management Tools","Professional Growth"],
    Enterprises: ["Display & Communication", "Workforce Management","Safety & Utilities"],
    "Public Sector": ["Public Education", "Infrastructure & Monitoring","Admin & Safety"],
  };

  // Mapping: which right items to show for a given middle item
  const rightByMiddle = {
    "Interactive Learning": ["Active Floor", "Ecoboard", "IFP (Interactive Flat Panel)"],
    "Learning Tools": ["Early Edge", "Rhyming Toys", "Jingle Bells", "AR/VR Learning Kits"],
    "School Management": ["Entab (ERP)", "Attendance & Visitor Management"],
    "Digital Classroom": ["IFP", "Digital Podium", "Ecoboard", "Projector"],
    "Learning Ecosystem": ["Etome eNote", "Etome Educosystem", "Digital Library", "LMS Integration"],
    "Administration": ["Entab ERP for Education", "Attendance & Visitor Management"],
    "Security & Infrastructure": ["CCTV & Surveillance", "Access Control"],
    "Skill Development": ["After School", "Robotics & STEM Kits", "AR/VR Labs"],
    "Smart Classrooms": ["IFP", "Digital Podium", "Projector", "LED Wall"],
    "Academic Tools": ["Etome eNote", "Etome Educosystem", "ERP", "LMS"],
    "Digital Learning Devices": ["Etome eNote", "Version Eka", "LMS & Test Platforms"],
    "Productivity Tools": ["Smart Pens", "Reusable Notebooks", "Tablets"],
    "Support Systems": ["Digital Library", "Study Companion Apps"],
    "Productivity Devices": ["Etome eNote", "Laptops", "Tablets"],
    "Collaboration Tools": ["Cloud Storage", "CRM", "Task Management Systems"],
    "Wellness & Utilities": ["Coffee Machines", "Sanitary Pad Dispensers", "Smart Vending Solutions"],
    "Presentation & Meeting": ["IFP", "Digital Podium", "Projector", "LED Wall"],
    "Collaboration & Control": ["AV Control & Scheduling", "Video Conferencing Systems", "Device Management"],
    "Office Automation": ["CRM", "Access Control", "Smart Utilities"],
    "Learning Devices": ["Etome eNote", "Version Eka", "After School", "Digital Library"],
    "Creativity & Skills": ["Nirmana (Sketch & Notes App)", "AR/VR Learning", "STEM & Robotics Kits"],
    "Daily Use & Support": ["Smart Pens", "Stationery", "Backpacks", "Reusable Notebooks"],
    "Teaching Tools": ["Etome eNote", "Projector", "IFP", "Ecoboard"],
    "Management Tools": ["Entab", "LMS Integration", "Lesson Planner Tools", "ERP"],
    "Professional Growth": ["Training & Certification Programs", "Early Edge"],
    "Display & Communication": ["LED Wall", "Kiosk Systems", "Digital Signage"],
    "Workforce Management": ["ERP Integration", "Attendance & Visitor Management", "CRM"],
    "Safety & Utilities": ["CCTV", "Energy Management", "Smart Lighting", "Access Control"],
    "Public Education": ["Etome eNote", "Version Eka", "IFP", "Ecoboard"],
    "Infrastructure & Monitoring": ["ERP for Education", "Smart Classroom Solutions", "Digital Library"],
    "Admin & Safety": ["Access Control", "CCTV Surveillance", "Scheduling & Reporting Systems"]
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
            <h1 style={{ fontSize: "30px", fontFamily: "'Anton', sans-serif", fontWeight: "400" }} className="brand-name">ETOMOSPHERE</h1>
          </Link>
        </div>

        <button
          type="button"
          className="explore-btn"
          aria-haspopup="menu"
          aria-expanded={isExploreOpen}
          onClick={toggleExplore}
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
        <div  className="header-right" aria-label="Quick actions">
          <div  className="search-wrapper" role="search">
            <input
              className="search-input"
              type="text"
              placeholder="Search"
              aria-label="Search"
              style={{ borderRadius: "999px", border: "1px solid black", width: "227px", height: "40px", color: "black" }}
            />
          </div>
          {/* <div className="header-icons">
            <Link to="/signup" className="icon-btn" aria-label="Profile">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          </div> */}
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
      {isExploreOpen && (
        <div  className="explore-backdrop" onClick={closeExplore} />
      )}

      {/* Explore Mega Menu */}
      {isExploreOpen  && (
        <div className="explore-menu" ref={exploreRef} role="menu" aria-label="Explore">
          <button 
            className="explore-close-btn"
            onClick={closeExplore}
            aria-label="Close Explore Menu"
          >
            ×
          </button>
          
          {/* Desktop view - progressive columns on hover */}
          <div style={{
            background:"white"
          }} className="explore-col desktop-explore">
            {leftCol.map((t) => (
              <button
                key={t}
                className={`explore-item ${activeLeft === t ? 'active' : ''}`}
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
            <div style={{
              background:"white"
            }}  className="explore-col desktop-explore">
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
            <div style={{
              background:"white"
            }}  className="explore-col desktop-explore">
              {derivedRight.map((t) => (
                <button key={t} className="explore-item" type="button">
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
                  className={`explore-item ${activeLeft === t ? 'active' : ''}`}
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
              <button 
                className="explore-back-btn"
                onClick={() => setActiveLeft(null)}
                type="button"
              >
                ← Back
              </button>
              {derivedMiddle.map((t) => (
                <button
                  key={t}
                  className={`explore-item ${activeMiddle === t ? 'active' : ''}`}
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
              <button 
                className="explore-back-btn"
                onClick={() => setActiveMiddle(null)}
                type="button"
              >
                ← Back
              </button>
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
        <Link to="/edumart" className={`mobile-nav-item ${location.pathname === '/edumart' ? 'active' : ''}`} onClick={closeMenu}>Edumart</Link>
        <a href="/educosystem" className="mobile-nav-item" onClick={closeMenu}>Educosystem</a>
        <Link to="/etome" className={`mobile-nav-item ${location.pathname === '/etome' ? 'active' : ''}`} onClick={closeMenu}>Etome</Link>
        <Link to="/ethos" className={`mobile-nav-item ${location.pathname === '/ethos' ? 'active' : ''}`} onClick={closeMenu}>Ethos</Link>
        {/* <a href="#ecademy" className="mobile-nav-item" onClick={(e) => { handleEcademyClick(e); closeMenu(); }}>Ecademy</a> */}

        
      </div>
    </header>
  );
};

export default Header;
