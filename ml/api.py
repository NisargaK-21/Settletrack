# from fastapi import FastAPI
# from pydantic import BaseModel
# import pickle
# import numpy as np

# # Updated imports based on your folder structure
# from utils.feature_builder import build_features
# from utils.decision_engine import decide_action

# app = FastAPI()

# # Load trained ML models from 'model' folder
# with open("model/risk_model.pkl", "rb") as f:
#     risk_model = pickle.load(f)

# with open("model/anomaly_model.pkl", "rb") as f:
#     anomaly_model = pickle.load(f)

# # Input schema for trade data
# class TradeInput(BaseModel):
#     trade_id: str
#     trade_amount: float
#     volatility: float
#     past_delays: int

# # Anomaly detection helper
# def detect_anomaly(X):
#     # IsolationForest: -1 = anomaly
#     return anomaly_model.predict(X)[0] == -1

# # Main endpoint
# @app.post("/api/predict")
# def predict_trade(trade: TradeInput):
#     # Step 1: Feature vector
#     X = build_features(trade)

#     # Step 2: Risk/failure prediction
#     delay = int(risk_model.predict(X)[0])
#     risk_score = float(risk_model.predict_proba(X)[0][1])

#     # Step 3: Anomaly detection
#     is_anomaly = detect_anomaly(X)

#     # Step 4: Decision logic
#     action = decide_action(risk_score, is_anomaly)

#     # Return JSON response
#     return {
#         "trade_id": trade.trade_id,
#         "delay": delay,
#         "risk_score": round(risk_score, 3),
#         "unusual_activity": is_anomaly,
#         "recommended_action": action
#     }


# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import pickle

# from utils.feature_builder import build_features
# from utils.decision_engine import decide_action

# app = FastAPI()

# # Add CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# with open("model/risk_model.pkl", "rb") as f:
#     risk_model = pickle.load(f)

# with open("model/anomaly_model.pkl", "rb") as f:
#     anomaly_model = pickle.load(f)

# class TradeData(BaseModel):
#     tradeId: int
#     buyer: str
#     seller: str
#     quantity: int
#     price: float

# def detect_anomaly(X):
#     return anomaly_model.predict(X)[0] == -1

# @app.post("/api/predict")
# def predict(trade: TradeData):
#     # Convert trade data to expected format for the model
#     # Map trade data to the 7 features the model expects
#     transaction_data = {
#         'step': trade.tradeId % 744,  # Simulate step (0-743)
#         'type': 1,  # Simulate transaction type
#         'amount': trade.price * trade.quantity,  # Total transaction amount
#         'oldbalanceOrg': trade.price * 10,  # Simulate old balance
#         'newbalanceOrig': trade.price * 9,  # Simulate new balance
#         'oldbalanceDest': trade.quantity * 100,  # Simulate destination balance
#         'newbalanceDest': trade.quantity * 101,  # Simulate new destination balance
#     }
    
#     # Create a list for feature building in correct order
#     X = [[
#         transaction_data['step'],
#         transaction_data['type'],
#         transaction_data['amount'],
#         transaction_data['oldbalanceOrg'],
#         transaction_data['newbalanceOrig'],
#         transaction_data['oldbalanceDest'],
#         transaction_data['newbalanceDest'],
#     ]]

#     fraud_prob = float(risk_model.predict_proba(X)[0][1])
#     anomaly = bool(detect_anomaly(X))


#     action = decide_action(fraud_prob, anomaly)

#     return {
#         "fraud_probability": round(fraud_prob, 3),
#         "unusual_behavior": anomaly,
#         "recommended_action": action
#     }


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle

from utils.decision_engine import decide_action

app = FastAPI()

# CORS (allow frontend access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML models
with open("model/risk_model.pkl", "rb") as f:
    risk_model = pickle.load(f)

with open("model/anomaly_model.pkl", "rb") as f:
    anomaly_model = pickle.load(f)

# Input schema
class TradeData(BaseModel):
    tradeId: int
    buyer: str
    seller: str
    quantity: int
    price: float


def detect_anomaly(X):
    """
    Isolation Forest:
      -1 -> anomaly
       1 -> normal
    """
    return anomaly_model.predict(X)[0] == -1


@app.post("/api/predict")
def predict(trade: TradeData):
    """
    ML Prediction Flow:
    1. Build transaction-style features
    2. Predict raw fraud probability
    3. Detect anomaly
    4. Decision engine decides action + UI-compatible probability
    5. Return response to frontend (NO frontend logic changes needed)
    """

    # --- Feature construction (simulated balances for demo) ---
    transaction_data = {
        "step": trade.tradeId % 744,
        "type": 1,  # TRANSFER
        "amount": trade.price * trade.quantity,
        "oldbalanceOrg": trade.price * 10,
        "newbalanceOrig": trade.price * 9,
        "oldbalanceDest": trade.quantity * 100,
        "newbalanceDest": trade.quantity * 101,
    }

    X = [[
        transaction_data["step"],
        transaction_data["type"],
        transaction_data["amount"],
        transaction_data["oldbalanceOrg"],
        transaction_data["newbalanceOrig"],
        transaction_data["oldbalanceDest"],
        transaction_data["newbalanceDest"],
    ]]

    # --- ML predictions ---
    fraud_prob_raw = float(risk_model.predict_proba(X)[0][1])
    anomaly = bool(detect_anomaly(X))


    # --- Decision engine ---
    action, ui_prob = decide_action(fraud_prob_raw, anomaly)

    # --- API response ---
    return {
        "fraud_probability": ui_prob,     # 👈 encoded for frontend thresholds
        "unusual_behavior": anomaly,
        "recommended_action": action
    }
