"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const solanaService_1 = require("../services/solanaService");
const cacheService_1 = require("../services/cacheService");
const router = express_1.default.Router();
const CACHE_EXPIRATION = {
    MARKET_CAP: 300, // 5 minutes
    TPS: 60, // 1 minute
    WALLET_BALANCE: 600, // 10 minutes
};
router.get("/market-cap-distribution", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield (0, cacheService_1.getCachedData)("marketCapDistribution");
        if (cachedData) {
            return res.json(cachedData);
        }
        const data = yield (0, solanaService_1.getMarketCapDistribution)();
        yield (0, cacheService_1.cacheData)("marketCapDistribution", data, CACHE_EXPIRATION.MARKET_CAP);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch market cap distribution" });
    }
}));
router.get("/transactions-per-second", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield (0, cacheService_1.getCachedData)("transactionsPerSecond");
        if (cachedData) {
            return res.json(cachedData);
        }
        const data = yield (0, solanaService_1.getTransactionsPerSecond)();
        yield (0, cacheService_1.cacheData)("transactionsPerSecond", data, CACHE_EXPIRATION.TPS);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch transactions per second" });
    }
}));
router.get("/wallet-balances", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cachedData = yield (0, cacheService_1.getCachedData)("walletBalances");
        if (cachedData) {
            return res.json(cachedData);
        }
        // Replace with actual wallet addresses
        const wallets = [
            "DLvbw6fgmNSzXWv8YeXdkk7Jnc1GZvVZZTzCTd4pxH3K",
            "BKwfWYZuruTd2VqXMPu9dFRoxAJ7hkYPJZEPd3mWxF1L",
            // ... Add 8 more wallet addresses
        ];
        const data = yield (0, solanaService_1.getWalletBalances)(wallets);
        yield (0, cacheService_1.cacheData)("walletBalances", data, CACHE_EXPIRATION.WALLET_BALANCE);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch wallet balances" });
    }
}));
exports.default = router;
