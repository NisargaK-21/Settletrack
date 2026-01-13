import dotenv from "dotenv";
dotenv.config();

export const blockchainConfig = {
  rpcUrl: process.env.GANACHE_RPC,
  privateKey: process.env.PRIVATE_KEY,
  contractAddress: process.env.CONTRACT_ADDRESS,
};
