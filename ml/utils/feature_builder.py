# FEATURE_ORDER = ["trade_amount", "volatility", "past_delays"]

# def build_features(trade):
#     return [[getattr(trade, f) for f in FEATURE_ORDER]]


FEATURE_ORDER = [
    "step",
    "type",
    "amount",
    "oldbalanceOrg",
    "newbalanceOrig",
    "oldbalanceDest",
    "newbalanceDest"
]

TYPE_MAP = {
    "PAYMENT": 0,
    "TRANSFER": 1,
    "CASH_OUT": 2,
    "DEBIT": 3,
    "CASH_IN": 4
}

def build_features(trade):
    trade_dict = trade.dict()
    trade_dict["type"] = TYPE_MAP.get(trade_dict["type"], 0)

    return [[trade_dict[f] for f in FEATURE_ORDER]]
