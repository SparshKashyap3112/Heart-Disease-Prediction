import React from "react";
import { 
  FaClipboardList, 
  FaCogs, 
  FaBrain, 
  FaFileMedical, 
  FaArrowRight 
} from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <FaClipboardList />,
      title: "Enter Your Information",
      description: "Provide required demographic and clinical metrics including Blood Pressure, Serum Cholesterol, ECG status, and symptom indicators."
    },
    {
      num: "02",
      icon: <FaCogs />,
      title: "Feature Preprocessing",
      description: "Inputs are transformed via One-Hot encoding and standardized through the exact pre-fitted StandardScaler to normalize feature distributions."
    },
    {
      num: "03",
      icon: <FaBrain />,
      title: "AI Model Inference",
      description: "Our trained Logistic Regression classifier analyzes the 15 selected features to compute calibrated cardiovascular risk probabilities."
    },
    {
      num: "04",
      icon: <FaFileMedical />,
      title: "Review Assessment",
      description: "Examine your calculated risk index, parameter summary, and educational recommendations for healthcare provider consultations."
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            CLINICAL WORKFLOW
          </div>
          <h2 className="section-title">How HeartAI Works</h2>
          <p className="section-subtitle">
            A seamless 4-step pipeline designed for rapid, standardized machine learning 
            cardiovascular risk assessment.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="steps-container">
          <div className="steps-connecting-line"></div>
          <div className="steps-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="step-card glass-card">
                <div className="step-top-row">
                  <div className="step-number-circle">
                    {step.num}
                  </div>
                  <div className="step-icon-wrapper">
                    {step.icon}
                  </div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .how-it-works-section {
          padding: 80px 0;
          background: #FFFFFF;
          position: relative;
        }
        .steps-container {
          position: relative;
          margin-top: 20px;
        }
        .steps-connecting-line {
          position: absolute;
          top: 60px;
          left: 60px;
          right: 60px;
          height: 2px;
          background: linear-gradient(90deg, #E2E8F0 0%, #E85B3F 50%, #E2E8F0 100%);
          z-index: 1;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
          z-index: 2;
        }
        .step-card {
          padding: 30px 24px;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          border: 1px solid var(--border-light);
        }
        .step-card:hover {
          transform: translateY(-6px);
          border-color: rgba(232, 91, 63, 0.3);
          box-shadow: var(--shadow-lg);
        }
        .step-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .step-number-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFF2EF 0%, #FFE2DC 100%);
          color: var(--primary);
          border: 2px solid rgba(232, 91, 63, 0.25);
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(232, 91, 63, 0.15);
        }
        .step-icon-wrapper {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #F8FAFC;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }
        .step-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .step-desc {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .steps-connecting-line {
            display: none;
          }
        }
        @media (max-width: 600px) {
          .steps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
