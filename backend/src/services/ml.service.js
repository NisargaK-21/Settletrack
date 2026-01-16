// import axios from "axios";

// export const checkRisk = async (trade) => {
//   try {
//     // Convert trade data to the format ML API expects
//     const mlData = {
//       tradeId: Number(trade.tradeId),
//       buyer: trade.buyer,
//       seller: trade.seller,
//       quantity: Number(trade.quantity),
//       price: Number(trade.price)
//     };

//     console.log("Sending to ML service:", mlData);

//     const response = await axios.post(
//       process.env.ML_SERVICE_URL,
//       mlData
//     );

//     console.log("ML Response:", response.data);
//     return response.data;
//   } catch (err) {
//     console.error("ML SERVICE ERROR:", err.message);
//     return { 
//       fraud_probability: 0.1, 
//       unusual_behavior: false, 
//       recommended_action: "REVIEW_TRANSACTION",
//       error: "ML service unavailable - using default" 
//     };
//   }
// };

import axios from "axios";

/**
 * Calls the ML Risk Scoring service deployed on Railway
 */
export const checkRisk = async (trade) => {
  try {
    // Prepare payload exactly as ML expects
    const mlPayload = {
      tradeId: Number(trade.tradeId),
      buyer: trade.buyer,
      seller: trade.seller,
      quantity: Number(trade.quantity),
      price: Number(trade.price),
    };

    // IMPORTANT: ML_SERVICE_URL must be base `/api`
    // Example:
    // https://settletrack-production-0dd3.up.railway.app/api
    const mlUrl = `${process.env.ML_SERVICE_URL}/predict`;

    console.log("🔁 ML URL:", mlUrl);
    console.log("📤 Sending to ML:", mlPayload);

    const response = await axios.post(
      mlUrl,
      mlPayload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 8000,
      }
    );

    console.log("✅ ML Response:", response.data);

    return response.data;
  } catch (err) {
    console.error(
      "❌ ML SERVICE ERROR:",
      err.response?.data || err.message
    );

    // Safe fallback so UI never crashes
    return {
      fraud_probability: 0.0,
      unusual_behavior: false,
      recommended_action: "ALLOW",
      error: "ML service unreachable",
    };
  }
};
