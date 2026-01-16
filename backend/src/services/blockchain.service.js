// // import { ethers } from "ethers";
// // import fs from "fs";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // import { blockchainConfig } from "../config/blockchain.config.js";

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // let contract = null;
// // let provider = null;
// // let wallet = null;
// // let connectionError = null;

// // // Initialize blockchain connection
// // async function initializeBlockchain() {
// //   try {
// //     provider = new ethers.JsonRpcProvider(blockchainConfig.rpcUrl);
    
// //     // Test the connection with a timeout
// //     const timeoutPromise = new Promise((_, reject) =>
// //       setTimeout(() => reject(new Error("Connection timeout")), 5000)
// //     );
    
// //     await Promise.race([provider.getNetwork(), timeoutPromise]);
    
// //     wallet = new ethers.Wallet(blockchainConfig.privateKey, provider);

// //     //✅ CORRECT ABI PATH (Windows safe)
// //     const abiPath = path.resolve(
// //       process.cwd(),
// //       "blockchain/abi/TradeSettlement.json"
// //     );

// // //     // ✅ This uses the location of the current file to go up to the root
// // // const abiPath = path.resolve(__dirname, "../../blockchain/abi/TradeSettlement.json");
// //     // ✅ REPLACE your current abiPath logic with this exact code:
// // // const abiPath = path.join(process.cwd(), "blockchain", "abi", "TradeSettlement.json");

// // // // If you moved the folder inside 'backend', this will find it perfectly.
// // // const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));



// //     const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));

// //     contract = new ethers.Contract(
// //       blockchainConfig.contractAddress,
// //       contractABI,
// //       wallet
// //     );

// //     connectionError = null;
// //     console.log("✅ Blockchain connection successful");
// //     return true;
// //   } catch (err) {
// //     connectionError = err.message;
// //     console.error("❌ Blockchain connection failed:", err.message);
// //     return false;
// //   }
// // }

// // // Initialize on startup (non-blocking)
// // initializeBlockchain().catch(err => {
// //   console.error("Startup initialization error:", err.message);
// // });

// // export const recordTrade = async (trade) => {
// //   try {
// //     if (!contract) {
// //       throw new Error("Blockchain not connected. Ganache must be running on http://127.0.0.1:7545");
// //     }

// //     console.log("Calling recordTrade with:", trade);

// //     // Ensure addresses are properly formatted to avoid ENS resolution issues
// //     const buyerAddress = ethers.getAddress(trade.buyer);
// //     const sellerAddress = ethers.getAddress(trade.seller);

// //     const tx = await contract.recordTrade(
// //       trade.tradeId,
// //       buyerAddress,
// //       sellerAddress,
// //       trade.quantity,
// //       trade.price
// //     );

// //     console.log("TX SENT:", tx.hash);

// //     await tx.wait();

// //     console.log("TX CONFIRMED");

// //     return tx.hash;
// //   } catch (err) {
// //     console.error("BLOCKCHAIN ERROR:", err);
// //     throw err;
// //   }
// // };

// // export const settleTrade = async (tradeId) => {
// //   try {
// //     if (!contract) {
// //       throw new Error("Blockchain not connected. Ganache must be running on http://127.0.0.1:7545");
// //     }
    
// //     const tx = await contract.settleTrade(tradeId);
// //     await tx.wait();
// //     return tx.hash;
// //   } catch (err) {
// //     console.error("SETTLEMENT ERROR:", err);
// //     throw err;
// //   }
// // };

// // export const getTradeStatus = async (tradeId) => {
// //   try {
// //     if (!contract) {
// //       throw new Error("Blockchain not connected. Ganache must be running on http://127.0.0.1:7545");
// //     }
    
// //     // Try to get the trade status with error handling
// //     let status;
// //     try {
// //       status = await contract.getTradeStatus(tradeId);
// //     } catch (err) {
// //       // If contract call fails, return "Not Found"
// //       console.log("Trade not found or contract error:", err.message);
// //       return "Not Found";
// //     }
    
