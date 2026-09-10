import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./articleRoutes.js";
import { getDatabaseVersion, initializeDatabase } from "../db/articles.js";

const app = express();
const port = process.env.PORT || 3005;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  }),
);

app.use(express.json());

app.get("/api/health", async (request, response) => {
  try {
    const version = await getDatabaseVersion();
    response.json({ database: "connected", version });
  } catch (error) {
    response
      .status(503)
      .json({ database: "disconnected", error: error.message });
  }
});

app.use("/api/tasks", router);

try {
  await initializeDatabase();

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (error) {
  console.error("Could not initialize the database", error);
  process.exit(1);
}
