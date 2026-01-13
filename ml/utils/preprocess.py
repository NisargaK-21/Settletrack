import pandas as pd

TYPE_MAP = {
    "PAYMENT": 0,
    "TRANSFER": 1,
    "CASH_OUT": 2,
    "DEBIT": 3,
    "CASH_IN": 4
}

FEATURE_COLUMNS = [
    "step",
    "type",
    "amount",
    "oldbalanceOrg",
    "newbalanceOrig",
    "oldbalanceDest",
    "newbalanceDest"
]

def preprocess_dataframe(df: pd.DataFrame):
    df = df.copy()

    # Convert transaction type to numeric
    df["type"] = df["type"].map(TYPE_MAP)

    # Fill missing values just in case
    df.fillna(0, inplace=True)

    X = df[FEATURE_COLUMNS]
    y = df["isFraud"]

    return X, y
