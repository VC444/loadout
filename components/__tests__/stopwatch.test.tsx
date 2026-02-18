import { render, screen, act } from "@testing-library/react";
import Stopwatch from "../stopwatch";

describe("Stopwatch", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders initial time as 00:00", () => {
    render(<Stopwatch />);
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("increments seconds", () => {
    render(<Stopwatch />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText("00:05")).toBeInTheDocument();
  });

  it("rolls over to minutes", () => {
    render(<Stopwatch />);

    act(() => {
      jest.advanceTimersByTime(65_000);
    });

    expect(screen.getByText("01:05")).toBeInTheDocument();
  });

  it("pads single-digit values with leading zeroes", () => {
    render(<Stopwatch />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText("00:03")).toBeInTheDocument();
  });
});