// //     // Convert status number to string
// //     const statusMap = { 0: "Pending", 1: "Settled" };
// //     return statusMap[status] || "Unknown";
// //   } catch (err) {
// //     console.error("GET STATUS ERROR:", err);
// //     throw err;
// //   }
// // };

// // export const getBlockchainStatus = () => {
// //   return {
// //     connected: contract !== null,
// //     error: connectionError,
// //     rpcUrl: blockchainConfig.rpcUrl,
// //     contractAddress: blockchainConfig.contractAddress
// //   };
// // };


// import { ethers } from "ethers";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import { blockchainConfig } from "../config/blockchain.config.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// let contract = null;
// let provider = null;
// let wallet = null;
// let connectionError = null;

// /**
//  * Initialize blockchain connection using robust path resolution for Railway
//  */
// async function initializeBlockchain() {
//   try {
//     // 1. Initialize Provider (Alchemy/Infura URL from environment variables)
//     provider = new ethers.JsonRpcProvider(blockchainConfig.rpcUrl);
    
//     // 2. Test the connection with a timeout to avoid hanging
//     const timeoutPromise = new Promise((_, reject) =>
//       setTimeout(() => reject(new Error("Blockchain connection timeout after 5s")), 5000)
//     );
    
//     await Promise.race([provider.getNetwork(), timeoutPromise]);
    
//     // 3. Initialize Wallet
//     wallet = new ethers.Wallet(blockchainConfig.privateKey, provider);
      
// // const abiPath = path.resolve(
// //       process.cwd(),
// //       "backend/abi/TradeSettlement.json"
// //     );

//       const abiPath = new URL(
//   "../abi/TradeSettlement.json",
//   import.meta.url
// );

//     // 4. ✅ ROBUST ABI PATH RESOLUTION
//     // This ensures the file is found even if your project root changes on Railway
//     // const abiPath = path.join(process.cwd(), "blockchain", "abi", "TradeSettlement.json");

//     if (!fs.existsSync(abiPath)) {
//       throw new Error(`ABI file missing at: ${abiPath}`);
//     }

//     const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));

//     // 5. Initialize Contract
//     contract = new ethers.Contract(
//       blockchainConfig.contractAddress,
//       contractABI,
//       wallet
//     );

//     connectionError = null;
//     console.log("✅ Blockchain connection successful");
//     return true;
//   } catch (err) {
//     connectionError = err.message;
//     console.error("❌ Blockchain connection failed:", err.message);
//     return false;
//   }
// }

// // Auto-initialize on startup
// initializeBlockchain().catch(err => {
//   console.error("Critical: Startup blockchain initialization error:", err.message);
// });

// export const recordTrade = async (trade) => {
//   try {
//     if (!contract) {
//       throw new Error(`Blockchain not connected. Check RPC URL: ${blockchainConfig.rpcUrl}`);
//     }

//     console.log("Calling recordTrade with:", trade);

//     const buyerAddress = ethers.getAddress(trade.buyer);
//     const sellerAddress = ethers.getAddress(trade.seller);

//     const tx = await contract.recordTrade(
//       trade.tradeId,
//       buyerAddress,
//       sellerAddress,
//       trade.quantity,
//       trade.price
//     );

//     console.log("TX SENT:", tx.hash);
//     await tx.wait();
//     console.log("TX CONFIRMED");

//     return tx.hash;
//   } catch (err) {
//     console.error("BLOCKCHAIN ERROR:", err);
//     throw err;
//   }
// };

// export const settleTrade = async (tradeId) => {
//   try {
//     if (!contract) {
//       throw new Error("Blockchain not connected. Check service logs.");
//     }
    
//     const tx = await contract.settleTrade(tradeId);
//     await tx.wait();
//     return tx.hash;
//   } catch (err) {
//     console.error("SETTLEMENT ERROR:", err);
//     throw err;
//   }
// };

