# SettleTrack – ML Risk & Anomaly Detection Service

SettleTrack is a machine learning service that analyzes transaction and settlement data to:
- Predict fraud / settlement risk probability
- Detect unusual (anomalous) transaction behavior
- Recommend an action: **ALLOW / REVIEW_TRANSACTION / BLOCK_TRANSACTION**

The ML service is exposed via a REST API and integrates directly with backend and frontend systems.

---

## 🚀 Current Implementation Status

### ✅ Fully Implemented Components

1. **ML Models (Trained & Deployed)**
   - Risk prediction model using Random Forest Classifier
   - Anomaly detection model using Isolation Forest
   - Both models trained on 10,000 transaction records
   - Serialized models stored as `.pkl` files in `model/` directory

2. **REST API (FastAPI)**
   - Single prediction endpoint: `POST /api/predict`
   - Accepts transaction data with 7 features
   - Returns fraud probability, anomaly flag, and recommended action
   - Swagger UI available at `/docs`

3. **Feature Engineering Pipeline**
   - Transaction type encoding (PAYMENT, TRANSFER, CASH_OUT, DEBIT, CASH_IN)
   - Balance differential calculations
   - Feature vector construction from API input

4. **Decision Engine**
   - Rule-based logic combining ML outputs
   - Three-tier action system: ALLOW / REVIEW / BLOCK
   - Threshold-based decision making

5. **Training Scripts**
   - Automated model training from CSV dataset
   - Preprocessing and feature extraction
   - Model persistence using pickle

### 📊 Dataset
- Source: Kaggle financial fraud dataset
- Size: 10,000 records (first 10K rows used)
- Features: step, type, amount, oldbalanceOrg, newbalanceOrig, oldbalanceDest, newbalanceDest
- Target: isFraud (binary classification)

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

## 🧠 Machine Learning Implementation Details

### 1. Risk Prediction Model
- **Algorithm**: Random Forest Classifier (scikit-learn)
- **Type**: Supervised Learning
- **Configuration**:
  - n_estimators: 100 trees
  - class_weight: balanced (handles class imbalance)
  - random_state: 42 (reproducibility)
- **Input Features**: 7 numerical features
- **Output**: Fraud probability (0.0 to 1.0)
- **Training**: Fitted on labeled fraud data (isFraud column)

### 2. Anomaly Detection Model
- **Algorithm**: Isolation Forest (scikit-learn)
- **Type**: Unsupervised Learning
- **Configuration**:
  - n_estimators: 100 trees
  - contamination: 0.02 (2% expected anomalies)
  - random_state: 42
- **Input Features**: Same 7 features as risk model
- **Output**: Binary flag (-1 for anomaly, 1 for normal)
- **Purpose**: Detects unusual patterns not captured by supervised model

### 3. Feature Engineering
**Raw Input Features** (from API):
- `step`: Time step in simulation
- `type`: Transaction type (PAYMENT/TRANSFER/CASH_OUT/DEBIT/CASH_IN)
- `amount`: Transaction amount
- `oldbalanceOrg`: Origin account balance before transaction
- `newbalanceOrig`: Origin account balance after transaction
- `oldbalanceDest`: Destination account balance before transaction
- `newbalanceDest`: Destination account balance after transaction

**Preprocessing**:
- Transaction type encoded to integers (0-4) via TYPE_MAP
- Missing values filled with 0
- Features maintained in strict order for model compatibility

### 4. Decision Engine Logic
**Current Thresholds**:
```
BLOCK_TRANSACTION:
  - Anomaly detected AND fraud_probability >= 0.10

REVIEW_TRANSACTION:
  - Anomaly detected OR fraud_probability >= 0.14

ALLOW:
  - All other cases (low risk, normal behavior)
```

**Implementation**: Rule-based system in `utils/decision_engine.py`
- Combines both ML model outputs
- Prioritizes blocking when both signals are present
- Conservative approach to minimize false negatives

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

## 🔧 How to Run the Project (Step-by-Step)

### Step 1: Train the ML Models

From the `ml/` directory, run:

```bash
python -m training.train_risk_model
python -m training.train_anomaly_model
```

**Expected output:**
```
✅ Risk model trained on first 10,000 records
✅ Anomaly model trained on first 10,000 records
```

> Model files are generated automatically during training and **must not be created manually** only model folder should be created.

---

### Step 2: Start the ML API Server

From the same `ml/` directory:

```bash
uvicorn api:app --reload
```

**What happens during startup:**
1. FastAPI application initializes
2. Loads `risk_model.pkl` and `anomaly_model.pkl` into memory
3. Registers `/api/predict` endpoint
4. Starts server on default port 8000

The API will start at:

```
http://127.0.0.1:8000
```


**Response Fields:**
- `fraud_probability` (float): ML model's fraud confidence (0.0 - 1.0)
- `unusual_behavior` (bool): Anomaly detection flag
- `recommended_action` (str): ALLOW | REVIEW_TRANSACTION | BLOCK_TRANSACTION

**Processing Flow:**
1. API receives transaction JSON
2. `feature_builder.py` converts to feature vector
3. Risk model predicts fraud probability
4. Anomaly model detects unusual patterns
5. `decision_engine.py` combines outputs
6. Returns JSON response with recommendation

---

## 📁 Code Organization

**api.py** (95 lines)
- FastAPI application setup
- Model loading at startup
- Transaction input schema (Pydantic)
- Prediction endpoint implementation
- Anomaly detection helper function

