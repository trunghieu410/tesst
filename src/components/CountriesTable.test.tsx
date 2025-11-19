import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CountriesTable } from "./CountriesTable";

const mockData = [
  {
    rank: 1,
    country: "United States",
    flag: "🇺🇸",
    pubs: 1250,
  },
  {
    rank: 2,
    country: "Vietnam",
    flag: "🇻🇳",
    pubs: 890,
  },
  {
    rank: 3,
    country: "Japan",
    flag: "🇯🇵",
    pubs: 675,
  },
];

describe("CountriesTable", () => {
  it("renders without crashing", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <CountriesTable data={mockData} className="custom-table" />
    );

    expect(container.firstChild).toHaveClass("custom-table");
  });

  it("renders correct number of rows", () => {
    render(<CountriesTable data={mockData} />);

    // Check rank column has correct number of entries
    const ranks = screen.getAllByText(/^1$|^2$|^3$/);
    expect(ranks).toHaveLength(3);

    // Check country names are rendered
    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("Vietnam")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<CountriesTable data={mockData} />);

    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Quốc gia")).toBeInTheDocument();
    expect(screen.getByText("SLg Pub")).toBeInTheDocument();
  });

  it("renders ranks correctly", () => {
    render(<CountriesTable data={mockData} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders country flags correctly", () => {
    render(<CountriesTable data={mockData} />);

    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    expect(screen.getByText("🇻🇳")).toBeInTheDocument();
    expect(screen.getByText("🇯🇵")).toBeInTheDocument();
  });

  it("renders country names correctly", () => {
    render(<CountriesTable data={mockData} />);

    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("Vietnam")).toBeInTheDocument();
    expect(screen.getByText("Japan")).toBeInTheDocument();
  });

  it("renders pubs count with proper formatting", () => {
    render(<CountriesTable data={mockData} />);

    expect(screen.getByText("1,250")).toBeInTheDocument();
    expect(screen.getByText("890")).toBeInTheDocument();
    expect(screen.getByText("675")).toBeInTheDocument();
  });

  it("renders base container with correct classes", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass(
      "bg-white",
      "border-[#d0d5dd]",
      "border-[0.5px]",
      "border-solid",
      "rounded-bl-[6px]",
      "rounded-br-[6px]",
      "w-full"
    );
  });

  it("renders main flex container", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const flexContainer = container.querySelector('[class*="flex items-start overflow-clip"]');
    expect(flexContainer).toBeInTheDocument();
  });

  it("renders rank column with correct width", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const rankColumn = container.querySelector('[class*="w-[70px]"]');
    expect(rankColumn).toBeInTheDocument();
  });

  it("renders country column with correct width", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const countryColumn = container.querySelector('[class*="w-[130px]"]');
    expect(countryColumn).toBeInTheDocument();
  });

  it("renders pubs column as flex-1", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const pubsColumn = container.querySelector('[class*="flex-1"]');
    expect(pubsColumn).toBeInTheDocument();
  });

  it("renders borders between rows but not after last row", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    // Should have borders on first two rows in each column
    const borders = container.querySelectorAll('[class*="border-[#cfd6de] border-b-[0.5px]"]');
    // 3 rows × 3 columns = 9 total, but last row in each column shouldn't have border
    // So 6 borders total (2 per column × 3 columns)
    expect(borders).toHaveLength(6);
  });

  it("renders header borders correctly", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const headerBorders = container.querySelectorAll('[class*="border-[#cfd6de] border-b"]');
    // Headers should have borders
    expect(headerBorders.length).toBeGreaterThan(0);
  });

  it("handles empty data array", () => {
    const { container } = render(<CountriesTable data={[]} />);

    expect(container.firstChild).toBeInTheDocument();
    // Should still have headers but no rows
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Quốc gia")).toBeInTheDocument();
    expect(screen.getByText("SLg Pub")).toBeInTheDocument();
  });

  it("handles single data point", () => {
    const singleData = [
      {
        rank: 1,
        country: "Test Country",
        flag: "🎯",
        pubs: 100,
      },
    ];

    render(<CountriesTable data={singleData} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("🎯")).toBeInTheDocument();
    expect(screen.getByText("Test Country")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("handles large numbers correctly", () => {
    const largeData = [
      {
        rank: 1,
        country: "Big Country",
        flag: "🌍",
        pubs: 1000000,
      },
    ];

    render(<CountriesTable data={largeData} />);

    expect(screen.getByText("1,000,000")).toBeInTheDocument();
  });

  it("renders flag with correct styling", () => {
    render(<CountriesTable data={mockData} />);

    const flag = screen.getByText("🇺🇸");
    const flagContainer = flag.closest('[class*="text-[20px] shrink-0"]');
    expect(flagContainer).toBeInTheDocument();
  });

  it("renders rank numbers centered", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const rankCells = container.querySelectorAll('[class*="justify-center"]');
    expect(rankCells.length).toBeGreaterThan(0);
  });

  it("renders pubs count right-aligned", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const pubsText = container.querySelector('[class*="text-right"]');
    expect(pubsText).toBeInTheDocument();
  });

  it("renders country names left-aligned", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    const countryCells = container.querySelectorAll('[class*="items-start"]');
    expect(countryCells.length).toBeGreaterThan(0);
  });

  it("maintains proper table structure", () => {
    const { container } = render(<CountriesTable data={mockData} />);

    // Should have 3 main columns (rank, country, pubs)
    const rankColumn = container.querySelector('[class*="w-[70px]"]');
    const countryColumn = container.querySelector('[class*="w-[130px]"]');
    const pubsColumn = container.querySelector('[class*="flex-1"]');

    expect(rankColumn).toBeInTheDocument();
    expect(countryColumn).toBeInTheDocument();
    expect(pubsColumn).toBeInTheDocument();

    // Each column should have header + 3 data rows = 4 total cells
    [rankColumn, countryColumn, pubsColumn].forEach((column) => {
      const cells = column?.querySelectorAll('[class*="box-border"]');
      expect(cells).toHaveLength(4); // 1 header + 3 data rows
    });
  });

  it("handles special characters in country names", () => {
    const specialData = [
      {
        rank: 1,
        country: "Côte d'Ivoire",
        flag: "🇨🇮",
        pubs: 100,
      },
    ];

    render(<CountriesTable data={specialData} />);

    expect(screen.getByText("Côte d'Ivoire")).toBeInTheDocument();
  });

  it("handles long country names", () => {
    const longNameData = [
      {
        rank: 1,
        country: "The United Kingdom of Great Britain and Northern Ireland",
        flag: "🇬🇧",
        pubs: 500,
      },
    ];

    render(<CountriesTable data={longNameData} />);

    expect(screen.getByText("The United Kingdom of Great Britain and Northern Ireland")).toBeInTheDocument();
  });
});
