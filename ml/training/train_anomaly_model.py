# import pandas as pd
# from sklearn.ensemble import IsolationForest
# import pickle

# # Load CSV and take only first 10,000 rows
# data = pd.read_csv("../data/sample_track.csv").head(10000)

# # Features for anomaly detection
# X = data[["trade_amount", "volatility", "past_delays"]]

# # Train Isolation Forest for unusual behavior detection
# model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
# model.fit(X)

# # Save the model
# with open("../model/anomaly_model.pkl", "wb") as f:
#     pickle.dump(model, f)

# print("Anomaly model trained on first 10,000 rows and saved!")


import pandas as pd
import pickle
from sklearn.ensemble import IsolationForest
from utils.preprocess import preprocess_dataframe
df = pd.read_csv("data/sample_track.csv").head(10000)


X, _ = preprocess_dataframe(df)

model = IsolationForest(
    n_estimators=100,
    contamination=0.02,
    random_state=42
)

model.fit(X)

with open("model/anomaly_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Anomaly model trained on first 10,000 records")
