import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "./articles.js";

const router = express.Router();

router.get("/", (request, response) => {
  response.json(getAllTasks());
});

router.post("/", (request, response) => {
  try {
    const task = createTask(request.body);

    response.status(201).json(task);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

router.patch("/:id", (request, response) => {
  const task = updateTask(Number(request.params.id), request.body);

  if (!task) {
    response.status(404).json({ error: "Task not found" });
    return;
  }

  response.json(task);
});

router.delete("/:id", (request, response) => {
  const deleted = deleteTask(Number(request.params.id));

  if (!deleted) {
    response.status(404).json({ error: "Task not found" });
    return;
  }

  response.status(204).end();
});

export default router;
