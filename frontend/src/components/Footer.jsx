import React from "react";
import { 
  FaHeartbeat, 
  FaGithub, 
  FaEnvelope, 
  FaShieldAlt, 
  FaHeart 
} from "react-icons/fa";

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="footer-wrapper">
      <div className="container">
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-col-brand">
            <div className="footer-brand" onClick={() => scrollTo("hero")} role="button" tabIndex={0}>
              <div className="footer-icon-box">
                <FaHeartbeat className="heart-pulse" />
              </div>
              <span className="footer-title">Heart<span className="accent">AI</span></span>
            </div>
            <p className="footer-bio">
              AI-Powered Cardiovascular Risk Prediction platform leveraging pre-trained machine learning algorithms, standardized clinical data scaling, and responsive healthcare interfaces.
            </p>
            <div className="footer-badge-pill">
              <FaShieldAlt />
              <span>Academic & Supervised ML Project</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links">
              <li><button type="button" onClick={() => scrollTo("hero")}>Home</button></li>
              <li><button type="button" onClick={() => scrollTo("prediction")}>Health Assessment</button></li>
              <li><button type="button" onClick={() => scrollTo("how-it-works")}>How It Works</button></li>
              <li><button type="button" onClick={() => scrollTo("features")}>Why HeartAI</button></li>
            </ul>
          </div>

          {/* Clinical Features */}
          <div className="footer-col">
            <h4 className="footer-heading">Evaluated Features</h4>
            <ul className="footer-links static">
              <li>Resting Blood Pressure & Max HR</li>
              <li>Serum Cholesterol (mg/dL)</li>
              <li>Fasting Blood Sugar Thresholds</li>
              <li>Resting Electrocardiogram (ECG)</li>
              <li>Exercise Induced Angina & ST Slope</li>
            </ul>
          </div>

          {/* Contact / Academic */}
          <div className="footer-col">
            <h4 className="footer-heading">Project & Support</h4>
            <p className="footer-contact-desc">
              Supervised Machine Learning Cardiovascular Classification Project.
            </p>
            <div className="contact-item">
              <FaEnvelope className="c-icon" />
              <span>heartai-ml-project@healthcare.edu</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          <div className="copyright-text">
            &copy; {new Date().getFullYear()} HeartAI. All rights reserved. Built for Healthcare AI & Supervised Learning.
          </div>
          <div className="tech-stack-tag">
            React.js &bull; scikit-learn &bull; StandardScaler &bull; Light Healthcare Glassmorphism
          </div>
        </div>
      </div>

      <style>{`
        .footer-wrapper {
          background: #0F172A;
          color: #F8FAFC;
          padding: 70px 0 30px;
          border-top: 1px solid #1E293B;
        }
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1.2fr 1.1fr;
          gap: 40px;
          padding-bottom: 50px;
          border-bottom: 1px solid #1E293B;
        }
        .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          margin-bottom: 18px;
        }
        .footer-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(232, 91, 63, 0.15);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          border: 1px solid rgba(232, 91, 63, 0.3);
        }
        .footer-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: -0.02em;
        }
        .footer-title .accent {
          color: var(--primary);
        }
        .footer-bio {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #94A3B8;
          margin-bottom: 20px;
          max-width: 360px;
        }
        .footer-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1E293B;
          color: #CBD5E1;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          border: 1px solid #334155;
        }

        .footer-heading {
          font-size: 1rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 20px;
          letter-spacing: 0.02em;
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links button {
          background: none;
          border: none;
          color: #94A3B8;
          font-size: 0.88rem;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 0;
          text-align: left;
        }
        .footer-links button:hover {
          color: var(--primary);
        }
        .footer-links.static li {
          color: #94A3B8;
          font-size: 0.86rem;
        }

        .footer-contact-desc {
          font-size: 0.86rem;
          color: #94A3B8;
          line-height: 1.5;
          margin-bottom: 16px;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.84rem;
          color: #E2E8F0;
        }
        .c-icon {
          color: var(--primary);
        }

        .footer-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          font-size: 0.8rem;
          color: #64748B;
          flex-wrap: wrap;
          gap: 16px;
        }

        @media (max-width: 992px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 600px) {
          .footer-main-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-row {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
