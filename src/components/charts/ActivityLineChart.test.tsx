import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ActivityLineChart } from "./ActivityLineChart";

// Mock recharts components since they render canvas/SVG
vi.mock("recharts", () => ({
  AreaChart: vi.fn(({ children, ...props }) => (
    <div
      data-testid="area-chart"
      data-data={JSON.stringify(props.data)}
      data-margin={JSON.stringify(props.margin)}
    >
      {children}
    </div>
  )),
  Area: vi.fn((props) => (
    <div
      data-testid="area"
      data-type={props.type}
      data-data-key={props.dataKey}
      data-stroke={props.stroke}
      data-stroke-width={props.strokeWidth}
      data-fill-opacity={props.fillOpacity}
    />
  )),
  XAxis: vi.fn((props) => (
    <div
      data-testid="x-axis"
      data-hide={props.hide}
      data-data-key={props.dataKey}
    />
  )),
  YAxis: vi.fn((props) => (
    <div
      data-testid="y-axis"
      data-hide={props.hide}
    />
  )),
  CartesianGrid: vi.fn((props) => (
    <div
      data-testid="cartesian-grid"
      data-stroke-dasharray={props.strokeDasharray}
      data-stroke={props.stroke}
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
}));

const mockData = [
  { date: "2024-01-01", value: 10 },
  { date: "2024-01-02", value: 20 },
  { date: "2024-01-03", value: 15 },
];

describe("ActivityLineChart", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ActivityLineChart data={mockData} color="#ff0000" />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <ActivityLineChart
        data={mockData}
        color="#ff0000"
        className="custom-chart"
      />
    );

    expect(container.firstChild).toHaveClass("custom-chart");
  });

  it("passes data to AreaChart", () => {
    render(<ActivityLineChart data={mockData} color="#ff0000" />);

    const areaChart = screen.getByTestId("area-chart");
    expect(areaChart).toBeInTheDocument();
  });

  it("renders ResponsiveContainer with correct props", () => {
    render(<ActivityLineChart data={mockData} color="#ff0000" />);

    const responsiveContainer = screen.getByTestId("responsive-container");
    expect(responsiveContainer).toHaveAttribute("data-width", "100%");
    expect(responsiveContainer).toHaveAttribute("data-height", "100");
  });

  it("renders Area with correct props", () => {
    const color = "#00ff00";
    render(<ActivityLineChart data={mockData} color={color} />);

    const area = screen.getByTestId("area");
    expect(area).toHaveAttribute("data-type", "monotone");
    expect(area).toHaveAttribute("data-data-key", "value");
    expect(area).toHaveAttribute("data-stroke", color);
    expect(area).toHaveAttribute("data-stroke-width", "2");
    expect(area).toHaveAttribute("data-fill-opacity", "1");
  });

  it("renders gradient definition", () => {
    const color = "#0000ff";
    render(<ActivityLineChart data={mockData} color={color} />);

    // Check that the gradient is defined in the defs
    const areaChart = screen.getByTestId("area-chart");
    expect(areaChart.innerHTML).toContain(`gradient-${color}`);
  });

  it("renders XAxis with correct props", () => {
    render(<ActivityLineChart data={mockData} color="#ff0000" />);

    const xAxis = screen.getByTestId("x-axis");
    expect(xAxis).toHaveAttribute("data-hide", "true");
    expect(xAxis).toHaveAttribute("data-data-key", "date");
  });

  it("renders YAxis with correct props", () => {
    render(<ActivityLineChart data={mockData} color="#ff0000" />);

    const yAxis = screen.getByTestId("y-axis");
    expect(yAxis).toHaveAttribute("data-hide", "true");
  });

  it("renders CartesianGrid with correct props", () => {
    render(<ActivityLineChart data={mockData} color="#ff0000" />);

    const grid = screen.getByTestId("cartesian-grid");
    expect(grid).toHaveAttribute("data-stroke-dasharray", "0");
    expect(grid).toHaveAttribute("data-stroke", "transparent");
  });

  it("renders Tooltip by default", () => {
    render(<ActivityLineChart data={mockData} color="#ff0000" />);

    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
  });

  it("does not render Tooltip when showTooltip is false", () => {
    render(
      <ActivityLineChart data={mockData} color="#ff0000" showTooltip={false} />
    );

    const tooltip = screen.queryByTestId("tooltip");
    expect(tooltip).not.toBeInTheDocument();
  });

  it("passes correct margin to AreaChart", () => {
    render(<ActivityLineChart data={mockData} color="#ff0000" />);

    const areaChart = screen.getByTestId("area-chart");
    const margin = JSON.parse(areaChart.getAttribute("data-margin") || "{}");
    expect(margin).toEqual({ top: 5, right: 0, left: 0, bottom: 5 });
  });

  it("handles empty data array", () => {
    const { container } = render(
      <ActivityLineChart data={[]} color="#ff0000" />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles single data point", () => {
    const singleData = [{ date: "2024-01-01", value: 10 }];
    const { container } = render(
      <ActivityLineChart data={singleData} color="#ff0000" />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with different colors", () => {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];

    colors.forEach((color) => {
      const { container } = render(
        <ActivityLineChart data={mockData} color={color} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it("maintains component structure", () => {
    render(<ActivityLineChart data={mockData} color="#ff0000" />);

    // Check that all expected components are rendered
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("area-chart")).toBeInTheDocument();
    expect(screen.getByTestId("area")).toBeInTheDocument();
    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("cartesian-grid")).toBeInTheDocument();
  });

  it("renders multiple data points correctly", () => {
    const multipleData = Array.from({ length: 10 }, (_, i) => ({
      date: `2024-01-${String(i + 1).padStart(2, "0")}`,
      value: Math.random() * 100,
    }));

    const { container } = render(
      <ActivityLineChart data={multipleData} color="#ff0000" />
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
