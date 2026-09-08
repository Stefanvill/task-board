type TaskCardProps = {
  title: string;
  id: number;
  description: string;
  assignee: string;
  category: string;
  priority: string;
};

function TaskCard({
  title,
  description,
  assignee,
  category,
  priority,
}: TaskCardProps) {
  return (
    <article className="task-card">
      <h3>Category: {category}</h3>
      <p>{title}</p>
      <p>{description}</p>
      <p>ansvarig: {assignee}</p>
      <p>Priority: {priority}</p>
    </article>
  );
}
export default TaskCard;
