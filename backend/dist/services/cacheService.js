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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedData = exports.cacheData = exports.connectRedis = void 0;
const redis_1 = require("redis");
const config_1 = require("../utils/config");
const client = (0, redis_1.createClient)({ url: config_1.config.redisUrl });
client.on("error", (err) => console.error("Redis Client Error", err));
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
});
exports.connectRedis = connectRedis;
const cacheData = (key, data, expirationInSeconds) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.setEx(key, expirationInSeconds, JSON.stringify(data));
});
exports.cacheData = cacheData;
const getCachedData = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield client.get(key);
    return data ? JSON.parse(data) : null;
});
exports.getCachedData = getCachedData;
