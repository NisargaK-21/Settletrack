// export const checkRisk = async (trade) => {
//   return { level: "LOW" };
// };

import axios from "axios";

export const checkRisk = async (trade) => {
  try {
    const response = await axios.post(
      process.env.ML_SERVICE_URL,
      {
        step: trade.tradeId,
        type: "TRANSFER",
        amount: trade.price,
        oldbalanceOrg: trade.price,
        newbalanceOrig: 0,
        oldbalanceDest: 0,
        newbalanceDest: trade.price
      }
    );

    return response.data;
  } catch (err) {
    console.error("ML SERVICE ERROR:", err.message);
    return { error: "ML service unavailable" };
  }
};
