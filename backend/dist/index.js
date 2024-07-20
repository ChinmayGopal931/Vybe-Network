"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./utils/config");
const api_1 = __importDefault(require("./routes/api"));
const cacheService_1 = require("./services/cacheService");
const app = (0, express_1.default)();
app.use("/api", api_1.default);
(0, cacheService_1.connectRedis)()
    .then(() => {
    app.listen(config_1.config.port, () => {
        console.log(`Server running on port ${config_1.config.port}`);
    });
})
    .catch((err) => {
    console.error("Failed to connect to Redis:", err);
    process.exit(1);
});
