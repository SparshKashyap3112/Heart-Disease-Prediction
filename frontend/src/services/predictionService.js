/**
 * Prediction Service
 * Communicates with the Python Machine Learning API backend.
 * Uses configurable environment variable VITE_API_URL.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL !== undefined 
  ? import.meta.env.VITE_API_URL 
  : (import.meta.env.DEV ? "http://localhost:5000" : "");

/**
 * Send patient health parameters to the ML model backend
 * @param {Object} data Patient parameters
 * @returns {Promise<Object>} Model inference response
 */
export async function predictHeartDisease(data) {
  const url = `${API_BASE_URL}/predict`;

  try {
    const payload = {
      Age: Number(data.Age),
      Sex: data.Sex,
      ChestPainType: data.ChestPainType,
      RestingBP: Number(data.RestingBP),
      Cholesterol: Number(data.Cholesterol),
      FastingBS: Number(data.FastingBS),
      RestingECG: data.RestingECG,
      MaxHR: Number(data.MaxHR),
      ExerciseAngina: data.ExerciseAngina,
      Oldpeak: Number(data.Oldpeak),
      ST_Slope: data.ST_Slope
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errorMessage = `Server responded with status ${response.status}`;
      try {
        const errData = await response.json();
        if (errData && errData.message) {
          errorMessage = errData.message;
        }
      } catch {
        // use default error message
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Prediction API Error:", error);
    
    // Check if network connection error (e.g. backend not started yet)
    if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
      throw new Error(
        `Unable to reach the ML backend at ${API_BASE_URL}. Please ensure the Python server is running (e.g., 'python server.py').`
      );
    }
    
    throw error;
  }
}

/**
 * Fetch verified ML model parameters and metrics
 */
export async function getModelMetadata() {
  const url = `${API_BASE_URL}/model-info`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("Could not fetch remote model metadata, using local verified dataset specs", err);
  }

  // Verified ground truth metrics directly from notebook 'HeartCelaned.ipynb'
  return {
    model_type: "Logistic Regression (Scaled)",
    framework: "scikit-learn (LogisticRegression)",
    scaler: "StandardScaler",
    features_count: 15,
    features: [
      "Age", "Sex", "RestingBP", "Cholesterol", "FastingBS",
      "MaxHR", "ExerciseAngina", "Oldpeak", "ChestPainType_ATA",
      "ChestPainType_NAP", "RestingECG_Normal", "RestingECG_ST",
      "ST_Slope_Down", "ST_Slope_Flat", "ST_Slope_Up"
    ],
    metrics: {
      accuracy: 0.8641,
      precision: 0.87,
      recall: 0.86,
      f1_score: 0.86,
      high_risk_f1: 0.88,
      test_samples: 184,
      train_samples: 734,
      total_samples: 918,
      confusion_matrix: [[66, 11], [14, 93]]
    }
  };
}

export { API_BASE_URL };
