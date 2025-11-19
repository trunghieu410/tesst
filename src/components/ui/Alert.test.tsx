import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils";
import { Alert } from "./Alert";
import { InfoIcon } from "@/icon/InfoIcon";

// Mock the InfoIcon component
vi.mock("@/icon/InfoIcon", () => ({
  InfoIcon: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="info-icon" />
  ),
}));

describe("Alert", () => {
  it("renders without crashing", () => {
    render(<Alert>Test message</Alert>);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("renders with default props", () => {
    render(<Alert>Default alert</Alert>);

    // Find the root alert div by querying for the flex container
    const alert = document.querySelector(".bg-\\[\\#e6e9ed\\]");
    expect(alert).toHaveClass(
      "bg-[#e6e9ed]",
      "flex",
      "gap-3",
      "items-start",
      "px-3",
      "py-2",
      "w-full"
    );
    expect(screen.getByTestId("info-icon")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    const testContent = "This is a test alert message";
    render(<Alert>{testContent}</Alert>);

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    const customClass = "custom-alert-class";
    render(<Alert className={customClass}>Test message</Alert>);

    const alert = document.querySelector(".custom-alert-class");
    expect(alert).toHaveClass(customClass);
  });

  it("renders icon with correct styling", () => {
    render(<Alert>Test message</Alert>);

    const icon = screen.getByTestId("info-icon");
    expect(icon).toHaveClass("w-5", "h-5", "text-[#021337]");
  });

  it("renders content with correct styling", () => {
    render(<Alert>Test message</Alert>);

    const content = screen.getByText("Test message");
    expect(content).toHaveClass(
      "flex-1",
      "text-sm",
      "leading-4",
      "text-[#021337]"
    );
  });

  it("renders complex children", () => {
    render(
      <Alert>
        <span>Important:</span> This is a complex message with{" "}
        <strong>bold text</strong>
      </Alert>
    );

    expect(screen.getByText("Important:")).toBeInTheDocument();
    expect(
      screen.getByText("This is a complex message with")
    ).toBeInTheDocument();
    expect(screen.getByText("bold text")).toBeInTheDocument();
  });

  it("has correct accessibility structure", () => {
    render(<Alert>Accessibility test</Alert>);

    // Alert should be visible and have appropriate semantic structure
    const alert =
      screen.getByText("Accessibility test").parentElement?.parentElement;
    expect(alert).toBeVisible();
    expect(alert?.tagName.toLowerCase()).toBe("div");
  });

  it("maintains consistent structure across renders", () => {
    const { rerender } = render(<Alert>First message</Alert>);

    expect(screen.getByText("First message")).toBeInTheDocument();

    rerender(<Alert>Second message</Alert>);

    expect(screen.getByText("Second message")).toBeInTheDocument();
    expect(screen.queryByText("First message")).not.toBeInTheDocument();
  });
});
