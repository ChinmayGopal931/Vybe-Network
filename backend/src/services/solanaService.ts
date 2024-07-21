import { Connection, PublicKey } from "@solana/web3.js";
import { config } from "../utils/config";
import axios from "axios";
import { RateLimiter } from "limiter";

const connection = new Connection(config.solanaRpcUrl);

const tokens: string[] = [
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
  "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
  "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
  "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
  "3B5wuUrMEi5yATD7on46hKfej3pfmd7t1RKgrsN3pump",
];

export const getMarketCapDistribution = async () => {
  const marketCaps = await Promise.all(
    tokens.map(async (tokenAddress) => {
      const publicKey = new PublicKey(tokenAddress);

      const supply = await connection.getTokenSupply(publicKey);

      const priceResponse = await axios.get(
        `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${tokenAddress}&vs_currencies=usd`
      );

      const price = priceResponse.data[tokenAddress]?.usd ?? 0;

      const uiAmount = supply.value.uiAmount ?? 0;
      const marketCap = uiAmount * price;

      return { tokenAddress, marketCap };
    })
  );
  return marketCaps;
};

const limiter = new RateLimiter({ tokensPerInterval: 10, interval: "minute" });

export const getTransactionsPerSecond = async () => {
  const remainingRequests = await limiter.removeTokens(1);
  if (remainingRequests < 0) {
    throw new Error("Rate limit exceeded. Please try again later.");
  }

  const timeframe = await selectTimeframe();
  return getAdaptiveTransactionsPerSecond(timeframe);
};

export const getWalletBalances = async (wallets: string[]) => {
  const publicKeys = wallets.map((wallet) => new PublicKey(wallet));
  const accountInfos = await connection.getMultipleAccountsInfo(publicKeys);

  const balances = accountInfos.map((accountInfo, index) => {
    const balance = accountInfo?.lamports ?? 0;
    return { wallet: wallets[index], balance: balance / 1e9 }; // Convert lamports to SOL
  });

  return balances;
};

// Helpers

async function getAdaptiveTransactionsPerSecond(
  timeframe: number
): Promise<any[]> {
  const MAX_SAMPLES = 720;
  const MIN_SAMPLES = 10;
  const SLOT_TIME = 0.4;

  let samplesNeeded = Math.floor(timeframe / SLOT_TIME);
  samplesNeeded = Math.min(Math.max(samplesNeeded, MIN_SAMPLES), MAX_SAMPLES);

  try {
    const performance = await connection.getRecentPerformanceSamples(
      samplesNeeded
    );

    return performance.map((sample) => ({
      timestamp: sample.slot,
      tps: sample.numTransactions / sample.samplePeriodSecs,
    }));
  } catch (error) {
    console.error("Error fetching performance samples:", error);
    throw error;
  }
}

async function selectTimeframe(): Promise<number> {
  const DEFAULT_TIMEFRAME = 3600; // 1 hour in seconds
  const MAX_TIMEFRAME = 7200; // 2 hours in seconds
  const MIN_TIMEFRAME = 300; // 5 minutes in seconds

  try {
    const start = Date.now();
    await connection.getRecentPerformanceSamples(1);
    const responseTime = Date.now() - start;

    // Adjust timeframe based on response time
    let timeframe = DEFAULT_TIMEFRAME;
    if (responseTime > 1000) {
      timeframe = MIN_TIMEFRAME; // Reduce timeframe if the API is slow
    } else if (responseTime < 100) {
      timeframe = MAX_TIMEFRAME; // Increase timeframe if the API is fast
    }

    return timeframe;
  } catch (error) {
    console.error("Error checking API response time:", error);
    return DEFAULT_TIMEFRAME;
  }
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