// export const getTradeStatus = async (tradeId) => {
//   try {
//     if (!contract) {
//       throw new Error("Blockchain not connected.");
//     }
    
//     let status;
//     try {
//       status = await contract.getTradeStatus(tradeId);
//     } catch (err) {
//       console.log("Trade not found or contract error:", err.message);
//       return "Not Found";
//     }
    
//     const statusMap = { 0: "Pending", 1: "Settled" };
//     return statusMap[Number(status)] || "Unknown";
//   } catch (err) {
//     console.error("GET STATUS ERROR:", err);
//     throw err;
//   }
// };

// export const getBlockchainStatus = () => {
//   return {
//     connected: contract !== null,
//     error: connectionError,
//     rpcUrl: blockchainConfig.rpcUrl,
//     contractAddress: blockchainConfig.contractAddress
//   };
// };

import { ethers } from "ethers";
import fs from "fs";
import { blockchainConfig } from "../config/blockchain.config.js";

// ===============================
// GLOBAL STATE
// ===============================
let contract = null;
let provider = null;
let wallet = null;
let connectionError = null;

// ===============================
// BLOCKCHAIN INITIALIZATION
// ===============================
async function initializeBlockchain() {
  try {
    // 1. Provider
    provider = new ethers.JsonRpcProvider(blockchainConfig.rpcUrl);

    // 2. Timeout guard
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Blockchain connection timeout after 5s")), 5000)
    );

    await Promise.race([provider.getNetwork(), timeoutPromise]);

    // 3. Wallet
    wallet = new ethers.Wallet(blockchainConfig.privateKey, provider);

    // 4. ✅ CORRECT ABI PATH (RELATIVE TO THIS FILE)
    const abiPath = new URL(
      "../abi/TradeSettlement.json",
      import.meta.url
    );

    if (!fs.existsSync(abiPath.pathname)) {
      throw new Error(`ABI file missing at: ${abiPath.pathname}`);
    }

    const contractABI = JSON.parse(
      fs.readFileSync(abiPath, "utf8")
    );

    // 5. Contract
    contract = new ethers.Contract(
      blockchainConfig.contractAddress,
      contractABI,
      wallet
    );

    connectionError = null;
    console.log("✅ Blockchain connection successful");
    return true;

  } catch (err) {
    connectionError = err.message;
    console.error("❌ Blockchain connection failed:", err.message);
    return false;
  }
}

// ===============================
// AUTO INIT (NON-BLOCKING)
// ===============================
initializeBlockchain().catch(err => {
  console.error("Startup blockchain init error:", err.message);
});

// ===============================
// SERVICE METHODS
// ===============================
export const recordTrade = async (trade) => {
  if (!contract) {
    throw new Error("Blockchain not connected");
  }

  const buyerAddress = ethers.getAddress(trade.buyer);
  const sellerAddress = ethers.getAddress(trade.seller);

  const tx = await contract.recordTrade(
    trade.tradeId,
    buyerAddress,
    sellerAddress,
    trade.quantity,
    trade.price
  );

  await tx.wait();
  return tx.hash;
};

export const settleTrade = async (tradeId) => {
  if (!contract) {
    throw new Error("Blockchain not connected");
  }

  const tx = await contract.settleTrade(tradeId);
  await tx.wait();
  return tx.hash;
};

export const getTradeStatus = async (tradeId) => {
  if (!contract) {
    throw new Error("Blockchain not connected");
  }

  const status = await contract.getTradeStatus(tradeId);
  const statusMap = { 0: "Pending", 1: "Settled" };

  return statusMap[Number(status)] || "Unknown";
};

export const getBlockchainStatus = () => {
  return {
    connected: contract !== null,
    error: connectionError,
    rpcUrl: blockchainConfig.rpcUrl,
    contractAddress: blockchainConfig.contractAddress
  };
};
