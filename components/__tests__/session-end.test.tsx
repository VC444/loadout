import { render, screen } from "@testing-library/react";
import SessionEndPage from "../../app/session-end/page";

describe("SessionEndPage", () => {
  it("renders the completion heading", () => {
    render(<SessionEndPage />);
    expect(screen.getByText(/Interview Session Complete/i)).toBeInTheDocument();
  });

  it("renders the congratulatory message", () => {
    render(<SessionEndPage />);
    expect(
      screen.getByText(/Great work.*completed the interview/i),
    ).toBeInTheDocument();
  });
});
