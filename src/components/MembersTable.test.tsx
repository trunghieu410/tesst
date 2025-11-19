import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MembersTable } from "./MembersTable";

const mockData = [
  {
    rank: 1,
    name: "John Doe",
    email: "john@example.com",
    flag: "🇺🇸",
    totalPub: 1250,
    f1: 500,
    f2: 400,
    f3: 350,
  },
  {
    rank: 2,
    name: "Nguyen Van A",
    email: "nguyen@example.com",
    flag: "🇻🇳",
    totalPub: 1100,
    f1: 450,
    f2: 380,
    f3: 270,
  },
  {
    rank: 3,
    name: "Yamada Taro",
    email: "yamada@example.com",
    flag: "🇯🇵",
    totalPub: 950,
    f1: 400,
    f2: 320,
    f3: 230,
  },
];

describe("MembersTable", () => {
  it("renders without crashing", () => {
    const { container } = render(<MembersTable data={mockData} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <MembersTable data={mockData} className="custom-table" />
    );

    expect(container.firstChild).toHaveClass("custom-table");
  });

  it("renders table structure correctly", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("w-full");

    const thead = container.querySelector("thead");
    const tbody = container.querySelector("tbody");
    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();
  });

  it("renders table headers correctly", () => {
    render(<MembersTable data={mockData} />);

    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Họ tên")).toBeInTheDocument();
    expect(screen.getByText("Tổng Pub")).toBeInTheDocument();
    expect(screen.getByText("F1")).toBeInTheDocument();
    expect(screen.getByText("F2")).toBeInTheDocument();
    expect(screen.getByText("F3")).toBeInTheDocument();
  });

  it("renders correct number of rows", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(3);
  });

  it("renders ranks correctly", () => {
    render(<MembersTable data={mockData} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders names correctly", () => {
    render(<MembersTable data={mockData} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Nguyen Van A")).toBeInTheDocument();
    expect(screen.getByText("Yamada Taro")).toBeInTheDocument();
  });

  it("renders emails correctly", () => {
    render(<MembersTable data={mockData} />);

    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("nguyen@example.com")).toBeInTheDocument();
    expect(screen.getByText("yamada@example.com")).toBeInTheDocument();
  });

  it("renders flags correctly", () => {
    render(<MembersTable data={mockData} />);

    expect(screen.getByText("🇺🇸")).toBeInTheDocument();
    expect(screen.getByText("🇻🇳")).toBeInTheDocument();
    expect(screen.getByText("🇯🇵")).toBeInTheDocument();
  });

  it("renders totalPub with proper formatting", () => {
    render(<MembersTable data={mockData} />);

    expect(screen.getByText("1,250")).toBeInTheDocument();
    expect(screen.getByText("1,100")).toBeInTheDocument();
    expect(screen.getByText("950")).toBeInTheDocument();
  });

  it("renders f1, f2, f3 values with proper formatting", () => {
    render(<MembersTable data={mockData} />);

    // F1 values
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("450")).toBeInTheDocument();

    // F2 values
    expect(screen.getByText("380")).toBeInTheDocument();
    expect(screen.getByText("320")).toBeInTheDocument();

    // F3 values
    expect(screen.getByText("350")).toBeInTheDocument();
    expect(screen.getByText("270")).toBeInTheDocument();
    expect(screen.getByText("230")).toBeInTheDocument();

    // Check that 400 appears twice (F1 for third row and F2 for first row)
    const fourHundreds = screen.getAllByText("400");
    expect(fourHundreds).toHaveLength(2);
  });

  it("renders header row with correct styling", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const headerRow = container.querySelector("thead tr");
    expect(headerRow).toHaveClass("border-b", "border-[#cfd6de]");
  });

  it("renders header cells with correct styling", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const headers = container.querySelectorAll("thead th");
    expect(headers).toHaveLength(6);

    headers.forEach((header) => {
      expect(header).toHaveClass(
        "py-2",
        "px-3",
        "text-[12px]",
        "font-medium",
        "leading-4",
        "text-[#677187]"
      );
    });
  });

  it("renders data rows with correct styling", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const dataRows = container.querySelectorAll("tbody tr");
    expect(dataRows).toHaveLength(3);

    // First two rows should have bottom border
    expect(dataRows[0]).toHaveClass("border-b", "border-[#e6e9ed]");
    expect(dataRows[1]).toHaveClass("border-b", "border-[#e6e9ed]");
    // Last row should not have bottom border (border-b-0)
    expect(dataRows[2]).toHaveClass("border-b-0");
  });

  it("renders data cells with correct styling", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const dataCells = container.querySelectorAll("tbody td");
    expect(dataCells).toHaveLength(18); // 3 rows × 6 columns

    // Rank cells (first column)
    const rankCells = container.querySelectorAll("tbody td:first-child");
    rankCells.forEach((cell) => {
      expect(cell).toHaveClass(
        "py-4",
        "px-3",
        "text-[14px]",
        "font-normal",
        "leading-5",
        "text-[#021337]"
      );
    });

    // Right-aligned cells (totalPub, f1, f2, f3)
    const rightAlignedCells = container.querySelectorAll("tbody td:nth-child(n+3)");
    rightAlignedCells.forEach((cell) => {
      expect(cell).toHaveClass("text-right");
    });
  });

  it("renders name and email with correct styling", () => {
    const { container } = render(<MembersTable data={mockData} />);

    // Select only spans within tbody (not headers)
    const names = container.querySelectorAll('tbody [class*="text-[#7a4dff]"]');
    const emails = container.querySelectorAll('tbody [class*="text-[#677187]"]');

    expect(names).toHaveLength(3);
    expect(emails).toHaveLength(3);

    names.forEach((name) => {
      expect(name).toHaveClass("text-[14px]", "font-medium", "leading-5", "text-[#7a4dff]");
    });

    emails.forEach((email) => {
      expect(email).toHaveClass("text-[12px]", "font-normal", "leading-4", "text-[#677187]");
    });
  });

  it("renders flags with correct styling", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const flags = container.querySelectorAll('[class*="text-[18px]"]');
    expect(flags).toHaveLength(3);

    flags.forEach((flag) => {
      expect(flag).toHaveClass("text-[18px]");
    });
  });

  it("handles empty data array", () => {
    const { container } = render(<MembersTable data={[]} />);

    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();

    const tbody = container.querySelector("tbody");
    expect(tbody?.children).toHaveLength(0);
  });

  it("handles single data point", () => {
    const singleData = [
      {
        rank: 1,
        name: "Test User",
        email: "test@example.com",
        flag: "🎯",
        totalPub: 100,
        f1: 50,
        f2: 30,
        f3: 20,
      },
    ];

    render(<MembersTable data={singleData} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("🎯")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("handles large numbers correctly", () => {
    const largeData = [
      {
        rank: 1,
        name: "Big Numbers",
        email: "big@example.com",
        flag: "💰",
        totalPub: 1000000,
        f1: 500000,
        f2: 300000,
        f3: 200000,
      },
    ];

    render(<MembersTable data={largeData} />);

    expect(screen.getByText("1,000,000")).toBeInTheDocument();
    expect(screen.getByText("500,000")).toBeInTheDocument();
    expect(screen.getByText("300,000")).toBeInTheDocument();
    expect(screen.getByText("200,000")).toBeInTheDocument();
  });

  it("handles zero values correctly", () => {
    const zeroData = [
      {
        rank: 1,
        name: "Zero User",
        email: "zero@example.com",
        flag: "0️⃣",
        totalPub: 0,
        f1: 0,
        f2: 0,
        f3: 0,
      },
    ];

    render(<MembersTable data={zeroData} />);

    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(4); // rank is 1, so only the numerical values are 0
  });

  it("renders overflow wrapper with correct class", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("overflow-x-auto");
  });

  it("renders table with full width", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const table = container.querySelector("table");
    expect(table).toHaveClass("w-full");
  });

  it("maintains proper table accessibility structure", () => {
    const { container } = render(<MembersTable data={mockData} />);

    const table = container.querySelector("table");
    const thead = container.querySelector("thead");
    const tbody = container.querySelector("tbody");
    const headers = container.querySelectorAll("th");
    const rows = container.querySelectorAll("tr");

    expect(table).toBeInTheDocument();
    expect(thead).toBeInTheDocument();
    expect(tbody).toBeInTheDocument();
    expect(headers).toHaveLength(6);
    expect(rows).toHaveLength(4); // 1 header row + 3 data rows
  });
});
