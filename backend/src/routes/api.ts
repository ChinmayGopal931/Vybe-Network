import express from "express";
import {
  getMarketCapDistribution,
  getTransactionsPerSecond,
  getWalletBalances,
} from "../services/solanaService";
import { cacheData, getCachedData } from "../services/cacheService";

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
    console.log(error);
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions per second" });
  }
});

router.get("/wallet-balances", async (req, res) => {
  try {
    const cachedData = await getCachedData("walletBalances");
    if (cachedData) {
      return res.json(cachedData);
    }

    const wallets = [
      "3yE21jmVgd2S6CMLPDoLsD9iQaH1HG6wr3V7Mj34DkS8",
      "D5dbeCc2vqE2fJv9QjWccA8uqYdYrHg6GPnPNJLRZSwf",
      "5ZXS8YNRPB8UzAL7ErXN5AwMKfCdug6Jxxb8t7Xtawf7",
      "8XzESyLrt2pk9wsMAuNztgT1tXnCBoLFhTqgMn7PZitQ",
      "7MtGeMuJj9oUMj1Vx2F1FgE3dfGfAYDCCHYbk54LHvCd",
      "2sm3VcV1knop8B7Aiy9EJJ3QHX3ZfNLftQ3rTv5hLG97",
      "9ryCxE7SgMHj1V2Fd9mZ9ty1pEFJx4zxNpvHqStF6xFz",
      "4t6zWh1BcSPDeFzFEW9DCzHZndizEsX9tP88e8jpKZjR",
      "EHvFeUsLJvBqeZ4ErT3d5nEpaSgRaMVHRhjGqbn9whpM",
      "FNX6uLPrT9wAFDXCeKzPiQeb8fiTE2cB5nADZif3Huj7",
      "GSjZTYUBbtHyP6rUPDofWgJmoi8iFzQKGdENremcFSMX",
      "DqN5Txk1XRAjtpzTfJm3VmET2PAj7FPp69wdzREdLiwD",
      "GvEBmTp8HbF7pZyF7nzDRr4ST6Y9kFjszJEMZPPbdojP",
      "3KFK6z2WkGf6Fi7DrTxqAXk1ERbFekjj3L7AbgNZPdYn",
      "E6XfFjqzNnozqX1vXs94nZ9eXbP8pViEFJcfsDxMfdM",
      "GSjZTYUBbtHyP6rUPDofWgJmoi8iFzQKGdENremcFSMX",
    ];
    const data = await getWalletBalances(wallets);
    await cacheData("walletBalances", data, CACHE_EXPIRATION.WALLET_BALANCE);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wallet balances" });
  }
});

export default router;
