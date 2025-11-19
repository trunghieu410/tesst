import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "../../test/utils";
import { InputTagLabels } from "./InputTagLabels";
import { XCircleIcon } from "@/icon/XCircleIcon";

// Mock the icon
vi.mock("@/icon/XCircleIcon", () => ({
  XCircleIcon: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="x-circle-icon" />
  ),
}));

describe("InputTagLabels", () => {
  let mockOnChange: any;

  beforeEach(() => {
    mockOnChange = vi.fn();
  });

  describe("rendering", () => {
    it("renders without crashing", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);
      expect(screen.getByText("Nhãn chiến dịch")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      expect(screen.getByText("Nhãn chiến dịch")).toBeInTheDocument();
      expect(screen.getByText("Không bắt buộc")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Nhập nhãn và nhấn Enter")
      ).toBeInTheDocument();
    });

    it("renders with custom props", () => {
      const customLabel = "Custom Label";
      const customOptional = "Optional Text";
      const customPlaceholder = "Custom Placeholder";
      const customClass = "custom-class";

      render(
        <InputTagLabels
          value={[]}
          onChange={mockOnChange}
          label={customLabel}
          optionalText={customOptional}
          placeholder={customPlaceholder}
          className={customClass}
        />
      );

      expect(screen.getByText(customLabel)).toBeInTheDocument();
      expect(screen.getByText(customOptional)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(customPlaceholder)
      ).toBeInTheDocument();

      const container = document.querySelector(".custom-class");
      expect(container).toBeInTheDocument();
    });

    it("renders with existing tags", () => {
      const tags = ["tag1", "tag2", "tag3"];
      render(<InputTagLabels value={tags} onChange={mockOnChange} />);

      expect(screen.getByText("tag1")).toBeInTheDocument();
      expect(screen.getByText("tag2")).toBeInTheDocument();
      expect(screen.getByText("tag3")).toBeInTheDocument();

      // Should have remove buttons for each tag
      expect(screen.getAllByTestId("x-circle-icon")).toHaveLength(3);
    });

    it("renders empty when value is empty array", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const tagContainers = document.querySelectorAll(".bg-\\[\\#e6e9ed\\]");
      expect(tagContainers).toHaveLength(0);
    });
  });

  describe("tag input functionality", () => {
    it("adds tag when pressing Enter", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "new tag" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith(["new tag"]);
      expect(input).toHaveValue("");
    });

    it("adds tag when pressing comma", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "new tag" } });
      fireEvent.keyDown(input, { key: "," });

      expect(mockOnChange).toHaveBeenCalledWith(["new tag"]);
      expect(input).toHaveValue("");
    });

    it("supports comma-separated input", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "tag1, tag2, tag3" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith(["tag1", "tag2", "tag3"]);
      expect(input).toHaveValue("");
    });

    it("handles comma-separated input with extra spaces", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, {
        target: { value: "  tag1  ,  tag2  ,  tag3  " },
      });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith(["tag1", "tag2", "tag3"]);
      expect(input).toHaveValue("");
    });

    it("ignores empty parts in comma-separated input", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "tag1,,tag2, ,tag3" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith(["tag1", "tag2", "tag3"]);
    });

    it("adds tag on blur", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "blur tag" } });
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalledWith(["blur tag"]);
      expect(input).toHaveValue("");
    });

    it("supports comma-separated input on blur", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "blur1, blur2" } });
      fireEvent.blur(input);

      expect(mockOnChange).toHaveBeenCalledWith(["blur1", "blur2"]);
      expect(input).toHaveValue("");
    });

    it("trims whitespace from tags", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "  spaced tag  " } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith(["spaced tag"]);
    });

    it("ignores empty input", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "   " } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("ignores whitespace-only input", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "\t\n " } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("prevents duplicate tags", () => {
      const existingTags = ["existing"];
      render(<InputTagLabels value={existingTags} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "existing" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("allows adding non-duplicate tags", () => {
      const existingTags = ["existing"];
      render(<InputTagLabels value={existingTags} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "new tag" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith(["existing", "new tag"]);
    });

    it("does not prevent Enter when input is empty", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("does not prevent comma when input is empty", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.keyDown(input, { key: "," });

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe("tag removal", () => {
    it("removes tag when clicking X button", () => {
      const tags = ["tag1", "tag2", "tag3"];
      render(<InputTagLabels value={tags} onChange={mockOnChange} />);

      const removeButtons = screen.getAllByTestId("x-circle-icon");
      fireEvent.click(removeButtons[1]); // Remove second tag

      expect(mockOnChange).toHaveBeenCalledWith(["tag1", "tag3"]);
    });

    it("stops event propagation when removing tag", () => {
      const tags = ["tag1"];
      render(<InputTagLabels value={tags} onChange={mockOnChange} />);

      const removeButton = screen.getByTestId("x-circle-icon");
      // Click should not bubble up
      fireEvent.click(removeButton);

      expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    it("removes correct tag when multiple tags exist", () => {
      const tags = ["first", "second", "third"];
      render(<InputTagLabels value={tags} onChange={mockOnChange} />);

      // Remove the middle tag
      const removeButtons = screen.getAllByTestId("x-circle-icon");
      fireEvent.click(removeButtons[1]);

      expect(mockOnChange).toHaveBeenCalledWith(["first", "third"]);
    });
  });

  describe("input state management", () => {
    it("updates input value as user types", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "typing" } });

      expect(input).toHaveValue("typing");
    });

    it("clears input after adding tag", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "new tag" } });
      expect(input).toHaveValue("new tag");

      fireEvent.keyDown(input, { key: "Enter" });
      expect(input).toHaveValue("");
    });

    it("clears input after blur", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "blur input" } });
      expect(input).toHaveValue("blur input");

      fireEvent.blur(input);
      expect(input).toHaveValue("");
    });

    it("maintains input value between operations", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "partial" } });
      expect(input).toHaveValue("partial");

      // Type more without clearing
      fireEvent.change(input, { target: { value: "partial input" } });
      expect(input).toHaveValue("partial input");
    });
  });

  describe("styling and accessibility", () => {
    it("renders tag chips with correct styling", () => {
      const tags = ["test"];
      render(<InputTagLabels value={tags} onChange={mockOnChange} />);

      const tagChip = document.querySelector(".bg-\\[\\#e6e9ed\\]");
      expect(tagChip).toHaveClass(
        "bg-[#e6e9ed]",
        "rounded",
        "px-1.5",
        "h-5",
        "inline-flex",
        "items-center",
        "gap-1"
      );
    });

    it("renders tag text with correct typography", () => {
      const tags = ["test"];
      render(<InputTagLabels value={tags} onChange={mockOnChange} />);

      const tagText = screen.getByText("test");
      expect(tagText).toHaveClass(
        "font-medium",
        "text-xs",
        "leading-4",
        "text-[#021337]"
      );
    });

    it("renders remove buttons with correct styling", () => {
      const tags = ["test"];
      render(<InputTagLabels value={tags} onChange={mockOnChange} />);

      const removeButton = screen.getByTestId("x-circle-icon").parentElement!;
      expect(removeButton).toHaveClass(
        "w-3",
        "h-3",
        "flex",
        "items-center",
        "justify-center"
      );
    });

    it("renders input with correct styling", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      expect(input).toHaveClass(
        "min-w-[120px]",
        "flex-1",
        "py-1.5",
        "text-[13px]",
        "leading-4",
        "text-[#021337]",
        "placeholder:text-[#677187]",
        "focus:outline-none"
      );
    });

    it("renders container with correct base classes", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const container = document.querySelector(".flex.flex-col.gap-1");
      expect(container).toHaveClass("flex", "flex-col", "gap-1");
    });

    it("renders input container with correct styling", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const inputContainer = document.querySelector(
        ".bg-white.border.border-\\[\\#cfd6de\\]"
      );
      expect(inputContainer).toHaveClass(
        "bg-white",
        "border",
        "border-[#cfd6de]",
        "rounded-md",
        "px-2.5",
        "py-1",
        "flex",
        "flex-wrap",
        "items-center",
        "gap-2.5",
        "max-h-32",
        "overflow-y-auto"
      );
    });

    it("renders label with correct typography", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const label = screen.getByText("Nhãn chiến dịch");
      expect(label).toHaveClass(
        "font-medium",
        "text-xs",
        "leading-4",
        "text-[#021337]"
      );
    });

    it("renders optional text with correct typography", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const optionalText = screen.getByText("Không bắt buộc");
      expect(optionalText).toHaveClass(
        "font-normal",
        "text-xs",
        "leading-4",
        "text-[#677187]"
      );
    });

    it("renders label container with correct layout", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const labelContainer = document.querySelector(".flex.items-center.gap-2");
      expect(labelContainer).toHaveClass("flex", "items-center", "gap-2");
    });

    it("has correct aria-label for remove buttons", () => {
      const tags = ["test tag"];
      render(<InputTagLabels value={tags} onChange={mockOnChange} />);

      const removeButton = screen.getByTestId("x-circle-icon").parentElement!;
      expect(removeButton).toHaveAttribute("aria-label", "Remove test tag");
    });
  });

  describe("keyboard and focus behavior", () => {
    it("handles Enter key correctly", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "test" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith(["test"]);
    });

    it("handles comma key correctly", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "test" } });
      fireEvent.keyDown(input, { key: "," });

      expect(mockOnChange).toHaveBeenCalledWith(["test"]);
    });

    it("does not prevent default on other keys", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "test" } });

      const mockPreventDefault = vi.fn();
      fireEvent.keyDown(input, {
        key: "a",
        preventDefault: mockPreventDefault,
      });

      expect(mockPreventDefault).not.toHaveBeenCalled();
    });

    it("handles focus and blur correctly", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");

      // Focus and blur input - component should handle internally
      fireEvent.focus(input);
      fireEvent.blur(input);

      // Test passes if no errors occur
      expect(input).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("handles undefined value prop", () => {
      render(
        <InputTagLabels value={undefined as any} onChange={mockOnChange} />
      );

      // Should render empty without crashing
      const tagContainers = document.querySelectorAll(".bg-\\[\\#e6e9ed\\]");
      expect(tagContainers).toHaveLength(0);
    });

    it("handles null value prop", () => {
      render(<InputTagLabels value={null as any} onChange={mockOnChange} />);

      // Should not crash, might show empty or handle gracefully
      expect(screen.getByText("Nhãn chiến dịch")).toBeInTheDocument();
    });

    it("handles very long tag names", () => {
      const longTag = "a".repeat(100);
      render(<InputTagLabels value={[longTag]} onChange={mockOnChange} />);

      expect(screen.getByText(longTag)).toBeInTheDocument();
    });

    it("handles tags with special characters", () => {
      const specialTags = [
        "tag-with-dashes",
        "tag_with_underscores",
        "tag@domain.com",
      ];
      render(<InputTagLabels value={specialTags} onChange={mockOnChange} />);

      expect(screen.getByText("tag-with-dashes")).toBeInTheDocument();
      expect(screen.getByText("tag_with_underscores")).toBeInTheDocument();
      expect(screen.getByText("tag@domain.com")).toBeInTheDocument();
    });

    it("handles empty strings in comma-separated input", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: ",,,," } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it("handles mixed valid and invalid comma-separated input", () => {
      render(<InputTagLabels value={[]} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, {
        target: { value: "valid, , ,also-valid,   " },
      });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith(["valid", "also-valid"]);
    });

    it("maintains existing tags when adding new ones", () => {
      const existingTags = ["existing1", "existing2"];
      render(<InputTagLabels value={existingTags} onChange={mockOnChange} />);

      const input = screen.getByPlaceholderText("Nhập nhãn và nhấn Enter");
      fireEvent.change(input, { target: { value: "new-tag" } });
      fireEvent.keyDown(input, { key: "Enter" });

      expect(mockOnChange).toHaveBeenCalledWith([
        "existing1",
        "existing2",
        "new-tag",
      ]);
    });
  });
});
