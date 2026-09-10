import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// var hemskt att försöka ta in non db men nu är det löst efter mycket om och men

const databaseUrl = process.env.DATABASE_URL?.replace(
  /^DATABASE_URL\s*=\s*/,
  "",
)
  .replace(/^['"]|['"]$/g, "")
  .trim();

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const sql = neon(databaseUrl);

const requiredFields = [
  "title",
  "description",
  "assignee",
  "category",
  "priority",
];
const priorities = ["low", "medium", "high"];
const statuses = ["todo", "doing", "done"];

export async function getDatabaseVersion() {
  const [result] = await sql`SELECT version()`;
  return result.version;
}

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      assignee TEXT NOT NULL,
      category TEXT NOT NULL,
      priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
      status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'doing', 'done')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM tasks`;

  if (count === 0) {
    await sql`
      INSERT INTO tasks (title, description, assignee, category, priority, status)
      VALUES
        ('Cleaning classroom', 'Clean classroom 9', 'Steffe', 'Cleaning', 'low', 'todo'),
        ('Build form', 'Build a register form', 'Jakob', 'Coding', 'medium', 'doing'),
        ('Write tests', 'Write tests for the components', 'Joakim', 'Testing', 'high', 'done')
    `;
  }
}

function validateTask(task) {
  const missingFields = requiredFields.filter((field) => !task[field]);

  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  if (!priorities.includes(task.priority)) {
    throw new Error("Priority must be low, medium, or high");
  }

  if (task.status && !statuses.includes(task.status)) {
    throw new Error("Status must be todo, doing, or done");
  }
}

export async function getAllTasks() {
  return sql`
    SELECT id, title, description, assignee, category, priority, status
    FROM tasks
    ORDER BY id
  `;
}

export async function createTask(task) {
  validateTask(task);

  const [newTask] = await sql`
    INSERT INTO tasks (title, description, assignee, category, priority, status)
    VALUES (
      ${task.title},
      ${task.description},
      ${task.assignee},
      ${task.category},
      ${task.priority},
      ${task.status || "todo"}
    )
    RETURNING id, title, description, assignee, category, priority, status
  `;

  return newTask;
}

export async function updateTask(id, changes) {
  if (changes.priority && !priorities.includes(changes.priority)) {
    throw new Error("Priority must be low, medium, or high");
  }

  if (changes.status && !statuses.includes(changes.status)) {
    throw new Error("Status must be todo, doing, or done");
  }

  const [updatedTask] = await sql`
    UPDATE tasks
    SET
      title = COALESCE(${changes.title ?? null}, title),
      description = COALESCE(${changes.description ?? null}, description),
      assignee = COALESCE(${changes.assignee ?? null}, assignee),
      category = COALESCE(${changes.category ?? null}, category),
      priority = COALESCE(${changes.priority ?? null}, priority),
      status = COALESCE(${changes.status ?? null}, status)
    WHERE id = ${id}
    RETURNING id, title, description, assignee, category, priority, status
  `;

  return updatedTask || null;
}

export async function deleteTask(id) {
  const deletedTasks = await sql`
    DELETE FROM tasks
    WHERE id = ${id}
    RETURNING id
  `;

  return deletedTasks.length > 0;
}
