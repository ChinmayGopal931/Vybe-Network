import express from "express";
import {
  getMarketCapDistribution,
  getTransactionsPerSecond,
  getWalletBalances,
} from "../services/solanaService";
import { cacheData, getCachedData } from "../services/cacheService";

const wallets = [
  "61aq585V8cR2sZBeawJFt2NPqmN7zDi1sws4KLs5xHXV",
  "EXJHiMkj6NRFDfhWBMKccHNwdSpCT7tdvQeRf87yHm6T",
  "3EpUYHv8NzoD5EzqB74JTYUtva2c1wj3Wq3oR5gaLfGt",
  "7mhcgF1DVsj5iv4CxZDgp51H6MBBwqamsH1KnqXhSRc5",
  "zvYPtfpDXwEE46C3NeZrKV5SHA416BiK2YabQTceQ8X",
  "CbU4oSFCk8SVgW23NLvb5BwctvWcZZHfxRD6HudP8gAo",
  "4Rm2L8C6K4BhkrtjvnrYC3PDScjGwZf4fk6AMYdK4GrZ",
  "9cNE6KBg2Xmf34FPMMvzDF8yUHMrgLRzBV3vD7b1JnUS",
  "JCNCMFXo5M5qwUPg2Utu1u6YWp3MbygxqBsBeXXJfrw",
  "HLksszpjGgiRbyumXyQe5VpmJLuJEnf6YcRzghyDc8Fo",
];

const router = express.Router();

const CACHE_EXPIRATION = {
  MARKET_CAP: 300, // 5 minutes
  TPS: 60, // 1 minute
  WALLET_BALANCE: 600, // 10 minutes
};

router.get("/market-cap-distribution", async (req, res) => {
  try {
    const cachedData = await getCachedData("marketCapDistribution");

    if (cachedData) {
      return res.json(cachedData);
    }
    const data = await getMarketCapDistribution();

    await cacheData("marketCapDistribution", data, CACHE_EXPIRATION.MARKET_CAP);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch market cap distribution" });
  }
});

router.get("/transactions-per-second", async (req, res) => {
  try {
    const cachedData = await getCachedData("transactionsPerSecond");
    if (cachedData) {
      return res.json(cachedData);
    }

    const data = await getTransactionsPerSecond();
    await cacheData("transactionsPerSecond", data, CACHE_EXPIRATION.TPS);
    res.json(data);
  } catch (error: any) {
    console.log(error.message);
    if (error.message === "Rate limit exceeded. Please try again later.") {
      res.status(429).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "Failed to fetch transactions per second" });
    }
  }
});

router.get("/wallet-balances", async (req, res) => {
  try {
    const cachedData = await getCachedData("walletBalances");
    if (cachedData) {
      return res.json(cachedData);
    }

    const data = await getWalletBalances(wallets);
    await cacheData("walletBalances", data, CACHE_EXPIRATION.WALLET_BALANCE);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wallet balances" });
  }
});

export default router;
