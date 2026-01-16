import express from "express";
import { recordTrade, settleTrade, getTradeStatus, getBlockchainStatus } from "../services/blockchain.service.js";
import { checkRisk } from "../services/ml.service.js";

const router = express.Router();

// Health check endpoint
router.get("/health", async (req, res) => {
  try {
    const blockchainStatus = getBlockchainStatus();
    res.json({ 
      status: "ok",
      backend: "running",
      blockchain: blockchainStatus
    });
  } catch (err) {
    console.error("Health check error:", err);
    res.status(500).json({
      error: "Health check failed"
    });
  }
});

router.post("/risk", async (req, res) => {
  try {
    const trade = req.body;

    const risk = await checkRisk(trade);

    res.json(risk);
  } catch (err) {
    console.error("ML RISK ERROR:", err);
    res.status(500).json({
      error: "ML service failed"
    });
  }
});


// Get all trades
router.get("/trades", async (req, res) => {
  try {
    const blockchainStatus = getBlockchainStatus();
    // Return a placeholder response or fetch from a database if implemented
    res.json({ 
      trades: [],
      message: "Trade history endpoint - database integration required",
      blockchain: blockchainStatus
    });
  } catch (err) {
    console.error("Error fetching trades:", err);
    res.status(500).json({
      error: err.message || "Failed to fetch trades"
    });
  }
});

router.post("/trade", async (req, res) => {
  try {
    const trade = req.body;

    // const risk = await checkRisk(trade);
    // if (risk.level === "HIGH") {
    //   return res.status(400).json({ message: "High risk trade" });
    // }
    // TEMP: ML disabled for demo

    const risk = await checkRisk(trade);
console.log("ML Risk Result:", risk);




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
    console.error("GET STATUS ERROR:", err);
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
