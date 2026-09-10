import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../db/articles.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    response.json(await getAllTasks());
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

router.post("/", async (request, response) => {
  try {
    const task = await createTask(request.body);

    response.status(201).json(task);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.patch("/:id", async (request, response) => {
  try {
    const task = await updateTask(Number(request.params.id), request.body);

    if (!task) {
      response.status(404).json({ error: "Task not found" });
      return;
    }

    response.json(task);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const deleted = await deleteTask(Number(request.params.id));

    if (!deleted) {
      response.status(404).json({ error: "Task not found" });
      return;
    }

    response.status(204).end();
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export default router;
