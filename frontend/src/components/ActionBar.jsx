import React from "react";
import { 
  FaSearch, 
  FaArrowRight, 
  FaInfoCircle, 
  FaFileMedicalAlt, 
  FaHeartbeat 
} from "react-icons/fa";

export default function ActionBar({ onSelectPreset, onStartAssessment }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="action-bar-wrapper">
      <div className="container">
        <div className="action-bar-container glass-card">
          {/* Left: Search / Mode Indicator */}
          <div className="action-bar-left">
            <div className="search-icon-wrapper">
              <FaSearch className="search-icon" />
            </div>
            <div className="action-text-group">
              <div className="action-main-text">Start a new health assessment</div>
              <div className="action-sub-text">Select a clinical profile or enter parameters below</div>
            </div>
          </div>

          {/* Center Quick Preset Selector */}
          <div className="action-bar-center">
            <button 
              type="button" 
              onClick={() => onSelectPreset && onSelectPreset("healthy")}
              className="quick-preset-btn"
              title="Load Benchmark Healthy Profile"
            >
              <span className="preset-dot green"></span>
              <span>Low-Risk Sample</span>
            </button>

            <button 
              type="button" 
              onClick={() => onSelectPreset && onSelectPreset("moderate_risk")}
              className="quick-preset-btn"
              title="Load Clinical Risk Profile"
            >
              <span className="preset-dot coral"></span>
              <span>Elevated Risk Sample</span>
            </button>
          </div>

          {/* Right: Primary Button & How it Works */}
          <div className="action-bar-right">
            <button 
              type="button" 
              onClick={() => {
                if (onStartAssessment) onStartAssessment();
                scrollTo("prediction");
              }}
              className="btn btn-primary action-cta-btn"
            >
              <FaHeartbeat className="btn-icon" />
              <span>Start Prediction</span>
              <FaArrowRight className="btn-icon-right" />
            </button>

            <button 
              type="button" 
              onClick={() => scrollTo("how-it-works")}
              className="action-secondary-link"
            >
              <FaInfoCircle />
              <span>How It Works</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .action-bar-wrapper {
          position: relative;
          margin-top: -38px;
          margin-bottom: 40px;
          z-index: 10;
        }
        .action-bar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 28px;
          border-radius: var(--radius-xl);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 20px 45px -10px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(232, 91, 63, 0.15);
          gap: 20px;
          flex-wrap: wrap;
        }
        .action-bar-left {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 280px;
        }
        .search-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFF2EF;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }
        .action-main-text {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-main);
          letter-spacing: -0.01em;
        }
        .action-sub-text {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .action-bar-center {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .quick-preset-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F8FAFC;
          border: 1px solid var(--border-light);
          padding: 8px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-main);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .quick-preset-btn:hover {
          background: #FFFFFF;
          border-color: #CBD5E1;
          transform: translateY(-1px);
          box-shadow: var(--shadow-sm);
        }
        .preset-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        .preset-dot.green { background: var(--success); }
        .preset-dot.coral { background: var(--primary); }

        .action-bar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .action-cta-btn {
          padding: 12px 26px;
          font-size: 0.95rem;
        }
        .action-secondary-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .action-secondary-link:hover {
          color: var(--primary);
        }

        @media (max-width: 992px) {
          .action-bar-container {
            flex-direction: column;
            align-items: stretch;
            padding: 20px;
          }
          .action-bar-center {
            justify-content: flex-start;
          }
          .action-bar-right {
            justify-content: space-between;
          }
        }
        @media (max-width: 576px) {
          .action-bar-right {
            flex-direction: column;
            gap: 12px;
          }
          .action-cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
