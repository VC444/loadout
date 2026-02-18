import { render, screen } from "@testing-library/react";
import LandingPage from "../../app/page";

// Mock next/link since it requires router context
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

// Mock lucide-react icons to avoid SVG rendering issues
jest.mock("lucide-react", () => ({
  Mic: () => <span data-testid="icon-mic" />,
  PenTool: () => <span data-testid="icon-pentool" />,
  Brain: () => <span data-testid="icon-brain" />,
  ArrowRight: () => <span data-testid="icon-arrow" />,
}));

describe("LandingPage", () => {
  it("renders the hero heading", () => {
    render(<LandingPage />);
    expect(
      screen.getByText(/Practice System Design Interviews with AI/i),
    ).toBeInTheDocument();
  });

  it("renders start interview CTA buttons", () => {
    render(<LandingPage />);
    const buttons = screen.getAllByText(/Start.*Interview/i);
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the feature section", () => {
    render(<LandingPage />);
    expect(screen.getByText(/Talk Out Loud/i)).toBeInTheDocument();
    expect(screen.getByText(/Draw While You Talk/i)).toBeInTheDocument();
  });

  it("has links to /interview", () => {
    render(<LandingPage />);
    const links = document.querySelectorAll('a[href="/interview"]');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the footer with GitHub link", () => {
    render(<LandingPage />);
    expect(screen.getByText(/Contribute on GitHub/i)).toBeInTheDocument();
  });
});
