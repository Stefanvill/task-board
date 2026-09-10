import { useEffect, useState } from "react";
 import { Route, Routes } from "react-router-dom";
import Column from "./Components/Column";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NewTaskForm from "./Components/NewTaskForm";
import TaskCard from "./Components/TaskCard";
import type { Task } from "./types/Task";

const API_URL = "http://localhost:3005/api/tasks";

type TaskBoardProps = {
  tasks: Task[];
};

function TaskBoard({ tasks }: TaskBoardProps) {
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <section className="task-board">
      <Column title="ToDo">
        {todoTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </Column>

      <Column title="Doing">
        {doingTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </Column>

      <Column title="Done">
        {doneTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </Column>
    </section>
  );
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");

  // useEffect kör kod efter att komponenten har renderats, vilket passar när uppgifter ska hämtas från backend.
  useEffect(() => {
    // Funktionen är async eftersom den väntar på ett svar från backend med await.
    async function loadTasks() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Could not load tasks");
        }

        const data: Task[] = await response.json();
        setTasks(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
      }
    }
    // useEffect körs en gång när komponenten monteras eftersom beroendelistan är tom. Då anropas loadTasks.
    loadTasks();
  }, []);

  // async behövs eftersom funktionen väntar på POST-svaret. Omit tar bort id och status eftersom backend skapar dessa värden.
  async function handleCreateTask(taskData: Omit<Task, "id" | "status">) {
    // Ja, POST anger att en ny uppgift ska skickas och skapas på backend.
    const response = await fetch(API_URL, {
      method: "POST",
      // Headers berättar för backend att requestens body innehåller JSON-data.
      headers: {
        "Content-Type": "application/json",
      },
      // JSON.stringify omvandlar JavaScript-objektet till text som kan skickas i requesten.
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Could not create task");
    }

    // Läs den skapade uppgiften från backend, inklusive dess nya id och status.
    const newTask: Task = await response.json();
    setTasks((currentTasks) => [...currentTasks, newTask]);
  }

  return (
    <div className="app-shell">
      <Header />

      <main>
        {error && <p>{error}</p>}

        <Routes>
          <Route path="/" element={<TaskBoard tasks={tasks} />} />
          <Route
            path="/new"
            element={<NewTaskForm onCreateTask={handleCreateTask} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
