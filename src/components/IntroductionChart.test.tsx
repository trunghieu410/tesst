import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IntroductionChart } from "./IntroductionChart";

// Mock recharts components since they render canvas/SVG
vi.mock("recharts", () => ({
  BarChart: vi.fn(({ children, ...props }) => (
    <div
      data-testid="bar-chart"
      data-data={JSON.stringify(props.data)}
      data-margin={JSON.stringify(props.margin)}
    >
      {children}
    </div>
  )),
  Bar: vi.fn(({ children, ...props }) => (
    <div
      data-testid={`bar-${props.dataKey}`}
      data-data-key={props.dataKey}
      data-fill={props.fill}
      data-radius={JSON.stringify(props.radius)}
      data-bar-size={props.barSize}
    >
      {children}
    </div>
  )),
  XAxis: vi.fn((props) => (
    <div
      data-testid="x-axis"
      data-data-key={props.dataKey}
      data-axis-line={props.axisLine}
      data-tick-line={props.tickLine}
    />
  )),
  YAxis: vi.fn((props) => (
    <div
      data-testid="y-axis"
      data-axis-line={props.axisLine}
      data-tick-line={props.tickLine}
    />
  )),
  CartesianGrid: vi.fn((props) => (
    <div
      data-testid="cartesian-grid"
      data-stroke-dasharray={props.strokeDasharray}
      data-stroke={props.stroke}
      data-vertical={props.vertical}
    />
  )),
  Tooltip: vi.fn((props) => <div data-testid="tooltip" />),
  ResponsiveContainer: vi.fn(({ children, ...props }) => (
    <div
      data-testid="responsive-container"
      data-width={props.width}
      data-height={props.height}
    >
      {children}
    </div>
  )),
  Cell: vi.fn((props) => <div data-testid="cell" />),
}));

const mockData = [
  {
    date: "Jan",
    primary: 1200,
    secondary: 800,
  },
  {
    date: "Feb",
    primary: 1900,
    secondary: 1200,
  },
  {
    date: "Mar",
    primary: 800,
    secondary: 1400,
  },
];

describe("IntroductionChart", () => {
  it("renders without crashing", () => {
    const { container } = render(<IntroductionChart data={mockData} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <IntroductionChart data={mockData} className="custom-chart" />
    );

    expect(container.firstChild).toHaveClass("custom-chart");
  });

  it("renders ResponsiveContainer with correct dimensions", () => {
    render(<IntroductionChart data={mockData} />);

    const responsiveContainer = screen.getByTestId("responsive-container");
    expect(responsiveContainer).toHaveAttribute("data-width", "100%");
    expect(responsiveContainer).toHaveAttribute("data-height", "240");
  });

  it("renders BarChart with correct margin", () => {
    render(<IntroductionChart data={mockData} />);

    const barChart = screen.getByTestId("bar-chart");
    const margin = JSON.parse(barChart.getAttribute("data-margin") || "{}");
    expect(margin).toEqual({ top: 20, right: 30, left: 20, bottom: 5 });
  });

  it("renders CartesianGrid with correct props", () => {
    render(<IntroductionChart data={mockData} />);

    const grid = screen.getByTestId("cartesian-grid");
    expect(grid).toHaveAttribute("data-stroke-dasharray", "0");
    expect(grid).toHaveAttribute("data-stroke", "#d0d5dd");
    expect(grid).toHaveAttribute("data-vertical", "false");
  });

  it("renders XAxis with correct props", () => {
    render(<IntroductionChart data={mockData} />);

    const xAxis = screen.getByTestId("x-axis");
    expect(xAxis).toHaveAttribute("data-data-key", "date");
    expect(xAxis).toHaveAttribute("data-axis-line", "false");
    expect(xAxis).toHaveAttribute("data-tick-line", "false");
  });

  it("renders YAxis with correct props", () => {
    render(<IntroductionChart data={mockData} />);

    const yAxis = screen.getByTestId("y-axis");
    expect(yAxis).toHaveAttribute("data-axis-line", "false");
    expect(yAxis).toHaveAttribute("data-tick-line", "false");
  });

  it("renders primary Bar with correct props", () => {
    render(<IntroductionChart data={mockData} />);

    const primaryBar = screen.getByTestId("bar-primary");
    expect(primaryBar).toHaveAttribute("data-data-key", "primary");
    expect(primaryBar).toHaveAttribute("data-fill", "#677187");
    expect(primaryBar).toHaveAttribute("data-radius", "[2,2,0,0]");
    expect(primaryBar).toHaveAttribute("data-bar-size", "16");
  });

  it("renders secondary Bar with correct props", () => {
    render(<IntroductionChart data={mockData} />);

    const secondaryBar = screen.getByTestId("bar-secondary");
    expect(secondaryBar).toHaveAttribute("data-data-key", "secondary");
    expect(secondaryBar).toHaveAttribute("data-fill", "#ff3b34");
    expect(secondaryBar).toHaveAttribute("data-radius", "[2,2,0,0]");
    expect(secondaryBar).toHaveAttribute("data-bar-size", "16");
  });

  it("renders correct number of Cell components", () => {
    render(<IntroductionChart data={mockData} />);

    const cells = screen.getAllByTestId("cell");
    // 2 bars × 3 data points = 6 cells
    expect(cells).toHaveLength(6);
  });

  it("renders Tooltip", () => {
    render(<IntroductionChart data={mockData} />);

    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
  });

  it("handles empty data array", () => {
    const { container } = render(<IntroductionChart data={[]} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles single data point", () => {
    const singleData = [
      {
        date: "Jan",
        primary: 1000,
        secondary: 800,
      },
    ];

    const { container } = render(<IntroductionChart data={singleData} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles large datasets", () => {
    const largeData = Array.from({ length: 10 }, (_, i) => ({
      date: `Month ${i + 1}`,
      primary: Math.floor(Math.random() * 2000),
      secondary: Math.floor(Math.random() * 2000),
    }));

    const { container } = render(<IntroductionChart data={largeData} />);

    expect(container.firstChild).toBeInTheDocument();

    const cells = screen.getAllByTestId("cell");
    expect(cells).toHaveLength(20); // 2 bars × 10 data points
  });

  it("maintains component structure", () => {
    render(<IntroductionChart data={mockData} />);

    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("bar-primary")).toBeInTheDocument();
    expect(screen.getByTestId("bar-secondary")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });

  it("renders bars with different data keys correctly", () => {
    render(<IntroductionChart data={mockData} />);

    const primaryBar = screen.getByTestId("bar-primary");
    const secondaryBar = screen.getByTestId("bar-secondary");

    expect(primaryBar).toHaveAttribute("data-data-key", "primary");
    expect(secondaryBar).toHaveAttribute("data-data-key", "secondary");
  });

  it("renders bars with different colors correctly", () => {
    render(<IntroductionChart data={mockData} />);

    const primaryBar = screen.getByTestId("bar-primary");
    const secondaryBar = screen.getByTestId("bar-secondary");

    expect(primaryBar).toHaveAttribute("data-fill", "#677187");
    expect(secondaryBar).toHaveAttribute("data-fill", "#ff3b34");
  });

  it("handles data with zero values", () => {
    const dataWithZeros = [
      ...mockData,
      {
        date: "Apr",
        primary: 0,
        secondary: 0,
      },
    ];

    const { container } = render(<IntroductionChart data={dataWithZeros} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles data with negative values", () => {
    const dataWithNegatives = [
      ...mockData,
      {
        date: "Apr",
        primary: -500,
        secondary: -200,
      },
    ];

    const { container } = render(<IntroductionChart data={dataWithNegatives} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
