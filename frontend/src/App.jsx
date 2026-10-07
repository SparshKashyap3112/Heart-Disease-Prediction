import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ActionBar from "./components/ActionBar";
import PredictionForm from "./components/PredictionForm";
import PredictionResult from "./components/PredictionResult";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Disclaimer from "./components/Disclaimer";
import Footer from "./components/Footer";
import FloatingAssistant from "./components/FloatingAssistant";

import { 
  DEFAULT_FORM_VALUES, 
  PRESET_PROFILES, 
  validateForm 
} from "./utils/validation";
import { predictHeartDisease } from "./services/predictionService";

export default function App() {
  const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    // Clear specific field error on edit
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleLoadPreset = (presetValues) => {
    setFormData(presetValues);
    setErrors({});
    setApiError(null);
    setPredictionResult(null);

    const formEl = document.getElementById("prediction");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPresetById = (presetId) => {
    const found = PRESET_PROFILES.find((p) => p.id === presetId);
    if (found) {
      handleLoadPreset(found.values);
    }
  };

  const handleResetForm = () => {
    setFormData(DEFAULT_FORM_VALUES);
    setErrors({});
    setPredictionResult(null);
    setApiError(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setApiError(null);

    // Validate form inputs
    const { isValid, errors: validationErrors } = validateForm(formData);
    if (!isValid) {
      setErrors(validationErrors);
      // Scroll to prediction section
      const formEl = document.getElementById("prediction");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setLoading(true);
    setPredictionResult(null);

    try {
      const response = await predictHeartDisease(formData);
      setPredictionResult(response);
      setLoading(false);

      // Scroll smoothly to results
      setTimeout(() => {
        const resEl = document.getElementById("result-section");
        if (resEl) {
          resEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (err) {
      setLoading(false);
      setApiError(err.message || "Failed to communicate with prediction service.");
      console.error("Prediction error:", err);
    }
  };

  return (
    <div className="heart-ai-app">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero onStartClick={() => {
        const el = document.getElementById("prediction");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }} />

      {/* Action Bar */}
      <ActionBar 
        onSelectPreset={handleSelectPresetById}
        onStartAssessment={() => {
          const el = document.getElementById("prediction");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Core Health Prediction Form */}
      <PredictionForm 
        formData={formData}
        onChange={handleFieldChange}
        onSubmit={handleSubmit}
        onReset={handleResetForm}
        onLoadPreset={handleLoadPreset}
        errors={errors}
        loading={loading}
        apiError={apiError}
      />

      {/* Prediction Result Report Card */}
      {predictionResult && (
        <PredictionResult 
          result={predictionResult}
          formData={formData}
          onReset={handleResetForm}
        />
      )}

      {/* How It Works Section */}
      <HowItWorks />

      {/* Why HeartAI / Features */}
      <Features />

      {/* Clinical Governance Disclaimer */}
      <Disclaimer />

      {/* Hospital Footer */}
      <Footer />

      {/* Floating AI Assistant & Cookie Notice */}
      <FloatingAssistant />
    </div>
  );
}
