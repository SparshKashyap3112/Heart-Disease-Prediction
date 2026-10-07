import React, { useState } from "react";
import { 
  FaBrain, 
  FaTimes, 
  FaQuestionCircle, 
  FaHeartbeat, 
  FaStethoscope, 
  FaChevronRight, 
  FaCookieBite, 
  FaCheck 
} from "react-icons/fa";

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState("faq");

  return (
    <>
      {/* Floating AI Assistant Trigger Button */}
      <div className="floating-assistant-wrapper">
        <button
          type="button"
          className="floating-ai-trigger-btn heart-pulse"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open HeartAI Assistant"
        >
          {isOpen ? <FaTimes /> : <FaHeartbeat />}
          {!isOpen && <span className="ai-trigger-badge">AI Help</span>}
        </button>
      </div>

      {/* Floating Assistant Drawer / Modal */}
      {isOpen && (
        <div className="assistant-glass-modal glass-card">
          <div className="assistant-header">
            <div className="assistant-header-title">
              <div className="assistant-avatar">
                <FaBrain />
              </div>
              <div>
                <h4>HeartAI Assistant</h4>
                <span className="online-status"><span className="dot"></span> Active Clinical Guide</span>
              </div>
            </div>
            <button 
              type="button" 
              className="assistant-close-btn" 
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="assistant-nav-tabs">
            <button 
              type="button" 
              className={`tab-btn ${activeTab === "faq" ? "active" : ""}`}
              onClick={() => setActiveTab("faq")}
            >
              Clinical FAQ
            </button>
            <button 
              type="button" 
              className={`tab-btn ${activeTab === "metrics" ? "active" : ""}`}
              onClick={() => setActiveTab("metrics")}
            >
              Metric Ranges
            </button>
          </div>

          <div className="assistant-body">
            {activeTab === "faq" ? (
              <div className="faq-list">
                <div className="faq-item">
                  <h5 className="faq-q"><FaQuestionCircle className="faq-icon" /> What model is used for prediction?</h5>
                  <p className="faq-a">
                    A supervised <strong>Logistic Regression</strong> model trained on standardized multi-center cardiovascular data with 15 selected features.
                  </p>
                </div>
                <div className="faq-item">
                  <h5 className="faq-q"><FaQuestionCircle className="faq-icon" /> How are inputs processed?</h5>
                  <p className="faq-a">
                    Features undergo One-Hot categorical dummy encoding and are transformed with a pre-fitted <code>StandardScaler</code> before prediction.
                  </p>
                </div>
                <div className="faq-item">
                  <h5 className="faq-q"><FaQuestionCircle className="faq-icon" /> Is this a medical diagnosis?</h5>
                  <p className="faq-a">
                    No. The tool provides risk stratification for educational and informational purposes. Please consult a cardiologist for clinical advice.
                  </p>
                </div>
              </div>
            ) : (
              <div className="metrics-reference-list">
                <div className="ref-item">
                  <div className="ref-name">Resting Blood Pressure</div>
                  <div className="ref-val">Normal: &lt; 120 mm Hg &bull; Stage 1: 130-139 mm Hg</div>
                </div>
                <div className="ref-item">
                  <div className="ref-name">Serum Cholesterol</div>
                  <div className="ref-val">Desirable: &lt; 200 mg/dL &bull; High: &ge; 240 mg/dL</div>
                </div>
                <div className="ref-item">
                  <div className="ref-name">Fasting Blood Sugar</div>
                  <div className="ref-val">Normal: &le; 120 mg/dL &bull; Elevated: &gt; 120 mg/dL</div>
                </div>
                <div className="ref-item">
                  <div className="ref-name">Max Heart Rate</div>
                  <div className="ref-val">Typical peak exercise: 120 - 180 bpm</div>
                </div>
              </div>
            )}
          </div>

          <div className="assistant-footer">
            <span className="footer-tip">Tip: Use the preset test profiles on the form for fast evaluation.</span>
          </div>
        </div>
      )}

      {/* Bottom Cookie / Notice Bar */}
      {!cookieAccepted && (
        <div className="cookie-notice-banner glass-card">
          <div className="cookie-content">
            <FaCookieBite className="cookie-icon" />
            <span className="cookie-text">
              HeartAI uses essential cookies and local storage to provide secure session analytics and optimal responsive experience.
            </span>
          </div>
          <div className="cookie-actions">
            <button 
              type="button" 
              onClick={() => setCookieAccepted(true)} 
              className="btn btn-primary cookie-accept-btn"
            >
              <FaCheck className="cookie-btn-icon" />
              <span>Accept</span>
            </button>
            <button 
              type="button" 
              onClick={() => setCookieAccepted(true)} 
              className="btn btn-ghost cookie-learn-btn"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <style>{`
        .floating-assistant-wrapper {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
        }
        .floating-ai-trigger-btn {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E85B3F 0%, #D4472B 100%);
          color: #FFFFFF;
          border: 3px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 10px 30px -4px rgba(232, 91, 63, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }
        .floating-ai-trigger-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 14px 36px -4px rgba(232, 91, 63, 0.65);
        }
        .ai-trigger-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #0F172A;
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: var(--radius-full);
          border: 1px solid #334155;
        }

        /* Modal / Glass Panel */
        .assistant-glass-modal {
          position: fixed;
          bottom: 96px;
          right: 28px;
          width: 360px;
          max-width: calc(100vw - 40px);
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.18);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-glass);
          z-index: 999;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .assistant-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: #F8FAFC;
          border-bottom: 1px solid #EEF2F6;
        }
        .assistant-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .assistant-avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #FFF2EF;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .assistant-header h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 2px;
        }
        .online-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: var(--success);
          font-weight: 600;
        }
        .online-status .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--success);
        }
        .assistant-close-btn {
          background: none;
          border: none;
          font-size: 1.1rem;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
        }

        .assistant-nav-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid #EEF2F6;
        }
        .tab-btn {
          padding: 10px;
          background: #FFFFFF;
          border: none;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          border-bottom: 2px solid transparent;
        }
        .tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
          background: #FFF2EF;
        }

        .assistant-body {
          padding: 18px;
          max-height: 320px;
          overflow-y: auto;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .faq-item {
          background: #F8FAFC;
          padding: 12px;
          border-radius: var(--radius-sm);
          border: 1px solid #EEF2F6;
        }
        .faq-q {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .faq-icon {
          color: var(--primary);
        }
        .faq-a {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .metrics-reference-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ref-item {
          background: #F8FAFC;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          border: 1px solid #EEF2F6;
        }
        .ref-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 2px;
        }
        .ref-val {
          font-size: 0.74rem;
          color: var(--text-muted);
        }
        .assistant-footer {
          padding: 10px 16px;
          background: #F8FAFC;
          border-top: 1px solid #EEF2F6;
          font-size: 0.72rem;
          color: var(--text-subtle);
        }

        /* Cookie Notice Bar */
        .cookie-notice-banner {
          position: fixed;
          bottom: 20px;
          left: 20px;
          max-width: 460px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 15px 35px -5px rgba(15, 23, 42, 0.15);
          padding: 14px 18px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-glass);
          z-index: 998;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          animation: slideUp 0.4s ease-out;
        }
        .cookie-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .cookie-icon {
          color: var(--warning);
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .cookie-text {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .cookie-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .cookie-accept-btn {
          padding: 6px 14px;
          font-size: 0.78rem;
        }
        .cookie-btn-icon {
          font-size: 0.7rem;
        }
        .cookie-learn-btn {
          padding: 6px 10px;
          font-size: 0.78rem;
        }

        @media (max-width: 600px) {
          .cookie-notice-banner {
            left: 10px;
            right: 10px;
            bottom: 10px;
            max-width: none;
            flex-direction: column;
            align-items: stretch;
          }
          .cookie-actions {
            justify-content: flex-end;
          }
        }
      `}</style>
    </>
  );
}
