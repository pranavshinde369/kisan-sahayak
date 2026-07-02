# 🌾 KISAAN SIGNAL

**KISAAN SIGNAL** is a web-based agricultural intelligence prototype built for Indian farmers. Originally designed as a hackathon demo, it simulates a comprehensive voice+SMS advisory platform entirely through a browser UI—no external APIs like Twilio or Sarvam AI, no phone calls, and no cloud dependencies required. Everything runs locally in-process.

## 🚀 Features

- **Crop Advisory (Random Forest):** Recommends the top crops to grow based on the Mandal's soil (N, P, K, pH) and environmental (temperature, humidity, rainfall) features.
- **Dry-Spell Alert (XGBoost):** Predicts the 14-day dry-spell risk level utilizing current rainfall and groundwater depth data, alerting farmers to low, medium, or high risk.
- **Disease Detector (MobileNetV2):** Analyzes uploaded crop leaf photos using a local TensorFlow model trained on the PlantVillage dataset to diagnose diseases and recommend mitigation actions.
- **Multilingual Support:** All advisory and UI responses dynamically translate into **Telugu, Hindi, Kannada, and Marathi** via a simulated translation layer.
- **RSK Dashboard:** A live-updating agronomist panel designed for real-time ticket tracking, assignment, and mandal-level risk monitoring.

## 🛠️ Technology Stack

- **Frontend:** React + Vite, styled via Tailwind CSS (CDN).
- **Backend:** FastAPI + Uvicorn serving both the REST API and static React files.
- **Database:** Local SQLite managed by SQLModel (single file, no postgres needed).
- **Machine Learning:** scikit-learn (Random Forest), xgboost, and tensorflow/keras (MobileNetV2).

## 📁 Project Structure

```text
kisaan-signal/
├── backend/            # FastAPI Backend
│   ├── main.py         # Entry point (serves API & Frontend)
│   ├── database.py     # SQLModel engine setup
│   ├── routers/        # API endpoints
│   ├── ml/             # ML Model prediction wrappers
│   ├── services/       # Translation and Mandal mock data services
│   └── static/         # Destination for the compiled React App
├── frontend/           # React + Vite Frontend
│   └── src/            # Source code & components
├── notebooks/          # Jupyter notebooks for model training
├── models/             # Directory where trained ML models are saved
└── data/               # Static dataset mock files
```

## ⚙️ Build and Run Sequence

Running Kisaan Signal requires setting up the Python environment, training the models, and starting the FastAPI server.

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Train the Machine Learning Models
You must run the notebooks locally to generate the `.pkl` and `.h5` model files. (This process takes a few minutes for RF/XGBoost, and longer for MobileNetV2).

```bash
jupyter nbconvert --to notebook --execute notebooks/01_crop_model.ipynb
jupyter nbconvert --to notebook --execute notebooks/02_dryspell_model.ipynb
jupyter nbconvert --to notebook --execute notebooks/03_disease_model.ipynb
```
*(Note: For the disease model, a mock training pipeline executes to allow successful demonstration without downloading the large PlantVillage dataset).*

### 3. Build the Frontend (Optional)
The frontend is already built and placed into `backend/static/`. If you modify the React components in `frontend/src`, you will need to rebuild:
```bash
cd frontend
npm install
npm run build
cd ..
```

### 4. Run the Server
The entire app (API + UI) runs under a single FastAPI process.
```bash
uvicorn backend.main:app --reload --port 8000
```

### 5. Access the Platform
Open your browser and navigate to:
**[http://localhost:8000](http://localhost:8000)**

---

## 🎭 Demo Script

To effectively demonstrate Kisaan Signal to judges or stakeholders, follow this flow:

1. **Open the browser** to `http://localhost:8000`.
2. **Crop Advisory Simulation:** On the left panel (Farmer Simulator), select the mandal "Warangal Urban" and choose the "Hindi" language tab. Click "Get Recommendation" and view the Random Forest probability output (e.g., "कपास (87%)").
3. **Dry-Spell Prediction:** Click "Check Forecast" to view the live XGBoost prediction regarding upcoming water risks (e.g., "⚠️ HIGH — 73.2%").
4. **Disease Detection:** Drag and drop any crop leaf photo into the "Report Disease" dropzone, and click "Analyse Crop". You'll see the TensorFlow MobileNetV2 prediction along with a successful ticker confirmation ("✅ Ticket #1 created").
5. **RSK Dashboard:** On the right panel, observe the newly generated ticket dynamically appear in the feed.
6. **Ticket Action:** Click "Assign" on the new ticket, type in an Agronomist's name, and watch the status turn amber. Notice how the Dry-Spell risk table reflects updated telemetry across the state.
