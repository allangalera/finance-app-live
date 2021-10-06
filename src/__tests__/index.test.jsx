import React from "react";
import { screen } from "@testing-library/react";
import { renderWithProviders } from ".";
import Home from "../pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    renderWithProviders(<Home />);

    const heading = screen.getByRole("heading", {
      name: /finance app/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
