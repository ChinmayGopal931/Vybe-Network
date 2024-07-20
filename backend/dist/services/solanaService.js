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
exports.getWalletBalances = exports.getTransactionsPerSecond = exports.getMarketCapDistribution = void 0;
const web3_js_1 = require("@solana/web3.js");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../utils/config");
const connection = new web3_js_1.Connection(config_1.config.solanaRpcUrl);
// SPL tokens to fetch (replace with actual token addresses)
const tokens = [
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", // USDT
    "AGFEad2et2ZJif9jaGpdMixQqvW5i81aBdvKe7PHNfz3", // FTT
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", // BONK
    "kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6", // KIN
];
const getMarketCapDistribution = () => __awaiter(void 0, void 0, void 0, function* () {
    const marketCaps = yield Promise.all(tokens.map((tokenAddress) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const publicKey = new web3_js_1.PublicKey(tokenAddress);
        const supply = yield connection.getTokenSupply(publicKey);
        const priceResponse = yield axios_1.default.get(`https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${tokenAddress}&vs_currencies=usd`);
        const price = (_b = (_a = priceResponse.data[tokenAddress.toLowerCase()]) === null || _a === void 0 ? void 0 : _a.usd) !== null && _b !== void 0 ? _b : 0;
        const uiAmount = (_c = supply.value.uiAmount) !== null && _c !== void 0 ? _c : 0;
        const marketCap = uiAmount * price;
        return { tokenAddress, marketCap };
    })));
    return marketCaps;
});
exports.getMarketCapDistribution = getMarketCapDistribution;
const getTransactionsPerSecond = () => __awaiter(void 0, void 0, void 0, function* () {
    const performance = yield connection.getRecentPerformanceSamples(60);
    return performance.map((sample) => ({
        timestamp: sample.slot,
        tps: sample.numTransactions / sample.samplePeriodSecs,
    }));
});
exports.getTransactionsPerSecond = getTransactionsPerSecond;
const getWalletBalances = (wallets) => __awaiter(void 0, void 0, void 0, function* () {
    const balances = yield Promise.all(wallets.map((wallet) => __awaiter(void 0, void 0, void 0, function* () {
        const publicKey = new web3_js_1.PublicKey(wallet);
        const balance = yield connection.getBalance(publicKey);
        return { wallet, balance: balance / 1e9 }; // Convert lamports to SOL
    })));
    return balances;
});
exports.getWalletBalances = getWalletBalances;
