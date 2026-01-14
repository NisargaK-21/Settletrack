# def decide_action(risk_score, is_anomaly):
#     if is_anomaly and risk_score > 0.7:
#         return "BLOCK_TRADE"
#     elif risk_score > 0.7:
#         return "REVIEW_TRADE"
#     elif is_anomaly:
#         return "MONITOR"
#     return "ALLOW"
def decide_action(risk_score, is_anomaly):
    if is_anomaly and risk_score > 0.1:
        return "BLOCK_TRANSACTION"
    elif risk_score > 0.5:
        return "REVIEW_TRANSACTION"
    return "ALLOW"

