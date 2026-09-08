import Column from "./Components/Column";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import NewTaskForm from "./Components/NewTaskForm";
import TaskCard from "./Components/TaskCard";
import type { Task } from "./types/Task";

function App() {
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const doingTasks = tasks.filter((task) => task.status === "doing");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="app-shell">
      <Header></Header>
      <main>
        <NewTaskForm></NewTaskForm>
        <section className="task-board">
          <Column title="ToDo">
            {todoTasks.map((tasks) => (
              <TaskCard
                key={tasks.id}
                id={tasks.id}
                title={tasks.title}
                description={tasks.description}
                assignee={tasks.assignee}
                category={tasks.category}
                priority={tasks.priority}
              ></TaskCard>
            ))}
          </Column>
          <Column title="Doing">
            {doingTasks.map((tasks) => (
              <TaskCard
                key={tasks.id}
                id={tasks.id}
                title={tasks.title}
                description={tasks.description}
                assignee={tasks.assignee}
                category={tasks.category}
                priority={tasks.priority}
              ></TaskCard>
            ))}
          </Column>
          <Column title="Done">
            {doneTasks.map((tasks) => (
              <TaskCard
                key={tasks.id}
                id={tasks.id}
                title={tasks.title}
                description={tasks.description}
                assignee={tasks.assignee}
                category={tasks.category}
                priority={tasks.priority}
              ></TaskCard>
            ))}
          </Column>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}
const tasks: Task[] = [
  {
    id: 1,
    title: "Cleaning classroom",
    description: "Clean classroom 9",
    assignee: "Steffe",
    category: "Cleaning",
    priority: "low",
    status: "todo",
  },
  {
    id: 2,
    title: "Build form",
    description: "Build a register form",
    assignee: "Jakob",
    category: "Coding",
    priority: "medium",
    status: "doing",
  },
  {
    id: 3,
    title: "Write tests",
    description: "Write tests for the components",
    assignee: "Joakim",
    category: "Testing",
    priority: "high",
    status: "done",
  },
  {
    id: 4,
    title: "Plan weekly meeting",
    description: "Prepare the agenda for the weekly meeting",
    assignee: "Sara",
    category: "Planning",
    priority: "medium",
    status: "todo",
  },
  {
    id: 5,
    title: "Update documentation",
    description: "Add instructions for using the task board",
    assignee: "Alex",
    category: "Documentation",
    priority: "low",
    status: "todo",
  },
  {
    id: 6,
    title: "Review design",
    description: "Review the new board layout",
    assignee: "Nora",
    category: "Design",
    priority: "high",
    status: "doing",
  },
  {
    id: 7,
    title: "Connect task data",
    description: "Connect the task array to the task cards",
    assignee: "Linus",
    category: "Coding",
    priority: "high",
    status: "doing",
  },
  {
    id: 8,
    title: "Test task filters",
    description: "Check that tasks can be filtered by status",
    assignee: "Maja",
    category: "Testing",
    priority: "medium",
    status: "done",
  },
  {
    id: 9,
    title: "Fix mobile layout",
    description: "Make the task board work on smaller screens",
    assignee: "Oskar",
    category: "Design",
    priority: "medium",
    status: "done",
  },
];

export default App;
