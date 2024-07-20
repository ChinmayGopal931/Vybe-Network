import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: 3000,
  solanaRpcUrl:
    "https://solana-mainnet.rpc.extrnode.com/b924f0b3-0a08-4b05-8e0f-97b502ccf7dd", // I would use a env but Decided not to for this demo for the sake of speed
  redisUrl: "redis://redis:6379",
};
