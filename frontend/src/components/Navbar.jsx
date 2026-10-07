import React, { useState, useEffect } from "react";
import { 
  FaHeartbeat, 
  FaPhoneAlt, 
  FaGlobe, 
  FaBars, 
  FaTimes, 
  FaShieldAlt, 
  FaArrowRight 
} from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? "is-scrolled" : ""}`}>
      {/* Top Hospital Utility Bar */}
      <div className="navbar-top-bar">
        <div className="container navbar-top-content">
          <div className="top-bar-left">
            <span className="emergency-badge">
              <FaShieldAlt className="icon" /> Clinical AI Risk Assessment Platform
            </span>
            <span className="top-divider">|</span>
            <span className="top-text">For informational & educational purposes only</span>
          </div>

          <div className="top-bar-right">
            <a href="tel:112" className="top-link emergency-phone">
              <FaPhoneAlt /> <span>Emergency: 112</span>
            </a>
            <span className="top-divider">|</span>
            <div className="language-select">
              <FaGlobe />
              <span>English (US)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="navbar-main">
        <div className="container navbar-main-content">
          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => scrollTo("hero")} role="button" tabIndex={0}>
            <div className="logo-icon-wrapper">
              <FaHeartbeat className="logo-icon heart-pulse" />
            </div>
            <div className="logo-text-group">
              <span className="logo-title">Heart<span className="accent">AI</span></span>
              <span className="logo-tagline">Cardiovascular Intelligence</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            <li><button type="button" onClick={() => scrollTo("hero")} className="nav-link">Home</button></li>
            <li><button type="button" onClick={() => scrollTo("prediction")} className="nav-link active-link-style">Assessment</button></li>
            <li><button type="button" onClick={() => scrollTo("how-it-works")} className="nav-link">How It Works</button></li>
            <li><button type="button" onClick={() => scrollTo("features")} className="nav-link">Why HeartAI</button></li>
            <li><button type="button" onClick={() => scrollTo("footer")} className="nav-link">Contact</button></li>
          </ul>

          {/* Action CTA */}
          <div className="nav-actions">
            <button 
              type="button" 
              onClick={() => scrollTo("prediction")} 
              className="btn btn-primary nav-cta-btn"
            >
              <span>Start Prediction</span>
              <FaArrowRight className="btn-icon" />
            </button>

            {/* Mobile Hamburger Button */}
            <button 
              type="button" 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <ul className="mobile-nav-links">
              <li><button type="button" onClick={() => scrollTo("hero")}>Home</button></li>
              <li><button type="button" onClick={() => scrollTo("prediction")}>Health Assessment</button></li>
              <li><button type="button" onClick={() => scrollTo("how-it-works")}>How It Works</button></li>
              <li><button type="button" onClick={() => scrollTo("features")}>Why HeartAI</button></li>
              <li><button type="button" onClick={() => scrollTo("footer")}>Contact & FAQ</button></li>
            </ul>
            <div className="mobile-menu-footer">
              <button 
                type="button" 
                onClick={() => scrollTo("prediction")} 
                className="btn btn-primary mobile-cta-btn"
              >
                Start Assessment Now
              </button>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .navbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: #FFFFFF;
          transition: all 0.3s ease;
          border-bottom: 1px solid var(--border-light);
        }
        .navbar-wrapper.is-scrolled {
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.1);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .navbar-top-bar {
          background: #F8FAFC;
          font-size: 0.78rem;
          color: var(--text-muted);
          border-bottom: 1px solid #EEF2F6;
          padding: 6px 0;
        }
        .navbar-top-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .top-bar-left, .top-bar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .emergency-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
          font-weight: 600;
        }
        .top-divider {
          color: #CBD5E1;
        }
        .emergency-phone {
          color: var(--danger);
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .language-select {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
        }
        .navbar-main {
          padding: 14px 0;
          position: relative;
        }
        .navbar-main-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
        }
        .logo-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FFF2EF 0%, #FFE5E0 100%);
          border: 1px solid rgba(232, 91, 63, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          font-size: 1.4rem;
        }
        .logo-text-group {
          display: flex;
          flex-direction: column;
        }
        .logo-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.03em;
          line-height: 1.1;
        }
        .logo-title .accent {
          color: var(--primary);
        }
        .logo-tagline {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--text-subtle);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
        }
        .nav-link {
          background: none;
          border: none;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          padding: 8px 4px;
          position: relative;
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .nav-cta-btn {
          padding: 10px 22px;
          font-size: 0.9rem;
        }
        .mobile-toggle-btn {
          display: none;
          background: transparent;
          border: 1px solid var(--border-light);
          padding: 8px;
          border-radius: 8px;
          font-size: 1.2rem;
          color: var(--text-main);
          cursor: pointer;
        }
        .mobile-menu-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-light);
          box-shadow: var(--shadow-lg);
          padding: 24px;
        }
        .mobile-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .mobile-nav-links button {
          background: none;
          border: none;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-main);
          text-align: left;
          width: 100%;
          padding: 6px 0;
          cursor: pointer;
        }
        .mobile-menu-footer {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid var(--border-light);
        }
        .mobile-cta-btn {
          width: 100%;
        }

        @media (max-width: 992px) {
          .nav-links {
            display: none;
          }
          .nav-cta-btn {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .navbar-top-bar {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
