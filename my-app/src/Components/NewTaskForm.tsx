import { useState } from "react";

function NewTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      title,
      description,
      assignee,
      category,
      priority,
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      ></textarea>
      <input
        value={assignee}
        onChange={(event) => setAssignee(event.target.value)}
        required
      />
      <input
        type="text"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        required
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
        required
      >
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewTaskForm;
