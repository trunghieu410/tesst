import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { KYCStatsGrid } from "./KYCStatsGrid";

// Mock CompactStatsCard
vi.mock("@/components/ui/StatsCard", () => ({
  CompactStatsCard: vi.fn(({
    label,
    value,
    percentage,
    valueColor,
    className
  }) => (
    <div
      data-testid={`compact-stats-card-${label.replace(/\s+/g, '-').toLowerCase()}`}
      data-label={label}
      data-value={value}
      data-percentage={percentage}
      data-value-color={valueColor}
      className={className}
    >
      <div>{label}</div>
      <div>{value}</div>
      <div>{percentage}</div>
    </div>
  )),
}));

const mockStats = {
  approved: { value: 1250, percentage: "+12.5%" },
  notDone: { value: 340, percentage: "-5.2%" },
  pending: { value: 89, percentage: "+3.1%" },
  rejected: { value: 23, percentage: "-1.8%" },
};

describe("KYCStatsGrid", () => {
  it("renders without crashing", () => {
    const { container } = render(<KYCStatsGrid stats={mockStats} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <KYCStatsGrid stats={mockStats} className="custom-grid" />
    );

    expect(container.firstChild).toHaveClass("custom-grid");
  });

  it("renders all four CompactStatsCard components", () => {
    render(<KYCStatsGrid stats={mockStats} />);

    expect(screen.getByTestId("compact-stats-card-đã-duyệt")).toBeInTheDocument();
    expect(screen.getByTestId("compact-stats-card-chưa-làm")).toBeInTheDocument();
    expect(screen.getByTestId("compact-stats-card-chờ-duyệt")).toBeInTheDocument();
    expect(screen.getByTestId("compact-stats-card-từ-chối")).toBeInTheDocument();
  });

  it("renders approved stats card with correct props", () => {
    render(<KYCStatsGrid stats={mockStats} />);

    const approvedCard = screen.getByTestId("compact-stats-card-đã-duyệt");
    expect(approvedCard).toHaveAttribute("data-label", "Đã duyệt");
    expect(approvedCard).toHaveAttribute("data-value", "1,250");
    expect(approvedCard).toHaveAttribute("data-percentage", "+12.5%");
    expect(approvedCard).toHaveAttribute("data-value-color", "positive");
  });

  it("renders not done stats card with correct props", () => {
    render(<KYCStatsGrid stats={mockStats} />);

    const notDoneCard = screen.getByTestId("compact-stats-card-chưa-làm");
    expect(notDoneCard).toHaveAttribute("data-label", "Chưa làm");
    expect(notDoneCard).toHaveAttribute("data-value", "340");
    expect(notDoneCard).toHaveAttribute("data-percentage", "-5.2%");
    expect(notDoneCard).toHaveAttribute("data-value-color", "default");
  });

  it("renders pending stats card with correct props", () => {
    render(<KYCStatsGrid stats={mockStats} />);

    const pendingCard = screen.getByTestId("compact-stats-card-chờ-duyệt");
    expect(pendingCard).toHaveAttribute("data-label", "Chờ duyệt");
    expect(pendingCard).toHaveAttribute("data-value", "89");
    expect(pendingCard).toHaveAttribute("data-percentage", "+3.1%");
    expect(pendingCard).toHaveAttribute("data-value-color", "warning");
  });

  it("renders rejected stats card with correct props", () => {
    render(<KYCStatsGrid stats={mockStats} />);

    const rejectedCard = screen.getByTestId("compact-stats-card-từ-chối");
    expect(rejectedCard).toHaveAttribute("data-label", "Từ chối");
    expect(rejectedCard).toHaveAttribute("data-value", "23");
    expect(rejectedCard).toHaveAttribute("data-percentage", "-1.8%");
    expect(rejectedCard).toHaveAttribute("data-value-color", "negative");
  });

  it("renders first row with correct layout", () => {
    const { container } = render(<KYCStatsGrid stats={mockStats} />);

    const firstRow = container.querySelector('[class*="flex gap-2.5"]');
    expect(firstRow).toBeInTheDocument();

    const cardsInFirstRow = firstRow?.querySelectorAll('[data-testid*="compact-stats-card"]');
    expect(cardsInFirstRow).toHaveLength(2);
  });

  it("renders second row with correct layout", () => {
    const { container } = render(<KYCStatsGrid stats={mockStats} />);

    const secondRow = container.querySelector('[class*="flex gap-2.5 mt-3"]');
    expect(secondRow).toBeInTheDocument();

    const cardsInSecondRow = secondRow?.querySelectorAll('[data-testid*="compact-stats-card"]');
    expect(cardsInSecondRow).toHaveLength(2);
  });

  it("applies correct classes to all cards", () => {
    render(<KYCStatsGrid stats={mockStats} />);

    const cards = screen.getAllByTestId(/compact-stats-card/);
    cards.forEach((card) => {
      expect(card).toHaveClass(
        "flex-1",
        "border-[0.5px]",
        "border-[#d0d5dd]",
        "rounded-md"
      );
    });
  });

  it("formats large numbers correctly", () => {
    const largeStats = {
      ...mockStats,
      approved: { value: 1250000, percentage: "+25.0%" },
    };

    render(<KYCStatsGrid stats={largeStats} />);

    const approvedCard = screen.getByTestId("compact-stats-card-đã-duyệt");
    expect(approvedCard).toHaveAttribute("data-value", "1,250,000");
  });

  it("handles zero values correctly", () => {
    const zeroStats = {
      approved: { value: 0, percentage: "0%" },
      notDone: { value: 0, percentage: "0%" },
      pending: { value: 0, percentage: "0%" },
      rejected: { value: 0, percentage: "0%" },
    };

    render(<KYCStatsGrid stats={zeroStats} />);

    const approvedCard = screen.getByTestId("compact-stats-card-đã-duyệt");
    expect(approvedCard).toHaveAttribute("data-value", "0");
  });

  it("handles negative values correctly", () => {
    const negativeStats = {
      ...mockStats,
      approved: { value: -100, percentage: "-10%" },
    };

    render(<KYCStatsGrid stats={negativeStats} />);

    const approvedCard = screen.getByTestId("compact-stats-card-đã-duyệt");
    expect(approvedCard).toHaveAttribute("data-value", "-100");
  });

  it("renders all labels correctly", () => {
    render(<KYCStatsGrid stats={mockStats} />);

    expect(screen.getByText("Đã duyệt")).toBeInTheDocument();
    expect(screen.getByText("Chưa làm")).toBeInTheDocument();
    expect(screen.getByText("Chờ duyệt")).toBeInTheDocument();
    expect(screen.getByText("Từ chối")).toBeInTheDocument();
  });

  it("renders all percentages correctly", () => {
    render(<KYCStatsGrid stats={mockStats} />);

    expect(screen.getByText("+12.5%")).toBeInTheDocument();
    expect(screen.getByText("-5.2%")).toBeInTheDocument();
    expect(screen.getByText("+3.1%")).toBeInTheDocument();
    expect(screen.getByText("-1.8%")).toBeInTheDocument();
  });

  it("maintains proper grid structure", () => {
    const { container } = render(<KYCStatsGrid stats={mockStats} />);

    // Should have main container
    expect(container.firstChild).toBeInTheDocument();

    // Should have two rows
    const rows = container.querySelectorAll('[class*="flex gap-2.5"]');
    expect(rows).toHaveLength(2);

    // Each row should have two cards
    rows.forEach((row) => {
      const cards = row.querySelectorAll('[data-testid*="compact-stats-card"]');
      expect(cards).toHaveLength(2);
    });
  });

  it("handles different percentage formats", () => {
    const variedStats = {
      approved: { value: 100, percentage: "10.5%" },
      notDone: { value: 200, percentage: "-15.2%" },
      pending: { value: 300, percentage: "+0.1%" },
      rejected: { value: 400, percentage: "0%" },
    };

    render(<KYCStatsGrid stats={variedStats} />);

    expect(screen.getByText("10.5%")).toBeInTheDocument();
    expect(screen.getByText("-15.2%")).toBeInTheDocument();
    expect(screen.getByText("+0.1%")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});
