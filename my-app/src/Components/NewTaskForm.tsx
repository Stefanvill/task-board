import { useState } from "react";
import type { Task } from "../types/Task";

type NewTaskFormProps = {
  // Omit tar bort id och status eftersom backend skapar dessa värden. Promise<void> betyder att funktionen är asynkron och inte returnerar någon data till formuläret.
  onCreateTask: (task: Omit<Task, "id" | "status">) => Promise<void>;
};

function NewTaskForm({ onCreateTask }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<
    "low" | "medium" | "high" | ""
    // Tom string som start tills användaren valt en prioritet
  >("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    // Förhindra att webbläsaren laddar om sidan och ta bort eventuella fel från föregående försök.
    event.preventDefault();
    setError("");

    // Try-blocket hanterar denna förfrågan för att potentielt catcha en error
    // Await för att det ska ske en handskaknign mellan användaren och backend som visar ett godkännande eller error
    try {
      await onCreateTask({
        title,
        description,
        assignee,
        category,
        priority: priority as "low" | "medium" | "high",
      });
      // Töm formuläret efter ett lyckat försök så att det är redo för nästa uppgift.
      setTitle("");
      setDescription("");
      setAssignee("");
      setCategory("");
      setPriority("");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not create task",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <input
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />

      <input
        placeholder="Assignee"
        value={assignee}
        onChange={(event) => setAssignee(event.target.value)}
        required
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        required
      />

      <select
        value={priority}
        onChange={(event) =>
          setPriority(event.target.value as "low" | "medium" | "high")
        }
        required
      >
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Submit</button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default NewTaskForm;
