import express from "express";
import path from "path";
import { config } from "./utils/config";
import apiRoutes from "./routes/api";
import { connectRedis } from "./services/cacheService";
import cors from "cors";

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();

// Enable CORS for all routes
app.use(cors(corsOptions));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Use API routes
app.use("/api", apiRoutes);

// Serve the index.html file for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

connectRedis()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
    process.exit(1);
  });
