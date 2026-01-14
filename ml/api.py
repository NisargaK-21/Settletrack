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


from fastapi import FastAPI
from pydantic import BaseModel
import pickle

from utils.feature_builder import build_features
from utils.decision_engine import decide_action

app = FastAPI()

with open("model/risk_model.pkl", "rb") as f:
    risk_model = pickle.load(f)

with open("model/anomaly_model.pkl", "rb") as f:
    anomaly_model = pickle.load(f)

class Transaction(BaseModel):
    step: int
    type: str
    amount: float
    oldbalanceOrg: float
    newbalanceOrig: float
    oldbalanceDest: float
    newbalanceDest: float

def detect_anomaly(X):
    return anomaly_model.predict(X)[0] == -1

@app.post("/api/predict")
def predict(transaction: Transaction):
    X = build_features(transaction)

    fraud_prob = float(risk_model.predict_proba(X)[0][1])
    anomaly = bool(detect_anomaly(X))


    action = decide_action(fraud_prob, anomaly)

    return {
        "fraud_probability": round(fraud_prob, 3),
        "unusual_behavior": anomaly,
        "recommended_action": action
    }
