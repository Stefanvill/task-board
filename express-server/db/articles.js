import { neon } from "@neondatabase/serverless";
import "dotenv/config";

//Db delen hade jag jätte svårt att lösa så fick mycket hjälp av ai på denna del

const sql = neon(process.env.DATABASE_URL);

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

  const result = await sql`SELECT COUNT(*)::int AS count FROM tasks`;

  if (result[0].count === 0) {
    await sql`
      INSERT INTO tasks (title, description, assignee, category, priority, status)
      VALUES
        ('Cleaning classroom', 'Clean classroom 9', 'Steffe', 'Cleaning', 'low', 'todo'),
        ('Build form', 'Build a register form', 'Jakob', 'Coding', 'medium', 'doing'),
        ('Write tests', 'Write tests for the components', 'Joakim', 'Testing', 'high', 'done')
    `;
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

  return updatedTask;
}

export async function deleteTask(id) {
  const deletedTasks = await sql`
    DELETE FROM tasks
    WHERE id = ${id}
    RETURNING id
  `;

  return deletedTasks.length > 0;
}
