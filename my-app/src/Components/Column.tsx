import type { ReactNode } from "react";

type ColumnProps = {
  title: string;
  children: ReactNode;
};

function Column({ title, children }: ColumnProps) {
  return (
    <section className="column">
      <h3>{title}</h3>
      {children}
    </section>
  );
}
export default Column;
