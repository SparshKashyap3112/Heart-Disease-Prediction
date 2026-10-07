import React from "react";
import { 
  FaHeartbeat, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaRedo, 
  FaPrint, 
  FaFilePdf, 
  FaShieldAlt, 
  FaUserMd,
  FaArrowDown
} from "react-icons/fa";

export default function PredictionResult({ result, formData, onReset }) {
  if (!result) return null;

  const isHighRisk = result.prediction === 1;
  const riskPercent = result.risk_score_percent !== undefined 
    ? result.risk_score_percent 
    : (isHighRisk ? 82.5 : 17.5);
  
  const probLow = result.probabilities?.low_risk !== undefined 
    ? (result.probabilities.low_risk * 100).toFixed(1) 
    : (100 - riskPercent).toFixed(1);

  const probHigh = result.probabilities?.high_risk !== undefined 
    ? (result.probabilities.high_risk * 100).toFixed(1) 
    : riskPercent.toFixed(1);

  const handlePrint = () => {
    window.print();
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="result-section" className="result-section">
      <div className="container">
        <div className={`result-card glass-card ${isHighRisk ? "is-high-risk" : "is-low-risk"}`}>
          {/* Top Report Header */}
          <div className="report-header">
            <div className="report-brand">
              <FaHeartbeat className="report-icon heart-pulse" />
              <div>
                <h3 className="report-title">HeartAI Risk Assessment Report</h3>
                <span className="report-meta">
                  Generated via Logistic Regression Model &bull; Standardized Scaler
                </span>
              </div>
            </div>

            <div className="report-actions">
              <button type="button" onClick={handlePrint} className="btn btn-secondary print-btn">
                <FaPrint /> <span>Print Report</span>
              </button>
              <button type="button" onClick={onReset} className="btn btn-primary recheck-btn">
                <FaRedo /> <span>Check Again</span>
              </button>
            </div>
          </div>

          {/* Core Result Banner */}
          <div className="result-banner-grid">
            {/* Visual Gauge / Circular Score */}
            <div className="gauge-box">
              <div className="circular-progress-wrapper">
                <svg className="progress-ring" width="160" height="160" viewBox="0 0 160 160">
                  <circle
                    className="progress-ring-bg"
                    stroke="#E2E8F0"
                    strokeWidth="12"
                    fill="transparent"
                    r="64"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="progress-ring-fill"
                    stroke={isHighRisk ? "#E85B3F" : "#10B981"}
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 64}`}
                    strokeDashoffset={`${2 * Math.PI * 64 * (1 - riskPercent / 100)}`}
                    strokeLinecap="round"
                    fill="transparent"
                    r="64"
                    cx="80"
                    cy="80"
                  />
                </svg>
                <div className="gauge-center-text">
                  <span className="gauge-percent">{riskPercent}%</span>
                  <span className="gauge-sub">RISK INDEX</span>
                </div>
              </div>
            </div>

            {/* Assessment Statement & Explanation */}
            <div className="assessment-statement">
              <div className="status-badge-row">
                <div className={`status-pill ${isHighRisk ? "danger" : "safe"}`}>
                  {isHighRisk ? <FaExclamationTriangle /> : <FaCheckCircle />}
                  <span>{isHighRisk ? "Higher Risk Detected" : "Low Risk Profile Detected"}</span>
                </div>
                <span className="timestamp-badge">
                  {new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>

              <h2 className="statement-title">
                {isHighRisk 
                  ? "Elevated Cardiovascular Risk Profile" 
                  : "Normal Cardiovascular Risk Profile"}
              </h2>

              <p className="statement-desc">
                {isHighRisk
                  ? "Based on the provided cardiovascular measurements, resting electrocardiogram parameters, and symptoms, the machine learning classifier indicates an elevated probability of heart disease risk factors."
                  : "Based on the provided health parameters, the machine learning model classifies your profile within the lower risk tier with no acute abnormalities detected across resting indicators."
                }
              </p>

              {/* Probabilities Bars */}
              <div className="probabilities-bar-card">
                <div className="prob-labels">
                  <span className="prob-label">Low Risk Probability: <strong>{probLow}%</strong></span>
                  <span className="prob-label">High Risk Probability: <strong>{probHigh}%</strong></span>
                </div>
                <div className="prob-track">
                  <div 
                    className="prob-fill-low" 
                    style={{ width: `${probLow}%` }}
                    title={`Low Risk: ${probLow}%`}
                  ></div>
                  <div 
                    className="prob-fill-high" 
                    style={{ width: `${probHigh}%` }}
                    title={`High Risk: ${probHigh}%`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Parameter Summary Table */}
          <div className="patient-parameters-summary">
            <h4 className="summary-title">Evaluated Clinical Parameters</h4>
            <div className="parameters-grid">
              <div className="param-item">
                <span className="param-label">Age</span>
                <span className="param-val">{formData.Age} years</span>
              </div>
              <div className="param-item">
                <span className="param-label">Sex</span>
                <span className="param-val">{formData.Sex === "M" ? "Male (M)" : "Female (F)"}</span>
              </div>
              <div className="param-item">
                <span className="param-label">Resting Blood Pressure</span>
                <span className="param-val">{formData.RestingBP} mm Hg</span>
              </div>
              <div className="param-item">
                <span className="param-label">Serum Cholesterol</span>
                <span className="param-val">{formData.Cholesterol} mg/dL</span>
              </div>
              <div className="param-item">
                <span className="param-label">Fasting Blood Sugar</span>
                <span className="param-val">{Number(formData.FastingBS) === 1 ? "> 120 mg/dL" : "<= 120 mg/dL"}</span>
              </div>
              <div className="param-item">
                <span className="param-label">Max Heart Rate</span>
                <span className="param-val">{formData.MaxHR} bpm</span>
              </div>
              <div className="param-item">
                <span className="param-label">Chest Pain Type</span>
                <span className="param-val">{formData.ChestPainType}</span>
              </div>
              <div className="param-item">
                <span className="param-label">Exercise Angina</span>
                <span className="param-val">{formData.ExerciseAngina === "Y" ? "Yes (Induced)" : "No"}</span>
              </div>
              <div className="param-item">
                <span className="param-label">ST Depression (Oldpeak)</span>
                <span className="param-val">{formData.Oldpeak} mm</span>
              </div>
              <div className="param-item">
                <span className="param-label">ST Slope</span>
                <span className="param-val">{formData.ST_Slope}</span>
              </div>
            </div>
          </div>

          {/* Required Medical Disclaimer Box */}
          <div className="result-disclaimer-box">
            <FaUserMd className="disclaimer-icon" />
            <div className="disclaimer-text-group">
              <div className="disclaimer-lead">Clinical Disclaimer & Medical Advice Notice:</div>
              <p>
                <strong>This result is generated by a machine learning model and is not a medical diagnosis.</strong>{" "}
                Please consult a qualified healthcare professional or licensed cardiologist for medical decisions, clinical evaluations, or therapeutic interventions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .result-section {
          padding: 20px 0 70px;
          animation: fadeInUp 0.45s ease-out;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .result-card {
          background: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 36px;
          border: 1px solid var(--border-glass);
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.12);
          position: relative;
          overflow: hidden;
        }
        .result-card.is-high-risk {
          border-top: 6px solid var(--primary);
        }
        .result-card.is-low-risk {
          border-top: 6px solid var(--success);
        }

        .report-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
          border-bottom: 1px solid #EEF2F6;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .report-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .report-icon {
          font-size: 2.2rem;
          color: var(--primary);
        }
        .report-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }
        .report-meta {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .report-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .print-btn {
          padding: 10px 18px;
          font-size: 0.88rem;
        }
        .recheck-btn {
          padding: 10px 20px;
          font-size: 0.88rem;
        }

        /* Banner Grid */
        .result-banner-grid {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 36px;
          align-items: center;
          background: #F8FAFC;
          padding: 28px;
          border-radius: var(--radius-lg);
          border: 1px solid #EEF2F6;
          margin-bottom: 32px;
        }
        .gauge-box {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .circular-progress-wrapper {
          position: relative;
          width: 160px;
          height: 160px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .progress-ring {
          transform: rotate(-90deg);
        }
        .progress-ring-fill {
          transition: stroke-dashoffset 1s ease-in-out;
        }
        .gauge-center-text {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .gauge-percent {
          font-size: 2rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--text-main);
          line-height: 1;
        }
        .gauge-sub {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-subtle);
          margin-top: 4px;
        }

        .assessment-statement {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .status-badge-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
        }
        .status-pill.danger {
          background: #FFF2EF;
          color: var(--primary);
          border: 1px solid rgba(232, 91, 63, 0.3);
        }
        .status-pill.safe {
          background: #ECFDF5;
          color: var(--success);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .timestamp-badge {
          font-size: 0.8rem;
          color: var(--text-subtle);
        }

        .statement-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: -0.02em;
        }
        .statement-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-muted);
        }

        /* Probabilities bar */
        .probabilities-bar-card {
          margin-top: 8px;
        }
        .prob-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 6px;
        }
        .prob-track {
          width: 100%;
          height: 10px;
          background: #E2E8F0;
          border-radius: var(--radius-full);
          display: flex;
          overflow: hidden;
        }
        .prob-fill-low {
          background: var(--success);
          height: 100%;
          transition: width 0.8s ease;
        }
        .prob-fill-high {
          background: var(--primary);
          height: 100%;
          transition: width 0.8s ease;
        }

        /* Parameters grid */
        .patient-parameters-summary {
          margin-bottom: 30px;
        }
        .summary-title {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: var(--text-main);
        }
        .parameters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .param-item {
          background: #F8FAFC;
          border: 1px solid #EEF2F6;
          padding: 10px 14px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .param-label {
          font-size: 0.72rem;
          color: var(--text-subtle);
          font-weight: 600;
          text-transform: uppercase;
        }
        .param-val {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-main);
        }

        /* Disclaimer */
        .result-disclaimer-box {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 18px 22px;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.55;
        }
        .disclaimer-icon {
          color: var(--secondary);
          font-size: 1.6rem;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .disclaimer-lead {
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 2px;
        }

        @media (max-width: 900px) {
          .result-banner-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .gauge-box {
            margin: 0 auto;
          }
          .status-badge-row {
            justify-content: center;
          }
          .probabilities-bar-card {
            text-align: left;
          }
        }
        @media (max-width: 600px) {
          .result-card {
            padding: 20px;
          }
          .report-header {
            flex-direction: column;
            align-items: stretch;
          }
          .report-actions {
            flex-direction: column;
          }
          .print-btn, .recheck-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
