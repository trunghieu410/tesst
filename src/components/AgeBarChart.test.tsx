import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AgeBarChart } from "./AgeBarChart";

const mockData = [
  {
    label: "18-24",
    value: 25,
    percentage: "25%",
    count: "(125)",
  },
  {
    label: "25-34",
    value: 40,
    percentage: "40%",
    count: "(200)",
  },
  {
    label: "35-44",
    value: 20,
    percentage: "20%",
    count: "(100)",
  },
];

describe("AgeBarChart", () => {
  it("renders without crashing", () => {
    const { container } = render(<AgeBarChart data={mockData} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <AgeBarChart data={mockData} className="custom-chart" />
    );

    expect(container.firstChild).toHaveClass("custom-chart");
  });

  it("renders correct number of items", () => {
    render(<AgeBarChart data={mockData} />);

    const labels = screen.getAllByText(/18-24|25-34|35-44/);
    expect(labels).toHaveLength(3);
  });

  it("renders labels correctly", () => {
    render(<AgeBarChart data={mockData} />);

    expect(screen.getByText("18-24")).toBeInTheDocument();
    expect(screen.getByText("25-34")).toBeInTheDocument();
    expect(screen.getByText("35-44")).toBeInTheDocument();
  });

  it("renders percentages correctly", () => {
    render(<AgeBarChart data={mockData} />);

    expect(screen.getByText("25%")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("renders counts correctly", () => {
    render(<AgeBarChart data={mockData} />);

    expect(screen.getByText("(125)")).toBeInTheDocument();
    expect(screen.getByText("(200)")).toBeInTheDocument();
    expect(screen.getByText("(100)")).toBeInTheDocument();
  });

  it("calculates bar widths based on max value", () => {
    render(<AgeBarChart data={mockData} />);

    // The max value is 40, so:
    // 25/40 = 62.5%, 40/40 = 100%, 20/40 = 50%
    const bars = document.querySelectorAll('[style*="width"]');
    expect(bars).toHaveLength(3);
  });

  it("renders bar segments", () => {
    render(<AgeBarChart data={mockData} />);

    // Check that bar segments are rendered
    const segments = document.querySelectorAll('[class*="bg-[#021337]"]');
    expect(segments.length).toBeGreaterThan(0);
  });

  it("applies correct base container classes", () => {
    const { container } = render(<AgeBarChart data={mockData} />);

    expect(container.firstChild).toHaveClass("flex", "flex-col", "gap-3");
  });

  it("renders each item with correct structure", () => {
    render(<AgeBarChart data={mockData} />);

    const items = document.querySelectorAll('[class*="flex flex-col gap-[2px]"]');
    expect(items).toHaveLength(3);

    items.forEach((item) => {
      // Each item should have a label, bar container, percentage, and count
      const label = item.querySelector('p[class*="text-[13px]"]');
      const percentage = item.querySelector('p[class*="min-w-[42px]"]');
      const count = item.querySelector('p[class*="min-w-[45px]"]');

      expect(label).toBeInTheDocument();
      expect(percentage).toBeInTheDocument();
      expect(count).toBeInTheDocument();
    });
  });

  it("handles empty data array", () => {
    const { container } = render(<AgeBarChart data={[]} />);

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.children).toHaveLength(0);
  });

  it("handles single data point", () => {
    const singleData = [
      {
        label: "25-34",
        value: 100,
        percentage: "100%",
        count: "(500)",
      },
    ];

    render(<AgeBarChart data={singleData} />);

    expect(screen.getByText("25-34")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("(500)")).toBeInTheDocument();
  });

  it("handles zero values correctly", () => {
    const dataWithZero = [
      ...mockData,
      {
        label: "0-17",
        value: 0,
        percentage: "0%",
        count: "(0)",
      },
    ];

    render(<AgeBarChart data={dataWithZero} />);

    expect(screen.getByText("0-17")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("(0)")).toBeInTheDocument();
  });

  it("handles large datasets", () => {
    const largeData = Array.from({ length: 10 }, (_, i) => ({
      label: `${i * 10}-${(i + 1) * 10}`,
      value: Math.random() * 100,
      percentage: `${Math.floor(Math.random() * 100)}%`,
      count: `(${Math.floor(Math.random() * 1000)})`,
    }));

    render(<AgeBarChart data={largeData} />);

    const labels = screen.getAllByText(/\d+-\d+/);
    expect(labels).toHaveLength(10);
  });

  it("applies correct text styling", () => {
    render(<AgeBarChart data={mockData} />);

    const labels = screen.getAllByText(/18-24|25-34|35-44/);
    labels.forEach((label) => {
      expect(label).toHaveClass("text-[13px]", "font-normal", "leading-4", "text-[#021337]");
    });

    const percentages = screen.getAllByText(/\d+%/);
    percentages.forEach((percentage) => {
      expect(percentage).toHaveClass("text-[13px]", "font-normal", "leading-5", "text-[#021337]", "min-w-[42px]");
    });

    const counts = screen.getAllByText(/\(\d+\)/);
    counts.forEach((count) => {
      expect(count).toHaveClass("text-[13px]", "font-normal", "leading-4", "text-[#677187]", "min-w-[45px]");
    });
  });

  it("renders bar container with correct styling", () => {
    render(<AgeBarChart data={mockData} />);

    const barContainers = document.querySelectorAll('[class*="flex-1 h-[15px] bg-transparent"]');
    expect(barContainers).toHaveLength(3);

    barContainers.forEach((container) => {
      expect(container).toHaveClass("flex-1", "h-[15px]", "bg-transparent", "relative", "flex", "items-center");
    });
  });

  it("renders bar segments with correct styling", () => {
    render(<AgeBarChart data={mockData} />);

    const segments = document.querySelectorAll('[class*="w-[13.85px] h-[15px] bg-[#021337]"]');
    expect(segments.length).toBeGreaterThan(0);

    segments.forEach((segment) => {
      expect(segment).toHaveClass("w-[13.85px]", "h-[15px]", "bg-[#021337]");
    });
  });
});
