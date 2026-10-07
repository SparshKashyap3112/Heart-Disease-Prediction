import React from "react";
import { 
  FaUser, 
  FaHeartbeat, 
  FaStethoscope, 
  FaTint, 
  FaTachometerAlt, 
  FaChartArea, 
  FaRunning, 
  FaWaveSquare, 
  FaSpinner, 
  FaUndo, 
  FaCheck,
  FaExclamationCircle,
  FaInfoCircle,
  FaSlidersH
} from "react-icons/fa";
import { PRESET_PROFILES } from "../utils/validation";

export default function PredictionForm({ 
  formData, 
  onChange, 
  onSubmit, 
  onReset, 
  onLoadPreset, 
  errors, 
  loading,
  apiError 
}) {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <section id="prediction" className="prediction-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <FaStethoscope /> HEART HEALTH ASSESSMENT
          </div>
          <h2 className="section-title">Enter Your Health Information</h2>
          <p className="section-subtitle">
            Provide the clinical parameters below. Our pre-trained machine learning model 
            standardizes the features and predicts cardiovascular risk with high precision.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="preset-bar-card glass-card">
          <div className="preset-bar-header">
            <FaSlidersH className="preset-icon" />
            <span className="preset-title">Quick Test Profiles:</span>
            <span className="preset-hint">Load sample data to test the ML model instantly</span>
          </div>
          <div className="preset-buttons-row">
            {PRESET_PROFILES.map((profile) => (
              <button
                key={profile.id}
                type="button"
                className="preset-pill-btn"
                onClick={() => onLoadPreset(profile.values)}
              >
                <span className="preset-pill-badge">{profile.badge}</span>
                <span className="preset-pill-name">{profile.name}</span>
              </button>
            ))}
            <button
              type="button"
              className="preset-pill-btn reset-btn"
              onClick={onReset}
              title="Reset all fields"
            >
              <FaUndo className="reset-icon" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Prediction Form Card */}
        <form onSubmit={onSubmit} className="prediction-form-card glass-card" noValidate>
          {apiError && (
            <div className="form-alert-banner">
              <FaExclamationCircle className="alert-icon" />
              <div className="alert-content">
                <strong>ML Backend Connection Alert:</strong>
                <span> {apiError}</span>
              </div>
            </div>
          )}

          <div className="form-sections-grid">
            {/* GROUP 1: Personal Demographics */}
            <div className="form-group-block">
              <div className="group-heading">
                <div className="group-icon-box"><FaUser /></div>
                <div>
                  <h3 className="group-title">1. Personal Information</h3>
                  <p className="group-desc">Baseline patient demographics</p>
                </div>
              </div>

              <div className="fields-grid">
                {/* Age */}
                <div className={`form-field ${errors.Age ? "has-error" : ""}`}>
                  <label htmlFor="input-age" className="field-label">
                    <span>Age</span>
                    <span className="field-unit">years</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="input-age"
                      type="number"
                      min="18"
                      max="100"
                      value={formData.Age}
                      onChange={(e) => handleInputChange("Age", e.target.value)}
                      placeholder="e.g. 52"
                      className="form-input"
                    />
                  </div>
                  {errors.Age && <span className="field-error-msg">{errors.Age}</span>}
                  <span className="field-hint">Range: 18 - 100 years</span>
                </div>

                {/* Sex */}
                <div className={`form-field ${errors.Sex ? "has-error" : ""}`}>
                  <label className="field-label">
                    <span>Sex (Biological)</span>
                  </label>
                  <div className="segmented-control">
                    <button
                      type="button"
                      className={`segment-btn ${formData.Sex === "M" ? "active" : ""}`}
                      onClick={() => handleInputChange("Sex", "M")}
                    >
                      {formData.Sex === "M" && <FaCheck className="seg-check" />}
                      <span>Male (M)</span>
                    </button>
                    <button
                      type="button"
                      className={`segment-btn ${formData.Sex === "F" ? "active" : ""}`}
                      onClick={() => handleInputChange("Sex", "F")}
                    >
                      {formData.Sex === "F" && <FaCheck className="seg-check" />}
                      <span>Female (F)</span>
                    </button>
                  </div>
                  {errors.Sex && <span className="field-error-msg">{errors.Sex}</span>}
                  <span className="field-hint">Binary encoded (M=0, F=1)</span>
                </div>
              </div>
            </div>

            {/* GROUP 2: Cardiovascular Measurements */}
            <div className="form-group-block">
              <div className="group-heading">
                <div className="group-icon-box"><FaHeartbeat /></div>
                <div>
                  <h3 className="group-title">2. Cardiovascular Measurements</h3>
                  <p className="group-desc">Physiological vital signs and lipid profile</p>
                </div>
              </div>

              <div className="fields-grid four-col">
                {/* Resting Blood Pressure */}
                <div className={`form-field ${errors.RestingBP ? "has-error" : ""}`}>
                  <label htmlFor="input-bp" className="field-label">
                    <span>Resting BP</span>
                    <span className="field-unit">mm Hg</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="input-bp"
                      type="number"
                      min="70"
                      max="220"
                      value={formData.RestingBP}
                      onChange={(e) => handleInputChange("RestingBP", e.target.value)}
                      placeholder="e.g. 130"
                      className="form-input"
                    />
                  </div>
                  {errors.RestingBP && <span className="field-error-msg">{errors.RestingBP}</span>}
                  <span className="field-hint">Systolic BP on admission (normal &lt;120)</span>
                </div>

                {/* Cholesterol */}
                <div className={`form-field ${errors.Cholesterol ? "has-error" : ""}`}>
                  <label htmlFor="input-chol" className="field-label">
                    <span>Cholesterol</span>
                    <span className="field-unit">mg/dL</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="input-chol"
                      type="number"
                      min="0"
                      max="600"
                      value={formData.Cholesterol}
                      onChange={(e) => handleInputChange("Cholesterol", e.target.value)}
                      placeholder="e.g. 220"
                      className="form-input"
                    />
                  </div>
                  {errors.Cholesterol && <span className="field-error-msg">{errors.Cholesterol}</span>}
                  <span className="field-hint">Serum cholesterol (desirable &lt;200)</span>
                </div>

                {/* Maximum Heart Rate */}
                <div className={`form-field ${errors.MaxHR ? "has-error" : ""}`}>
                  <label htmlFor="input-maxhr" className="field-label">
                    <span>Max Heart Rate</span>
                    <span className="field-unit">bpm</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="input-maxhr"
                      type="number"
                      min="60"
                      max="220"
                      value={formData.MaxHR}
                      onChange={(e) => handleInputChange("MaxHR", e.target.value)}
                      placeholder="e.g. 145"
                      className="form-input"
                    />
                  </div>
                  {errors.MaxHR && <span className="field-error-msg">{errors.MaxHR}</span>}
                  <span className="field-hint">Maximum heart rate achieved</span>
                </div>

                {/* ST Depression (Oldpeak) */}
                <div className={`form-field ${errors.Oldpeak ? "has-error" : ""}`}>
                  <label htmlFor="input-oldpeak" className="field-label">
                    <span>ST Depression (Oldpeak)</span>
                    <span className="field-unit">mm</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      id="input-oldpeak"
                      type="number"
                      step="0.1"
                      min="-2.5"
                      max="6.5"
                      value={formData.Oldpeak}
                      onChange={(e) => handleInputChange("Oldpeak", e.target.value)}
                      placeholder="e.g. 1.2"
                      className="form-input"
                    />
                  </div>
                  {errors.Oldpeak && <span className="field-error-msg">{errors.Oldpeak}</span>}
                  <span className="field-hint">Exercise relative to rest</span>
                </div>
              </div>
            </div>

            {/* GROUP 3: Clinical Indicators */}
            <div className="form-group-block">
              <div className="group-heading">
                <div className="group-icon-box"><FaWaveSquare /></div>
                <div>
                  <h3 className="group-title">3. Clinical Indicators & Electrocardiogram</h3>
                  <p className="group-desc">Symptom classification and cardiac electrical response</p>
                </div>
              </div>

              <div className="fields-grid three-col">
                {/* Chest Pain Type */}
                <div className={`form-field ${errors.ChestPainType ? "has-error" : ""}`}>
                  <label htmlFor="input-cpt" className="field-label">
                    <span>Chest Pain Type</span>
                  </label>
                  <select
                    id="input-cpt"
                    value={formData.ChestPainType}
                    onChange={(e) => handleInputChange("ChestPainType", e.target.value)}
                    className="form-select"
                  >
                    <option value="ASY">ASY — Asymptomatic</option>
                    <option value="ATA">ATA — Atypical Angina</option>
                    <option value="NAP">NAP — Non-Anginal Pain</option>
                    <option value="TA">TA — Typical Angina</option>
                  </select>
                  {errors.ChestPainType && <span className="field-error-msg">{errors.ChestPainType}</span>}
                  <span className="field-hint">Model features: ATA, NAP vs baseline</span>
                </div>

                {/* Fasting Blood Sugar */}
                <div className="form-field">
                  <label className="field-label">
                    <span>Fasting Blood Sugar</span>
                  </label>
                  <div className="segmented-control">
                    <button
                      type="button"
                      className={`segment-btn ${Number(formData.FastingBS) === 0 ? "active" : ""}`}
                      onClick={() => handleInputChange("FastingBS", 0)}
                    >
                      {Number(formData.FastingBS) === 0 && <FaCheck className="seg-check" />}
                      <span>&le; 120 mg/dL</span>
                    </button>
                    <button
                      type="button"
                      className={`segment-btn ${Number(formData.FastingBS) === 1 ? "active" : ""}`}
                      onClick={() => handleInputChange("FastingBS", 1)}
                    >
                      {Number(formData.FastingBS) === 1 && <FaCheck className="seg-check" />}
                      <span>&gt; 120 mg/dL</span>
                    </button>
                  </div>
                  <span className="field-hint">Elevated fasting blood sugar threshold</span>
                </div>

                {/* Resting ECG */}
                <div className={`form-field ${errors.RestingECG ? "has-error" : ""}`}>
                  <label htmlFor="input-recg" className="field-label">
                    <span>Resting ECG Results</span>
                  </label>
                  <select
                    id="input-recg"
                    value={formData.RestingECG}
                    onChange={(e) => handleInputChange("RestingECG", e.target.value)}
                    className="form-select"
                  >
                    <option value="Normal">Normal — Standard Rhythm</option>
                    <option value="ST">ST — ST-T Wave Abnormality</option>
                    <option value="LVH">LVH — Left Ventricular Hypertrophy</option>
                  </select>
                  {errors.RestingECG && <span className="field-error-msg">{errors.RestingECG}</span>}
                  <span className="field-hint">Electrocardiogram interpretation</span>
                </div>

                {/* Exercise Induced Angina */}
                <div className="form-field">
                  <label className="field-label">
                    <span>Exercise-Induced Angina</span>
                  </label>
                  <div className="segmented-control">
                    <button
                      type="button"
                      className={`segment-btn ${formData.ExerciseAngina === "N" ? "active" : ""}`}
                      onClick={() => handleInputChange("ExerciseAngina", "N")}
                    >
                      {formData.ExerciseAngina === "N" && <FaCheck className="seg-check" />}
                      <span>No (N)</span>
                    </button>
                    <button
                      type="button"
                      className={`segment-btn ${formData.ExerciseAngina === "Y" ? "active" : ""}`}
                      onClick={() => handleInputChange("ExerciseAngina", "Y")}
                    >
                      {formData.ExerciseAngina === "Y" && <FaCheck className="seg-check" />}
                      <span>Yes (Y)</span>
                    </button>
                  </div>
                  <span className="field-hint">Angina pain during physical exertion</span>
                </div>

                {/* ST Slope */}
                <div className={`form-field ${errors.ST_Slope ? "has-error" : ""}`}>
                  <label className="field-label">
                    <span>ST Slope (Peak Exercise)</span>
                  </label>
                  <div className="segmented-control three-segment">
                    <button
                      type="button"
                      className={`segment-btn ${formData.ST_Slope === "Up" ? "active" : ""}`}
                      onClick={() => handleInputChange("ST_Slope", "Up")}
                    >
                      {formData.ST_Slope === "Up" && <FaCheck className="seg-check" />}
                      <span>Up (Upsloping)</span>
                    </button>
                    <button
                      type="button"
                      className={`segment-btn ${formData.ST_Slope === "Flat" ? "active" : ""}`}
                      onClick={() => handleInputChange("ST_Slope", "Flat")}
                    >
                      {formData.ST_Slope === "Flat" && <FaCheck className="seg-check" />}
                      <span>Flat</span>
                    </button>
                    <button
                      type="button"
                      className={`segment-btn ${formData.ST_Slope === "Down" ? "active" : ""}`}
                      onClick={() => handleInputChange("ST_Slope", "Down")}
                    >
                      {formData.ST_Slope === "Down" && <FaCheck className="seg-check" />}
                      <span>Down</span>
                    </button>
                  </div>
                  {errors.ST_Slope && <span className="field-error-msg">{errors.ST_Slope}</span>}
                  <span className="field-hint">Slope of peak exercise ST segment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="form-submit-footer">
            <div className="security-notice">
              <FaInfoCircle className="info-icon" />
              <span>Inputs are scaled using StandardScaler and processed locally.</span>
            </div>

            <div className="submit-btn-group">
              <button
                type="button"
                onClick={onReset}
                className="btn btn-secondary form-reset-btn"
                disabled={loading}
              >
                Clear Fields
              </button>

              <button
                type="submit"
                className="btn btn-primary form-predict-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spin-icon" />
                    <span>Evaluating ML Model...</span>
                  </>
                ) : (
                  <>
                    <span>Predict Heart Disease Risk</span>
                    <span className="arrow-sym">&rarr;</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .prediction-section {
          padding: 60px 0 80px;
          background: #FAFBFC;
          position: relative;
        }
        .preset-bar-card {
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.95);
          gap: 16px;
          flex-wrap: wrap;
        }
        .preset-bar-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .preset-icon {
          color: var(--primary);
          font-size: 1.1rem;
        }
        .preset-title {
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--text-main);
        }
        .preset-hint {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .preset-buttons-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .preset-pill-btn {
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
        .preset-pill-btn:hover {
          background: #FFFFFF;
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
        .preset-pill-badge {
          background: #E2E8F0;
          color: var(--text-muted);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .reset-btn {
          background: transparent;
          color: var(--text-muted);
        }
        .reset-icon {
          font-size: 0.75rem;
        }

        /* Main Form Card */
        .prediction-form-card {
          padding: 36px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-glass);
        }
        .form-alert-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--danger-light);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #991B1B;
          padding: 14px 18px;
          border-radius: var(--radius-md);
          margin-bottom: 28px;
          font-size: 0.9rem;
        }
        .alert-icon {
          font-size: 1.2rem;
          color: var(--danger);
          flex-shrink: 0;
        }

        .form-sections-grid {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .form-group-block {
          padding-bottom: 32px;
          border-bottom: 1px solid #EEF2F6;
        }
        .form-group-block:last-child {
          border-bottom: none;
          padding-bottom: 10px;
        }
        .group-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .group-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #FFF2EF;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        .group-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 2px;
        }
        .group-desc {
          font-size: 0.82rem;
          color: var(--text-subtle);
        }

        .fields-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }
        .fields-grid.four-col {
          grid-template-columns: repeat(4, 1fr);
        }
        .fields-grid.three-col {
          grid-template-columns: repeat(3, 1fr);
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .field-unit {
          font-size: 0.75rem;
          color: var(--text-subtle);
          font-weight: 500;
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .input-wrapper {
          position: relative;
        }
        .form-input, .form-select {
          width: 100%;
          padding: 12px 16px;
          background: #FFFFFF;
          border: 1.5px solid var(--border-light);
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 500;
          transition: all 0.2s ease;
          outline: none;
        }
        .form-input:focus, .form-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px var(--primary-glow);
          background: #FFFFFF;
        }
        .form-select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748B'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 16px;
          padding-right: 40px;
          appearance: none;
        }

        /* Segmented Control */
        .segmented-control {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          background: #F1F5F9;
          padding: 4px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-light);
        }
        .segmented-control.three-segment {
          grid-template-columns: 1fr 1fr 1fr;
        }
        .segment-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 8px;
          border-radius: 10px;
          border: none;
          background: transparent;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .segment-btn:hover {
          color: var(--text-main);
        }
        .segment-btn.active {
          background: #FFFFFF;
          color: var(--primary);
          box-shadow: var(--shadow-sm);
          font-weight: 700;
        }
        .seg-check {
          font-size: 0.75rem;
        }

        .field-hint {
          font-size: 0.72rem;
          color: var(--text-subtle);
        }
        .field-error-msg {
          font-size: 0.75rem;
          color: var(--danger);
          font-weight: 600;
        }
        .form-field.has-error .form-input,
        .form-field.has-error .form-select {
          border-color: var(--danger);
          background: #FFF5F5;
        }

        /* Footer of Form */
        .form-submit-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 28px;
          border-top: 1px solid #EEF2F6;
          gap: 20px;
          flex-wrap: wrap;
        }
        .security-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .info-icon {
          color: var(--secondary);
          font-size: 1rem;
        }
        .submit-btn-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .form-reset-btn {
          padding: 12px 20px;
          font-size: 0.9rem;
        }
        .form-predict-btn {
          padding: 14px 34px;
          font-size: 1rem;
          box-shadow: 0 8px 24px -4px rgba(232, 91, 63, 0.4);
        }
        .arrow-sym {
          font-size: 1.2rem;
          margin-left: 4px;
        }
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .fields-grid.four-col {
            grid-template-columns: repeat(2, 1fr);
          }
          .fields-grid.three-col {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .prediction-form-card {
            padding: 24px;
          }
          .fields-grid.four-col,
          .fields-grid.three-col {
            grid-template-columns: 1fr;
          }
          .form-submit-footer {
            flex-direction: column;
            align-items: stretch;
          }
          .submit-btn-group {
            flex-direction: column;
          }
          .form-predict-btn, .form-reset-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
