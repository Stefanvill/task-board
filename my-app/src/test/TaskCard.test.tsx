// Testet ska kontrollera att kortet visar:
// id
// kategori
// titel
// beskrivning
// ansvarig person
// prioritet

import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import TaskCard from "../Components/TaskCard";

describe("TaskCard", () => {
  beforeEach(() => {
    render(
      <TaskCard
        id={1}
        category="Category"
        title="Title"
        description="Description"
        assignee="Assignee"
        priority="Priority"
      />,
    );
  });

  it("Shows Category", () => {
    expect(
      screen.getByRole("heading", { name: "Category: Category" }),
    ).toBeInTheDocument();
  });
  it("Shows Title", () => {
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
  it("Shows Description", () => {
    expect(screen.getByText("Description")).toBeInTheDocument();
  });
  it("Shows assignee", () => {
    expect(screen.getByText("ansvarig: Assignee")).toBeInTheDocument();
  });
  it("Shows Priority", () => {
    expect(screen.getByText("Priority: Priority")).toBeInTheDocument();
  });
});
