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

export const checkRisk = async (trade) => {
  try {
    const mlData = {
      tradeId: Number(trade.tradeId),
      buyer: trade.buyer,
      seller: trade.seller,
      quantity: Number(trade.quantity),
      price: Number(trade.price)
    };

    console.log("Sending to ML service:", mlData);
    console.log("ML URL:", process.env.ML_SERVICE_URL);

    const response = await axios.post(
      process.env.ML_SERVICE_URL,
      mlData,
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 5000
      }
    );

    console.log("ML Response:", response.data);
    return response.data;

  } catch (err) {
    console.error("❌ ML SERVICE ERROR");

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error("Message:", err.message);
    }

    // Safe fallback so UI doesn't break
    return {
      fraud_probability: 0.1,
      unusual_behavior: false,
      recommended_action: "REVIEW_TRANSACTION",
      error: "ML service unavailable"
    };
  }
};

