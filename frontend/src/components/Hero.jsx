import React from "react";
import { 
  FaHeartbeat, 
  FaArrowRight, 
  FaCheckCircle, 
  FaWaveSquare, 
  FaBrain, 
  FaShieldAlt,
  FaStethoscope,
  FaChartLine
} from "react-icons/fa";

export default function Hero({ onStartClick }) {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse-dot"></span>
            <span className="badge-text">AI-POWERED HEALTHCARE</span>
          </div>

          <h1 className="hero-title">
            Understand Your <span className="highlight-text">Heart Health</span> with AI
          </h1>

          <p className="hero-description">
            Use your health information to generate a machine learning based heart disease risk prediction. 
            Trained on multi-dimensional clinical parameters to help evaluate cardiovascular risk factors early.
          </p>

          <div className="hero-cta-group">
            <button 
              type="button" 
              onClick={() => onStartClick ? onStartClick() : scrollTo("prediction")} 
              className="btn btn-primary hero-btn-main"
            >
              <span>Check Your Risk</span>
              <FaArrowRight className="btn-icon" />
            </button>

            <button 
              type="button" 
              onClick={() => scrollTo("how-it-works")} 
              className="btn btn-secondary hero-btn-secondary"
            >
              <span>How It Works</span>
            </button>
          </div>

          <div className="hero-trust-row">
            <div className="trust-item">
              <FaCheckCircle className="trust-icon" />
              <span>Standardized Clinical Scaling</span>
            </div>
            <div className="trust-item">
              <FaCheckCircle className="trust-icon" />
              <span>15 Clinical Features</span>
            </div>
            <div className="trust-item">
              <FaCheckCircle className="trust-icon" />
              <span>Instant AI Evaluation</span>
            </div>
          </div>
        </div>

        {/* Right Healthcare Visual */}
        <div className="hero-visual-wrapper">
          <div className="hero-main-card glass-card">
            {/* Header of Card */}
            <div className="card-top-bar">
              <div className="card-indicator">
                <span className="live-dot"></span>
                <span>Active Diagnostic Model</span>
              </div>
              <span className="model-chip">Logistic Regression</span>
            </div>

            {/* Central Heart Visualization */}
            <div className="heart-visual-center">
              <div className="pulse-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>

              <div className="heart-icon-box">
                <FaHeartbeat className="hero-heart-svg heart-pulse" />
              </div>

              <div className="ecg-monitor-line">
                <svg viewBox="0 0 500 80" className="ecg-svg">
                  <path
                    d="M 0 40 L 100 40 L 120 40 L 130 15 L 140 65 L 155 5 L 170 55 L 180 40 L 250 40 L 270 40 L 280 15 L 290 65 L 305 5 L 320 55 L 330 40 L 500 40"
                    fill="none"
                    stroke="#E85B3F"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animated-ecg-path"
                  />
                </svg>
              </div>

              <div className="heart-rate-stat">
                <span className="hr-number">72</span>
                <span className="hr-unit">BPM NORMAL RHYTHM</span>
              </div>
            </div>

            {/* Mini Parameter Indicators */}
            <div className="card-metrics-grid">
              <div className="metric-pill">
                <FaStethoscope className="pill-icon" />
                <div>
                  <div className="pill-label">Resting BP</div>
                  <div className="pill-val">120/80 mmHg</div>
                </div>
              </div>
              <div className="metric-pill">
                <FaChartLine className="pill-icon" />
                <div>
                  <div className="pill-label">Cholesterol</div>
                  <div className="pill-val">Optimal Scale</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Glass Badges */}
          <div className="floating-badge badge-ai-analysis glass-card">
            <div className="floating-icon-box coral">
              <FaBrain />
            </div>
            <div>
              <div className="floating-title">AI Analysis</div>
              <div className="floating-sub">Real-time Inference</div>
            </div>
          </div>

          <div className="floating-badge badge-health-assessment glass-card">
            <div className="floating-icon-box teal">
              <FaWaveSquare />
            </div>
            <div>
              <div className="floating-title">Health Assessment</div>
              <div className="floating-sub">15 Features Processed</div>
            </div>
          </div>

          <div className="floating-badge badge-ready glass-card">
            <div className="floating-icon-box green">
              <FaShieldAlt />
            </div>
            <div>
              <div className="floating-title">Prediction Ready</div>
              <div className="floating-sub">StandardScaler Active</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding: 60px 0 90px;
          background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
          overflow: hidden;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 56px;
          align-items: center;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFF2EF;
          border: 1px solid rgba(232, 91, 63, 0.25);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          margin-bottom: 24px;
        }
        .badge-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 0 3px rgba(232, 91, 63, 0.25);
          animation: pulseHeart 1.8s infinite;
        }
        .badge-text {
          color: var(--primary);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .hero-title {
          font-size: 3.4rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.035em;
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .highlight-text {
          color: var(--primary);
          position: relative;
          display: inline-block;
        }
        .hero-description {
          font-size: 1.15rem;
          line-height: 1.65;
          color: var(--text-muted);
          margin-bottom: 36px;
          max-width: 580px;
        }
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .hero-btn-main {
          padding: 15px 32px;
          font-size: 1.05rem;
        }
        .hero-btn-secondary {
          padding: 15px 28px;
          font-size: 1.05rem;
        }
        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          padding-top: 20px;
          border-top: 1px solid #E2E8F0;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .trust-icon {
          color: var(--success);
          font-size: 1rem;
        }

        /* Right Visual Container */
        .hero-visual-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-main-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255, 255, 255, 0.92);
          padding: 28px;
          position: relative;
          z-index: 2;
        }
        .card-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .card-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--success);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }
        .model-chip {
          background: #F1F5F9;
          color: var(--text-main);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-sm);
        }
        .heart-visual-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 0 10px;
        }
        .pulse-rings {
          position: absolute;
          top: 36%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(232, 91, 63, 0.15);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .ring-1 { width: 140px; height: 140px; animation: pulseHeart 3s infinite; }
        .ring-2 { width: 200px; height: 200px; animation: pulseHeart 3s infinite 0.4s; }
        .ring-3 { width: 260px; height: 260px; animation: pulseHeart 3s infinite 0.8s; opacity: 0.5; }

        .heart-icon-box {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFF2EF 0%, #FFE2DC 100%);
          border: 2px solid rgba(232, 91, 63, 0.3);
          box-shadow: 0 10px 25px -5px rgba(232, 91, 63, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          z-index: 3;
        }
        .hero-heart-svg {
          font-size: 2.8rem;
          color: var(--primary);
        }
        .ecg-monitor-line {
          width: 100%;
          height: 50px;
          margin-bottom: 12px;
        }
        .ecg-svg {
          width: 100%;
          height: 100%;
        }
        .heart-rate-stat {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        .hr-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-main);
          font-family: var(--font-heading);
          line-height: 1;
        }
        .hr-unit {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--text-subtle);
        }
        .card-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid #F1F5F9;
        }
        .metric-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F8FAFC;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          border: 1px solid #EEF2F6;
        }
        .pill-icon {
          color: var(--primary);
          font-size: 1.1rem;
        }
        .pill-label {
          font-size: 0.72rem;
          color: var(--text-subtle);
          font-weight: 500;
        }
        .pill-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }

        /* Floating Cards */
        .floating-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.95);
          z-index: 3;
          animation: float 5s ease-in-out infinite;
        }
        .floating-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }
        .floating-icon-box.coral { background: #FFF2EF; color: var(--primary); }
        .floating-icon-box.teal { background: #F0F9FF; color: var(--secondary); }
        .floating-icon-box.green { background: #ECFDF5; color: var(--success); }
        .floating-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }
        .floating-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .badge-ai-analysis {
          top: -12px;
          right: -15px;
          animation-delay: 0s;
        }
        .badge-health-assessment {
          bottom: 40px;
          left: -25px;
          animation-delay: 1.5s;
        }
        .badge-ready {
          top: 45%;
          right: -30px;
          animation-delay: 2.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }
          .hero-title {
            font-size: 2.6rem;
          }
          .hero-description {
            margin: 0 auto 32px;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .hero-trust-row {
            justify-content: center;
          }
          .hero-visual-wrapper {
            margin-top: 10px;
          }
          .badge-health-assessment {
            left: 0;
          }
          .badge-ai-analysis {
            right: 0;
          }
          .badge-ready {
            display: none;
          }
        }
        @media (max-width: 576px) {
          .hero-title {
            font-size: 2.1rem;
          }
          .hero-btn-main, .hero-btn-secondary {
            width: 100%;
          }
          .floating-badge {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
