export type Task = {
  id: number;
  title: string;
  description: string;
  assignee: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "doing" | "done";
};
