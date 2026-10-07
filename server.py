import os
import joblib
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIST = os.path.join(BASE_DIR, "frontend", "dist")

app = Flask(__name__, static_folder=FRONTEND_DIST, static_url_path="")
CORS(app)

MODEL_PATH = os.path.join(BASE_DIR, "logistic_regression_scaled.pkl")
SCALER_PATH = os.path.join(BASE_DIR, "scaler.pkl")
COLUMNS_PATH = os.path.join(BASE_DIR, "columns.pkl")

# Load existing pre-trained ML artifacts safely
try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    columns = joblib.load(COLUMNS_PATH)
    print("[OK] Successfully loaded pre-trained model, scaler, and columns.")
    print(f"Model: {type(model).__name__}")
    print(f"Features ({len(columns)}): {columns}")
except Exception as e:
    print(f"Error loading model artifacts: {e}")
    model = None
    scaler = None
    columns = []

# --- API Endpoints ---

@app.route("/health", methods=["GET"])
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "online",
        "service": "HeartAI ML Backend API",
        "model_loaded": model is not None,
        "features_count": len(columns),
        "features": columns
    })

@app.route("/predict", methods=["POST"])
@app.route("/api/predict", methods=["POST"])
def predict():
    if model is None or scaler is None or not columns:
        return jsonify({
            "status": "error",
            "message": "Model artifacts are not loaded on the server."
        }), 500

    try:
        data = request.get_json(force=True)
        if not data:
            return jsonify({"status": "error", "message": "No JSON payload provided"}), 400

        # Exact categorical mappings from notebook HeartCelaned.ipynb:
        # Sex: 'M' -> 0, 'F' -> 1
        sex_raw = str(data.get("Sex", "M")).strip()
        sex_val = 1 if sex_raw in ["F", "Female", "female", "1"] else 0

        # ExerciseAngina: 'Y' -> 1, 'N' -> 0
        angina_raw = str(data.get("ExerciseAngina", "N")).strip()
        angina_val = 1 if angina_raw in ["Y", "Yes", "yes", "1"] else 0

        # Numerical inputs
        age = float(data.get("Age", 45))
        resting_bp = float(data.get("RestingBP", 120))
        cholesterol = float(data.get("Cholesterol", 200))
        fasting_bs = int(data.get("FastingBS", 0))
        max_hr = float(data.get("MaxHR", 150))
        oldpeak = float(data.get("Oldpeak", 0.0))

        # Categorical: ChestPainType (ASY, ATA, NAP, TA)
        cpt = str(data.get("ChestPainType", "ASY")).strip().upper()
        cpt_ata = 1 if cpt == "ATA" else 0
        cpt_nap = 1 if cpt == "NAP" else 0

        # Categorical: RestingECG (Normal, ST, LVH)
        recg = str(data.get("RestingECG", "Normal")).strip()
        recg_normal = 1 if recg.lower() == "normal" else 0
        recg_st = 1 if recg.upper() == "ST" else 0

        # Categorical: ST_Slope (Up, Flat, Down)
        st_slope = str(data.get("ST_Slope", "Up")).strip().capitalize()
        st_down = 1 if st_slope == "Down" else 0
        st_flat = 1 if st_slope == "Flat" else 0
        st_up = 1 if st_slope == "Up" else 0

        # Construct feature dictionary strictly aligned with columns.pkl
        input_dict = {
            "Age": age,
            "Sex": sex_val,
            "RestingBP": resting_bp,
            "Cholesterol": cholesterol,
            "FastingBS": fasting_bs,
            "MaxHR": max_hr,
            "ExerciseAngina": angina_val,
            "Oldpeak": oldpeak,
            "ChestPainType_ATA": cpt_ata,
            "ChestPainType_NAP": cpt_nap,
            "RestingECG_Normal": recg_normal,
            "RestingECG_ST": recg_st,
            "ST_Slope_Down": st_down,
            "ST_Slope_Flat": st_flat,
            "ST_Slope_Up": st_up
        }

        # Create DataFrame matching the exact columns order
        df_input = pd.DataFrame([input_dict])[columns]

        # Scale using pre-fitted StandardScaler
        scaled_input = scaler.transform(df_input)

        # Generate ML model prediction & probabilities
        prediction_val = int(model.predict(scaled_input)[0])
        probabilities = model.predict_proba(scaled_input)[0]
        prob_low = float(probabilities[0])
        prob_high = float(probabilities[1])

        return jsonify({
            "status": "success",
            "prediction": prediction_val,
            "risk_level": "Higher Risk Detected" if prediction_val == 1 else "Lower Risk Detected",
            "risk_score_percent": round(prob_high * 100, 1),
            "confidence": round((prob_high if prediction_val == 1 else prob_low) * 100, 1),
            "probabilities": {
                "low_risk": round(prob_low, 4),
                "high_risk": round(prob_high, 4)
            },
            "parameters_received": data
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

# --- Frontend Static Serving (Render / Production) ---

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if os.path.exists(FRONTEND_DIST):
        if path != "" and os.path.exists(os.path.join(FRONTEND_DIST, path)):
            return send_from_directory(FRONTEND_DIST, path)
        return send_from_directory(FRONTEND_DIST, "index.html")
    else:
        # Fallback if frontend is not built locally yet
        return jsonify({
            "status": "online",
            "service": "HeartAI ML API",
            "info": "Frontend static bundle not found in frontend/dist. Run 'cd frontend && npm run build'."
        })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting HeartAI server on http://0.0.0.0:{port}")
    app.run(host="0.0.0.0", port=port, debug=False)
