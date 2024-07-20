"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 3000,
    solanaRpcUrl: process.env.SOLANA_RPC_URL || "https://solana-mainnet.rpc.extrnode.com/",
    redisUrl: process.env.REDIS_URL || "redis://redis:6379",
    // Add other configuration variables as needed
};
