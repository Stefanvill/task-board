import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../Components/Header";

describe("Header", () => {
  it("visar sidans huvudrubrik", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", { name: "Steff's site" }),
    ).toBeInTheDocument();
  });

  it("visar den korta introduktionstexten", () => {
    render(<Header />);

    expect(
      screen.getByText("Short description of my new site"),
    ).toBeInTheDocument();
  });
});
