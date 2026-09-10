import express from "express";
import cors from "cors";
import router from "./articleRoutes.js";

const app = express();
const port = 3005;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  }),
);

app.use(express.json());

app.use("/api/tasks", router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
