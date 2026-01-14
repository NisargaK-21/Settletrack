# SettleTrack – ML Risk & Anomaly Detection Service

SettleTrack is a machine learning service that analyzes transaction and settlement data to:
- Predict fraud / settlement risk probability
- Detect unusual (anomalous) transaction behavior
- Recommend an action: **ALLOW / REVIEW_TRANSACTION / BLOCK_TRANSACTION**

The ML service is exposed via a REST API and integrates directly with backend and frontend systems.

---

## Project Structure

```
ml/
│
├── api.py                      # FastAPI backend serving ML predictions
│
├── data/
│   └── sample_track.csv        # Dataset (not included – see Dataset section)
│
├── model/                      # Generated after training
│   ├── risk_model.pkl
│   └── anomaly_model.pkl
│
├── training/
│   ├── train_risk_model.py     # Trains supervised risk model
│   └── train_anomaly_model.py  # Trains anomaly detection model
│
├── utils/
│   ├── preprocess.py           # Dataset preprocessing
│   ├── feature_builder.py      # API → ML feature conversion
│   └── decision_engine.py      # Business decision logic
│
├── requirements.txt
└── README.md
```

---

## Machine Learning Overview

### Risk Prediction
- Model: Random Forest Classifier  
- Type: Supervised Learning  
- Output: Fraud probability (0–1)

### Anomaly Detection
- Model: Isolation Forest  
- Type: Unsupervised Learning  
- Output: Unusual transaction flag

### Decision Logic
Model outputs are combined with rule-based logic to recommend:
- `ALLOW`
- `REVIEW_TRANSACTION`
- `BLOCK_TRANSACTION`

---

## Dataset

The dataset used in this project was obtained from **Kaggle**.

Due to Kaggle licensing restrictions, the dataset file  
`sample_track.csv` is **not included** in this repository.

### To prepare the dataset:
1. Download the dataset from Kaggle  
2. Rename it to `sample_track.csv`  
3. Place it inside:
   ```
   ml/data/
   ```

Only the **first 10,000 records** are used for training.

---

## Installation

### Prerequisites
- Python **3.10 or 3.11**
- pip

### Install dependencies
From the `ml/` directory:

```bash
pip install -r requirements.txt
```

---

## How to Run the Project (Step-by-Step)

### Step 1: Train the ML Models

From the `ml/` directory, run:

```bash
python -m training.train_risk_model
python -m training.train_anomaly_model
```

This will automatically generate the trained model files:

```
ml/model/risk_model.pkl
ml/model/anomaly_model.pkl
```

> Model files are generated automatically during training and **must not be created manually**.

---

### Step 2: Start the ML API Server

From the same `ml/` directory:

```bash
uvicorn api:app --reload
```

The API will start at:

```
http://127.0.0.1:8000
```

---

### Step 3: Test the API (Without Frontend)

#### Using curl
```bash
curl -X POST "http://127.0.0.1:8000/api/predict" \
-H "Content-Type: application/json" \
-d "{\"step\":150,\"type\":\"CASH_OUT\",\"amount\":900000,\"oldbalanceOrg\":920000,\"newbalanceOrig\":20000,\"oldbalanceDest\":0,\"newbalanceDest\":900000}"
```

#### Using Python
```python
import requests

url = "http://127.0.0.1:8000/api/predict"

payload = {
    "step": 150,
    "type": "TRANSFER",
    "amount": 900000,
    "oldbalanceOrg": 920000,
    "newbalanceOrig": 20000,
    "oldbalanceDest": 0,
    "newbalanceDest": 900000
}

print(requests.post(url, json=payload).json())
```

If a JSON response is returned, the ML system is working correctly.

---

## API Endpoint

### POST `/api/predict`

#### Request Body
```json
{
  "step": 150,
  "type": "TRANSFER",
  "amount": 900000,
  "oldbalanceOrg": 920000,
  "newbalanceOrig": 20000,
  "oldbalanceDest": 0,
  "newbalanceDest": 900000
}
```

#### Response
```json
{
  "fraud_probability": 0.13,
  "unusual_behavior": true,
  "recommended_action": "REVIEW_TRANSACTION"
}
```

---

## Notes

- Swagger UI is available at `/docs` for development and testing.
- `.pkl` files are binary ML artifacts and should not be opened manually.
- Frontend integration uses the same API endpoint and JSON schema.

---

## Summary

- Supervised and unsupervised ML models  
- Backend → ML → Frontend data flow  
- REST API for real-time predictions  
- License-aware dataset handling  
- Production-style project structure  

---

### One-line Project Description

SettleTrack is a machine learning service that predicts transaction risk and detects anomalous behavior using real-time backend data.
