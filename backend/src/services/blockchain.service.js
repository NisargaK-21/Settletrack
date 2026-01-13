import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { blockchainConfig } from "../config/blockchain.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Blockchain connection
const provider = new ethers.JsonRpcProvider(blockchainConfig.rpcUrl);
const wallet = new ethers.Wallet(blockchainConfig.privateKey, provider);

// ✅ CORRECT ABI PATH (Windows safe)
const abiPath = path.resolve(
  process.cwd(),
  "../blockchain/abi/TradeSettlement.json"
);

const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));

const contract = new ethers.Contract(
  blockchainConfig.contractAddress,
  contractABI,
  wallet
);

export const recordTrade = async (trade) => {
  const tx = await contract.recordTrade(
    trade.tradeId,
    trade.buyer,
    trade.seller,
    trade.quantity,
    trade.price
  );
  await tx.wait();
  return tx.hash;
};

export const settleTrade = async (tradeId) => {
  const tx = await contract.settleTrade(tradeId);
  await tx.wait();
  return tx.hash;
};

export const getTradeStatus = async (tradeId) => {
  return await contract.getTradeStatus(tradeId);
};
