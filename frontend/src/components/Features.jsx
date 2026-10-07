import React from "react";
import { 
  FaBrain, 
  FaSlidersH, 
  FaBolt, 
  FaMobileAlt, 
  FaUserShield, 
  FaChartPie 
} from "react-icons/fa";

export default function Features() {
  const featureList = [
    {
      icon: <FaBrain />,
      title: "AI-Powered Intelligence",
      description: "Uses a trained Machine Learning model with calibrated logistic scoring to detect multi-variable cardiac risks."
    },
    {
      icon: <FaSlidersH />,
      title: "Standardized Scaling",
      description: "Features undergo z-score normalization using the pre-fitted StandardScaler to ensure accurate statistical weighting."
    },
    {
      icon: <FaBolt />,
      title: "Fast Instant Results",
      description: "Immediate computational evaluation of your 15 clinical parameters with real-time probability stratification."
    },
    {
      icon: <FaMobileAlt />,
      title: "Fully Responsive UI",
      description: "Engineered with a light healthcare glassmorphism design that adapts seamlessly to desktop, tablet, and phone screens."
    },
    {
      icon: <FaUserShield />,
      title: "Privacy Conscious",
      description: "Assessment data is processed via your isolated backend API, prioritizing patient data confidentiality and security."
    },
    {
      icon: <FaChartPie />,
      title: "Transparent Metrics",
      description: "Access verified validation accuracy, confusion matrix data, and feature selection statistics directly."
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            WHY HEARTAI
          </div>
          <h2 className="section-title">Healthcare Intelligence, Simplified</h2>
          <p className="section-subtitle">
            Engineered to bridge clinical cardiovascular parameters with modern machine learning 
            diagnostics in a clean, intuitive healthcare interface.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="features-grid">
          {featureList.map((feat, idx) => (
            <div key={idx} className="feature-card glass-card">
              <div className="feature-icon-wrapper">
                {feat.icon}
              </div>
              <h3 className="feature-card-title">{feat.title}</h3>
              <p className="feature-card-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-section {
          padding: 80px 0;
          background: #F8FAFC;
          position: relative;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .feature-card {
          padding: 32px 28px;
          background: rgba(255, 255, 255, 0.92);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(232, 91, 63, 0.35);
          box-shadow: var(--shadow-lg);
        }
        .feature-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #FFF2EF;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 22px;
          box-shadow: 0 4px 14px rgba(232, 91, 63, 0.15);
        }
        .feature-card-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 12px;
          letter-spacing: -0.015em;
        }
        .feature-card-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
