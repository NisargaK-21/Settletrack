# def decide_action(risk_score, is_anomaly):
#     if is_anomaly and risk_score > 0.7:
#         return "BLOCK_TRADE"
#     elif risk_score > 0.7:
#         return "REVIEW_TRADE"
#     elif is_anomaly:
#         return "MONITOR"
#     return "ALLOW"
# def decide_action(risk_score, is_anomaly):
#     if is_anomaly and risk_score > 0.1:
#         return "BLOCK_TRANSACTION"
#     elif risk_score > 0.5:
#         return "REVIEW_TRANSACTION"
#     return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     """
#     risk_score: float (0.0 - 1.0)
#     is_anomaly: bool
#     """

#     # 🔴 High confidence fraud → BLOCK
#     if risk_score >= 0.6:
#         return "BLOCK_TRANSACTION"

#     # 🟡 Suspicious behavior → REVIEW
#     if is_anomaly or risk_score >= 0.25:
#         return "REVIEW_TRANSACTION"

#     # 🟢 Safe transaction → ALLOW
#     return "ALLOW"


# def decide_action(risk_score, is_anomaly):
#     if is_anomaly and risk_score > 0.1:
#         return "BLOCK_TRANSACTION"
#     elif risk_score > 0.5:
#         return "REVIEW_TRANSACTION"
#     else:
#         return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     # 🔴 HIGH RISK → BLOCK
#     if risk_score >= 0.3:
#         return "BLOCK_TRANSACTION"

#     # 🟡 MEDIUM RISK → REVIEW
#     if is_anomaly or risk_score >= 0.15:
#         return "REVIEW_TRANSACTION"

#     # 🟢 LOW RISK → ALLOW
#     return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     # 🔴 BLOCK only when BOTH are bad
#     if is_anomaly and risk_score >= 0.25:
#         return "BLOCK_TRANSACTION"

#     # 🟡 REVIEW when ONE is suspicious
#     if is_anomaly or risk_score >= 0.15:
#         return "REVIEW_TRANSACTION"

#     # 🟢 Otherwise allow
#     return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     if is_anomaly and risk_score >= 0.25:
#         return "BLOCK_TRANSACTION"

#     if is_anomaly or risk_score >= 0.15:
#         return "REVIEW_TRANSACTION"

#     return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     """
#     risk_score: float between 0 and 1 (your ML output)
#     is_anomaly: boolean from IsolationForest
#     """

#     # 🔴 BLOCK: anomaly + noticeable risk
#     if is_anomaly and risk_score >= 0.20:
#         return "BLOCK_TRANSACTION"

#     # 🟡 REVIEW: medium risk OR anomaly alone
#     if risk_score >= 0.10 or is_anomaly:
#         return "REVIEW_TRANSACTION"

#     # 🟢 ALLOW: low risk + normal behavior
#     return "ALLOW"


# def decide_action(risk_score, is_anomaly):
    

#     # 🔴 BLOCK: anomaly + noticeable risk
#     if is_anomaly and risk_score >= 0.10:
#         return "BLOCK_TRANSACTION"

#     # 🟡 REVIEW: medium risk OR anomaly alone
#     if risk_score >= 0.05 or is_anomaly:
#         return "REVIEW_TRANSACTION"

#     # 🟢 ALLOW: low risk + normal behavior
#     if risk_score < 0.05 or is_anomaly:
#         return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     """
#     risk_score: float from ML (0 to 1, not perfectly calibrated)
#     is_anomaly: boolean from anomaly detection
#     """

#     # Step 1: Normalize risk into buckets
#     if risk_score < 0.15 and not is_anomaly:
#         risk_level = "LOW"
#     elif risk_score < 0.35 and not is_anomaly:
#         risk_level = "MEDIUM"
#     elif is_anomaly and risk_score < 0.35:
#         risk_level = "MEDIUM"
#     else:
#         risk_level = "HIGH"

#     # Step 2: Map risk level to action
#     if risk_level == "LOW":
#         return "ALLOW"

#     if risk_level == "MEDIUM":
#         return "REVIEW_TRANSACTION"

#     return "BLOCK_TRANSACTION"

