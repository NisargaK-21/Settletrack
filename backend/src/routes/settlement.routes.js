import express from "express";
import { recordTrade, settleTrade, getTradeStatus } from "../services/blockchain.service.js";
import { checkRisk } from "../services/ml.service.js";

const router = express.Router();

router.post("/trade", async (req, res) => {
  try {
    const trade = req.body;

    // const risk = await checkRisk(trade);
    // if (risk.level === "HIGH") {
    //   return res.status(400).json({ message: "High risk trade" });
    // }

    const txHash = await recordTrade(trade);
    res.json({ txHash });

  } catch (err) {
    console.error("FULL ERROR:", err);

    res.status(500).json({
      error:
        err.reason ||
        err.error?.message ||
        err.data?.message ||
        err.message ||
        err.toString()
    });
  }
});


router.post("/settle/:tradeId", async (req, res) => {
  try {
    const txHash = await settleTrade(req.params.tradeId);
    res.json({ txHash });
  } catch (err) {
  console.error("FULL ERROR:", err);

  res.status(500).json({
    error:
      err.reason ||
      err.error?.message ||
      err.message ||
      err.toString()
  });
}

});

router.get("/status/:tradeId", async (req, res) => {
  try {
    const status = await getTradeStatus(req.params.tradeId);
    res.json({ status });
  } catch (err) {
  console.error("FULL ERROR:", err);

  res.status(500).json({
    error:
      err.reason ||
      err.error?.message ||
      err.message ||
      err.toString()
  });
}

});

export default router;
