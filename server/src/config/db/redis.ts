import { createClient } from "redis";
import "dotenv/config";

// Create a Redis client
export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!),
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Function to connect and verify
export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully.");
  } catch (error) {
    console.error("Redis connection error:", error);
    process.exit(1);
  }
};
