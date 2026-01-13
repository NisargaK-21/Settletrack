# import pandas as pd
# from sklearn.ensemble import RandomForestClassifier
# import pickle

# # Load CSV and take only first 10,000 rows
# data = pd.read_csv("../data/sample_track.csv").head(10000)

# # Features & labels
# X = data[["trade_amount", "volatility", "past_delays"]]
# y = data["settlement_failed"]  # Make sure your CSV has this column

# # Train supervised ML model
# model = RandomForestClassifier(n_estimators=100, random_state=42)
# model.fit(X, y)

# # Save the model
# with open("../model/risk_model.pkl", "wb") as f:
#     pickle.dump(model, f)

# print("Risk model trained on first 10,000 rows and saved!")

import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from utils.preprocess import preprocess_dataframe

# Load only first 10,000 rows
df = pd.read_csv("data/sample_track.csv").head(10000)


X, y = preprocess_dataframe(df)

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    class_weight="balanced"
)

model.fit(X, y)

with open("model/risk_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Risk model trained on first 10,000 records")
