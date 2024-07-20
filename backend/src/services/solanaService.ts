import { Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";
import { config } from "../utils/config";

const connection = new Connection(config.solanaRpcUrl);

const tokens: string[] = [
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
  "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
  "AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3", // FTT
  "kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6", // KIN
  "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
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

export const getTransactionsPerSecond = async () => {
  const performance = await connection.getRecentPerformanceSamples(60);
  return performance.map((sample) => ({
    timestamp: sample.slot,
    tps: sample.numTransactions / sample.samplePeriodSecs,
  }));
};

export const getWalletBalances = async (wallets: string[]) => {
  const balances = await Promise.all(
    wallets.map(async (wallet) => {
      const publicKey = new PublicKey(wallet);

      const balance = await connection.getBalance(publicKey);
      return { wallet, balance: balance / 1e9 }; // Convert lamports to SOL
    })
  );
  return balances;
};
