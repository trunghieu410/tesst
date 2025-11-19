import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { GenderPieChart } from "./GenderPieChart";

// Mock recharts components since they render canvas/SVG
vi.mock("recharts", () => ({
  PieChart: vi.fn((props) => (
    <div data-testid="pie-chart" data-cx={props.cx} data-cy={props.cy}>
      {props.children}
    </div>
  )),
  Pie: vi.fn(({ children, ...props }) => (
    <div
      data-testid="pie"
      data-data={JSON.stringify(props.data)}
      data-data-key={props.dataKey}
      data-outer-radius={props.outerRadius}
      data-inner-radius={props.innerRadius}
      data-padding-angle={props.paddingAngle}
      data-cx={props.cx}
      data-cy={props.cy}
    >
      {children}
    </div>
  )),
  Cell: vi.fn((props) => (
    <div
      data-testid="cell"
      data-fill={props.fill}
    />
  )),
  ResponsiveContainer: vi.fn(({ children, ...props }) => (
    <div
      data-testid="responsive-container"
      data-width={props.width}
      data-height={props.height}
    >
      {children}
    </div>
  )),
  Tooltip: vi.fn((props) => <div data-testid="tooltip" />),
}));

const mockData = [
  {
    name: "Male",
    value: 650,
    percentage: "65%",
    color: "#FF6B6B",
  },
  {
    name: "Female",
    value: 350,
    percentage: "35%",
    color: "#4ECDC4",
  },
];

describe("GenderPieChart", () => {
  it("renders without crashing", () => {
    const { container } = render(<GenderPieChart data={mockData} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <GenderPieChart data={mockData} className="custom-chart" />
    );

    expect(container.firstChild).toHaveClass("custom-chart");
  });

  it("renders ResponsiveContainer with correct dimensions", () => {
    render(<GenderPieChart data={mockData} />);

    const responsiveContainer = screen.getByTestId("responsive-container");
    expect(responsiveContainer).toHaveAttribute("data-width", "100%");
    expect(responsiveContainer).toHaveAttribute("data-height", "100%");
  });

  it("renders Pie with correct center coordinates", () => {
    render(<GenderPieChart data={mockData} />);

    const pie = screen.getByTestId("pie");
    expect(pie).toHaveAttribute("data-cx", "50%");
    expect(pie).toHaveAttribute("data-cy", "50%");
  });

  it("renders Pie with correct props", () => {
    render(<GenderPieChart data={mockData} />);

    const pie = screen.getByTestId("pie");
    expect(pie).toHaveAttribute("data-data-key", "value");
    expect(pie).toHaveAttribute("data-outer-radius", "75");
    expect(pie).toHaveAttribute("data-inner-radius", "45");
    expect(pie).toHaveAttribute("data-padding-angle", "2");
  });

  it("renders correct number of Cell components", () => {
    render(<GenderPieChart data={mockData} />);

    const cells = screen.getAllByTestId("cell");
    expect(cells).toHaveLength(2);
  });

  it("renders Cell components with correct colors", () => {
    render(<GenderPieChart data={mockData} />);

    const cells = screen.getAllByTestId("cell");
    expect(cells[0]).toHaveAttribute("data-fill", "#FF6B6B");
    expect(cells[1]).toHaveAttribute("data-fill", "#4ECDC4");
  });

  it("renders Tooltip", () => {
    render(<GenderPieChart data={mockData} />);

    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toBeInTheDocument();
  });

  it("renders correct base container classes", () => {
    const { container } = render(<GenderPieChart data={mockData} />);

    expect(container.firstChild).toHaveClass("flex", "gap-4", "items-center", "justify-center");
  });

  it("renders chart container with correct classes", () => {
    render(<GenderPieChart data={mockData} />);

    const chartContainer = document.querySelector('[class*="flex flex-col gap-2.5 shrink-0"]');
    expect(chartContainer).toBeInTheDocument();
  });

  it("renders legend with correct number of items", () => {
    render(<GenderPieChart data={mockData} />);

    const legendItems = document.querySelectorAll('[class*="flex items-center gap-2"]');
    expect(legendItems).toHaveLength(2);
  });

  it("renders legend items with correct colors", () => {
    render(<GenderPieChart data={mockData} />);

    const colorIndicators = document.querySelectorAll('[class*="w-[15px] h-[10px] shrink-0"]');
    expect(colorIndicators).toHaveLength(2);

    expect(colorIndicators[0]).toHaveAttribute("style", "background-color: rgb(255, 107, 107);");
    expect(colorIndicators[1]).toHaveAttribute("style", "background-color: rgb(78, 205, 196);");
  });

  it("renders legend text correctly", () => {
    render(<GenderPieChart data={mockData} />);

    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Female")).toBeInTheDocument();
    expect(screen.getByText("0.7k 65%")).toBeInTheDocument();
    expect(screen.getByText("0.3k 35%")).toBeInTheDocument();
  });

  it("renders legend text with correct styling", () => {
    render(<GenderPieChart data={mockData} />);

    const legendTexts = document.querySelectorAll('[class*="text-[14px] leading-4 text-[#2c2a2a]"]');
    expect(legendTexts).toHaveLength(2);

    legendTexts.forEach((text) => {
      expect(text).toHaveClass("text-[14px]", "leading-4", "text-[#2c2a2a]");
    });
  });

  it("handles empty data array", () => {
    const { container } = render(<GenderPieChart data={[]} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles single data point", () => {
    const singleData = [
      {
        name: "Male",
        value: 1000,
        percentage: "100%",
        color: "#FF6B6B",
      },
    ];

    render(<GenderPieChart data={singleData} />);

    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("1.0k 100%")).toBeInTheDocument();

    const cells = screen.getAllByTestId("cell");
    expect(cells).toHaveLength(1);
  });

  it("handles large datasets", () => {
    const largeData = Array.from({ length: 5 }, (_, i) => ({
      name: `Category ${i + 1}`,
      value: Math.floor(Math.random() * 1000),
      percentage: `${Math.floor(Math.random() * 100)}%`,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));

    render(<GenderPieChart data={largeData} />);

    const legendItems = document.querySelectorAll('[class*="flex items-center gap-2"]');
    expect(legendItems).toHaveLength(5);

    const cells = screen.getAllByTestId("cell");
    expect(cells).toHaveLength(5);
  });

  it("formats values correctly in legend", () => {
    const testData = [
      {
        name: "Test",
        value: 1234,
        percentage: "100%",
        color: "#000000",
      },
    ];

    render(<GenderPieChart data={testData} />);

    expect(screen.getByText("1.2k 100%")).toBeInTheDocument();
  });

  it("renders legend container with correct classes", () => {
    render(<GenderPieChart data={mockData} />);

    const legendContainer = document.querySelector('[class*="flex flex-col gap-3 px-4 py-0"]');
    expect(legendContainer).toBeInTheDocument();
  });

  it("maintains component structure", () => {
    render(<GenderPieChart data={mockData} />);

    // Check that all main components are rendered
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    expect(screen.getByTestId("pie")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
  });
});