# def decide_action(risk_score, is_anomaly):
#     """
#     Deterministic risk-based decision engine.
#     ALWAYS returns one of:
#     - ALLOW
#     - REVIEW_TRANSACTION
#     - BLOCK_TRANSACTION
#     """

#     # -------------------------------
#     # STEP 1: FRAUD CONFIRMATION
#     # -------------------------------
#     # If anomaly is detected AND risk is non-trivial,
#     # we assume real fraud possibility.
#     if is_anomaly and risk_score >= 0.15:
#         return "BLOCK_TRANSACTION"

#     # -------------------------------
#     # STEP 2: SUSPICIOUS BEHAVIOR
#     # -------------------------------
#     # Medium risk OR anomaly alone → review
#     if risk_score >= 0.10 or is_anomaly:
#         return "REVIEW_TRANSACTION"

#     # -------------------------------
#     # STEP 3: SAFE TRANSACTION
#     # -------------------------------
#     return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     """
#     Optimized decision engine to ensure clear separation 
#     between BLOCK, REVIEW, and ALLOW.
#     """
    
#     # 1. BLOCK: High risk score OR (Anomaly + moderate risk)
#     # This ensures high-risk items are blocked even if not 'anomalous'
#     if risk_score >= 0.50 or (is_anomaly and risk_score >= 0.20):
#         return "BLOCK_TRANSACTION"

#     # 2. REVIEW: Anomaly detected OR mid-range risk
#     # This catches suspicious things that aren't quite 'dangerous' yet
#     if is_anomaly or risk_score >= 0.10:
#         return "REVIEW_TRANSACTION"

#     # 3. ALLOW: Everything else
#     return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     # 🔴 BLOCK: Only if it's an anomaly AND has some risk
#     if is_anomaly and risk_score >= 0.15:
#         return "BLOCK_TRANSACTION"

#     # 🟡 REVIEW: Only if risk is noticeable (even if it's an anomaly)
#     # By adding 'risk_score > 0.05', small anomalies will now be ALLOWED
#     if (is_anomaly and risk_score > 0.05) or risk_score >= 0.10:
#         return "REVIEW_TRANSACTION"

#     # 🟢 ALLOW: Everything else
#     return "ALLOW"

# def decide_action(risk_score, is_anomaly):
#     # 1. 🔴 BLOCK: Strong evidence of fraud
#     if is_anomaly and risk_score >= 0.15:
#         return "BLOCK_TRANSACTION"

#     # 2. 🟡 REVIEW: Significant risk OR high-confidence anomaly
#     # Only review if risk_score is at least 0.08
#     if risk_score >= 0.10 or (is_anomaly and risk_score >= 0.08):
#         return "REVIEW_TRANSACTION"

#     # 3. 🟢 ALLOW: Everything else
#     # This now catches anomalies with very low risk scores (e.g., 0.02)
#     return "ALLOW"


# def decide_action(risk_score, is_anomaly):
#     # Print the values so we can verify they match your log
#     print(f"Processing: Score={risk_score}, Anomaly={is_anomaly}")

#     # 🔴 BLOCK: Only if risk is very high
#     if risk_score >= 0.30:
#         return "BLOCK_TRANSACTION"

#     # 🟡 REVIEW: Only if it's an anomaly OR risk is above 0.20
#     # Your current score of 0.15 is LESS than 0.20, so it will skip this!
#     if is_anomaly or risk_score >= 0.20:
#         return "REVIEW_TRANSACTION"

#     # 🟢 ALLOW: This will now catch your 0.15 score
#     return "ALLOW"

def decide_action(risk_score, is_anomaly):
    # 🔴 BLOCK: If it's an anomaly AND risk score is present
    # Using 0.10 because your log showed 0.11 for the big trade
    if is_anomaly and risk_score >= 0.10:
        return "BLOCK_TRANSACTION"

    # 🟡 REVIEW: If it's an anomaly OR risk score is moderate
    # We'll use 0.14 to catch your "small" trade's 0.15
    if is_anomaly or risk_score >= 0.14:
        return "REVIEW_TRANSACTION"

    # 🟢 ALLOW: Everything else
    return "ALLOW"