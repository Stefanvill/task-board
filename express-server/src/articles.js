const tasks = [
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
];

let nextId = 4;

const requiredFields = [
  "title",
  "description",
  "assignee",
  "category",
  "priority",
];
const priorities = ["low", "medium", "high"];
const statuses = ["todo", "doing", "done"];

export function getAllTasks() {
  return tasks;
}

export function createTask(task) {
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

  const newTask = {
    ...task,
    id: nextId,
    status: task.status || "todo",
  };

  tasks.push(newTask);
  nextId += 1;

  return newTask;
}

export function updateTask(id, changes) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return null;
  }

  if (changes.priority && !priorities.includes(changes.priority)) {
    return null;
  }

  if (changes.status && !statuses.includes(changes.status)) {
    return null;
  }

  Object.assign(task, changes, { id });
  return task;
}

export function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);
  return true;
}