**training/train_risk_model.py** (42 lines)
- Loads CSV dataset (first 10K rows)
- Calls preprocessing pipeline
- Trains Random Forest classifier
- Saves model to disk

**training/train_anomaly_model.py** (38 lines)
- Loads same dataset
- Trains Isolation Forest (unsupervised)
- Saves anomaly model

**utils/preprocess.py** (32 lines)
- TYPE_MAP for encoding transaction types
- Feature column definitions
- DataFrame preprocessing function
- Returns X (features) and y (labels)

**utils/feature_builder.py** (28 lines)
- Converts API input to ML feature vector
- Maintains feature order consistency
- Applies same type encoding as training

**utils/decision_engine.py** (220 lines, mostly commented iterations)
- Active implementation: 10 lines
- Threshold-based decision logic
- Combines fraud probability + anomaly flag
- Returns action recommendation

---

## 🔗 Backend-ML Integration (How It Works)

### Integration Architecture

The ML service is integrated with the Node.js backend through HTTP REST API calls. Here's the complete flow:

### Step-by-Step Integration Flow

**1. User Submits Trade (Frontend → Backend)**
```javascript
// User submits trade from frontend
POST /api/settlement/trade
{
  "tradeId": 12345,
  "price": 900000,
  "buyer": "0xABC...",
  "seller": "0xDEF..."
}
```

**2. Backend Calls ML Service**

Location: `backend/src/services/ml.service.js`


**3. ML Service Processes Request**

Location: `ml/api.py`
```
    return {
        "fraud_probability": round(fraud_prob, 3),
        "unusual_behavior": anomaly,
        "recommended_action": action
    }
```

**4. Backend Receives ML Response**

Location: `backend/src/routes/settlement.routes.js`



**5. Response Flow Back to User**
```
ML Service → Backend → Frontend → User
```

---

### Configuration

**Backend Environment Variables** (`backend/.env`):
```bash
ML_SERVICE_URL=http://localhost:8000/api/predict
```

**ML Service Must Be Running:**
```bash
# Terminal 1: Start ML service
cd ml/
uvicorn api:app --reload

# Terminal 2: Start backend
cd backend/
npm start
```

---


**Note:** The backend currently uses simplified balance calculations. In production, these would be fetched from actual account balances.


---

### Complete Data Flow Diagram

```
┌─────────────┐
│   Frontend  │
│   (React)   │
└──────┬──────┘
       │ POST /api/settlement/trade
       │ { tradeId, price, buyer, seller }
       ▼
┌─────────────────────────────────────┐
│   Backend (Node.js + Express)       │
│                                     │
│  1. Receive trade data              │
│  2. Call checkRisk(trade)           │
│     ├─► ml.service.js               │
│     └─► axios.post(ML_SERVICE_URL)  │
└──────┬──────────────────────────────┘
       │ HTTP POST
       │ { step, type, amount, ... }
       ▼
┌─────────────────────────────────────┐
│   ML Service (Python + FastAPI)     │
│                                     │
│  1. Validate input (Pydantic)       │
│  2. build_features()                │
│  3. risk_model.predict_proba()      │
│  4. anomaly_model.predict()         │
│  5. decide_action()                 │
└──────┬──────────────────────────────┘
       │ JSON Response
       │ { fraud_probability, unusual_behavior, recommended_action }
       ▼
┌─────────────────────────────────────┐
│   Backend                           │
│                                     │
│  1. Receive ML response             │
│  2. Log risk result                 │
│  3. (Optional) Block if HIGH risk   │
│  4. Record trade on blockchain      │
│  5. Return txHash to frontend       │
└──────┬──────────────────────────────┘
       │ { txHash }
       ▼
┌─────────────┐
│   Frontend  │
│   Display   │
└─────────────┘
```

---

### Integration Status

✅ **Currently Implemented:**
- HTTP communication between backend and ML service
- Axios-based REST API calls
- Error handling for ML service failures
- Data transformation (backend format → ML format)
- Real-time prediction during trade submission


🔧 **Production Enhancements (Future):**
- Enforce ML recommendations (block HIGH risk trades)
- Fetch real account balances from blockchain
- Add caching for repeated predictions
- Implement circuit breaker pattern
- Add ML service health checks

---

## 🔗 Other Integration Points

**Frontend Integration:**

Frontend does not directly interact with ML service in production.

Frontend receives from backend:
- Trade ID
- Fraud probability score
- Unusual behavior flag
- Recommended action (ALLOW / REVIEW / BLOCK)
- Transaction hash

Frontend displays:
- Risk indicator with color coding:
  - 🟢 Green for ALLOW (low risk)
  - 🟡 Yellow for REVIEW_TRANSACTION (suspicious)
  - 🔴 Red for BLOCK_TRANSACTION (high risk)
- Fraud probability percentage
- Warning dialogs for risky transactions
- Transaction history with risk scores

Suggested UI Components:
- Risk assessment card/badge
- Confirmation dialog for high-risk trades
- Dashboard analytics (allowed/reviewed/blocked stats)
- Transaction table with risk column

---

## 📊 Summary

**Current Status:** Fully functional ML service with trained models and deployed API

**Key Features:**
- Dual-model approach (supervised + unsupervised)
- Real-time prediction API
- Rule-based decision engine
- Production-ready code structure
- Comprehensive preprocessing pipeline

**Architecture:**
- Backend → ML → Frontend data flow
- REST API for real-time predictions
- Modular utility functions
- Serialized model persistence

---
