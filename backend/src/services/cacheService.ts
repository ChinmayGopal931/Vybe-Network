import { createClient } from "redis";
import { config } from "../utils/config";

const client = createClient({ url: config.redisUrl });

client.on("error", (err) => console.error("Redis Client Error", err));

export const connectRedis = async () => {
  await client.connect();
};

export const cacheData = async (
  key: string,
  data: any,
  expirationInSeconds: number
) => {
  await client.setEx(key, expirationInSeconds, JSON.stringify(data));
};

export const getCachedData = async (key: string) => {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
};
