import express, { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import {
  connectMongo,
  connectMySQL,
  connectRedis,
  corsOptions,
} from "./config/index.js";
import morgan from "morgan";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// --- Global Middlewares ---
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// --- Routes ---
app.get("/", (_: Request, res: Response) => {
  res.send("Server is up and running! 🚀");
});

// --- Start Server ---
const startServer = async () => {
  try {
    // Connect to all databases concurrently
    await Promise.all([connectMongo(), connectMySQL(), connectRedis()]);

    app.listen(PORT, () => {
      console.log(`\nServer listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
