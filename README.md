# HeartAI — AI-Powered Heart Disease Risk Prediction

A **light healthcare glassmorphism** web application frontend built with **React.js, JavaScript, and CSS**, integrated with a pre-trained **Logistic Regression** Machine Learning model pipeline.

---

## 🌟 Key Features

1. **Light Healthcare Glassmorphism Aesthetics**:
   - Palette: Clean White (`#FFFFFF`), Off-White (`#FAFBFC`), Coral/Orange (`#E85B3F`), Dark Navy (`#0F172A`), and Medical Teal/Green.
   - Subtle frosted-glass cards with blur filters (`backdrop-filter: blur(16px)`), delicate borders, soft shadows, and clean modern typography (*Outfit* & *Plus Jakarta Sans*).
   - Animated ECG rhythm waveforms and heart rate pulse indicators.

2. **Hospital-Style Navbar & Action Bar**:
   - Top emergency hotline indicator (`Emergency: 112`), clinical disclaimer tag, language selector.
   - Sticky navigation bar with smooth scrolling and responsive mobile drawer.
   - Overlapping Action Bar with instant sample profile loader (*Low-Risk Sample* and *Elevated Risk Sample*).

3. **Multi-Column Clinical Assessment Form**:
   - **Personal Information**: Age, Biological Sex (Segmented Control: Male `M` / Female `F`).
   - **Cardiovascular Measurements**: Resting Blood Pressure (mm Hg), Serum Cholesterol (mg/dL), Maximum Heart Rate (bpm), ST Depression / Oldpeak (mm).
   - **Clinical & Diagnostic Indicators**: Chest Pain Type (`ASY`, `ATA`, `NAP`, `TA`), Fasting Blood Sugar (`<= 120` vs `> 120 mg/dL`), Resting ECG (`Normal`, `ST`, `LVH`), Exercise Induced Angina (`No` vs `Yes`), ST Slope (`Upsloping`, `Flat`, `Downsloping`).
   - Comprehensive input validation and unit badges.

4. **Medical Report Card & Dynamic Result Visualization**:
   - Circular Risk Gauge dial indicating probability percentages.
   - Dual-state visualization: **Low Risk Profile Detected** (Emerald Green) vs. **Higher Risk Detected** (Coral Red).
   - Probability distribution breakdown (Low Risk % vs. High Risk %).
   - Evaluated clinical parameters summary table.
   - Printable report support (`window.print()`).
   - Clear medical advisory disclaimer.

5. **Interactive Floating Assistant & Cookie Notice**:
   - Bottom-right floating assistant with clinical FAQ and metric range benchmarks.
   - Bottom cookie/privacy notice bar.

---

## 📁 Project Structure

```text
4_Heart Disease Project/
├── columns.pkl                      # 15 feature column names (Untouched pre-trained artifact)
├── scaler.pkl                       # StandardScaler object (Untouched pre-trained artifact)
├── logistic_regression_scaled.pkl   # Trained LogisticRegression model (Untouched pre-trained artifact)
├── heart.csv                        # Dataset (918 records)
├── HeartCelaned.ipynb               # Original exploratory & training notebook
├── server.py                        # Python Flask API endpoint (/predict, /model-info)
│
└── frontend/                        # React.js Application
    ├── index.html                   # HTML template with Google Fonts & metadata
    ├── package.json                 # Frontend dependencies (React, react-icons, Vite)
    ├── vite.config.js               # Vite bundler configuration
    ├── .env                         # Configurable VITE_API_URL (http://localhost:5000)
    │
    └── src/
        ├── App.jsx                  # Main application orchestrator
        ├── main.jsx                 # React entry point
        ├── index.css                # Healthcare Glassmorphism design tokens & styles
        │
        ├── components/
        │   ├── Navbar.jsx           # Top hospital bar + sticky brand navigation
        │   ├── Hero.jsx             # Hero section with ECG pulse monitor & floating glass badges
        │   ├── ActionBar.jsx        # Overlapping action bar with quick preset loader
        │   ├── PredictionForm.jsx   # Multi-column clinical input form with segmented toggles
        │   ├── PredictionResult.jsx # Circular gauge report card with probability bars
        │   ├── HowItWorks.jsx       # 4-step workflow cards
        │   ├── Features.jsx         # Platform strengths & capabilities
        │   ├── Disclaimer.jsx       # Clinical governance advisory banner
        │   ├── Footer.jsx           # Hospital-grade dark navy footer
        │   └── FloatingAssistant.jsx# Floating interactive assistant drawer & cookie banner
        │
        ├── services/
        │   └── predictionService.js # API service communicating via VITE_API_URL
        │
        └── utils/
            └── validation.js        # Input validation bounds & sample presets
```

---

## 🚀 How to Run

### 1. Start the Python ML API Backend
In the project root directory:
```bash
python server.py
```
> The API server will start on `http://localhost:5000` and load your pre-trained `logistic_regression_scaled.pkl`, `scaler.pkl`, and `columns.pkl`.

### 2. Start the React Frontend (Development)
In a new terminal, navigate into the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
> The web application will launch on `http://localhost:5173`.

---

## ☁️ Deploying to Render (Cloud Production)

This project is **100% Render-ready** as a unified fullstack web service.

### Option A: 1-Click Render Blueprint (Recommended)
1. Push this repository to your GitHub account: `https://github.com/SparshKashyap3112/Heart-Disease-Prediction.git`
2. Log into [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** → **Blueprint**.
4. Connect your `Heart-Disease-Prediction` repository.
5. Render will detect `render.yaml` and automatically configure the build and start commands.
6. Click **Apply** to deploy!

### Option B: Manual Web Service on Render
1. In Render Dashboard, click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure the following settings:
   - **Name**: `heart-disease-prediction`
   - **Language / Runtime**: `Python 3`
   - **Branch**: `main`
   - **Build Command**: `./render_build.sh` (or `pip install -r requirements.txt && cd frontend && npm install && npm run build && cd ..`)
   - **Start Command**: `gunicorn server:app`
   - **Instance Type**: `Free`
4. Click **Deploy Web Service**.
5. Once built, your live hospital web application will be accessible at `https://<your-app-name>.onrender.com`.
