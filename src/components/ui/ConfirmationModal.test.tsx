import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmationModal } from "./ConfirmationModal";

describe("ConfirmationModal", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onConfirm: mockOnConfirm,
    title: "Test Modal Title",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any body styles
    document.body.style.overflow = "unset";
  });

  it("should not render when isOpen is false", () => {
    render(<ConfirmationModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render when isOpen is true", () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal Title")).toBeInTheDocument();
  });

  it("should display the title", () => {
    render(<ConfirmationModal {...defaultProps} title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("should display the description when provided", () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        description="This is a test description"
      />
    );
    expect(screen.getByText("This is a test description")).toBeInTheDocument();
  });

  it("should not display description when not provided", () => {
    render(<ConfirmationModal {...defaultProps} />);
    const description = screen.queryByText(/description/i);
    expect(description).not.toBeInTheDocument();
  });

  it("should display custom label", () => {
    render(<ConfirmationModal {...defaultProps} label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });

  it("should display default label when not provided", () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByText("Lý do tạm khóa")).toBeInTheDocument();
  });

  it("should display warning message when provided", () => {
    render(
      <ConfirmationModal
        {...defaultProps}
        warningMessage="This is a warning"
      />
    );
    expect(screen.getByText("This is a warning")).toBeInTheDocument();
  });

  it("should render textarea with default placeholder", () => {
    render(<ConfirmationModal {...defaultProps} />);
    const textarea = screen.getByPlaceholderText("Nội dung ...");
    expect(textarea).toBeInTheDocument();
  });

  it("should render textarea with custom placeholder", () => {
    render(
      <ConfirmationModal {...defaultProps} placeholder="Custom placeholder" />
    );
    const textarea = screen.getByPlaceholderText("Custom placeholder");
    expect(textarea).toBeInTheDocument();
  });

  it("should update textarea value when user types", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Test reason");

    expect(textarea).toHaveValue("Test reason");
  });

  it("should display custom confirm text", () => {
    render(<ConfirmationModal {...defaultProps} confirmText="Custom Confirm" />);
    expect(screen.getByText("Custom Confirm")).toBeInTheDocument();
  });

  it("should display default confirm text when not provided", () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByText("Xác nhận")).toBeInTheDocument();
  });

  it("should display custom cancel text", () => {
    render(<ConfirmationModal {...defaultProps} cancelText="Custom Cancel" />);
    expect(screen.getByText("Custom Cancel")).toBeInTheDocument();
  });

  it("should display default cancel text when not provided", () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(screen.getByText("Đóng")).toBeInTheDocument();
  });

  it("should call onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    const cancelButton = screen.getByText("Đóng");
    await user.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onConfirm with reason when confirm button is clicked", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Test reason");

    const confirmButton = screen.getByText("Xác nhận");
    await user.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledWith("Test reason");
  });

  it("should call onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    const backdrop = screen.getByRole("dialog");
    await user.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when modal content is clicked", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    const modalTitle = screen.getByText("Test Modal Title");
    await user.click(modalTitle);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should call onClose when ESC key is pressed", async () => {
    render(<ConfirmationModal {...defaultProps} />);

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it("should disable buttons when isLoading is true", () => {
    render(<ConfirmationModal {...defaultProps} isLoading={true} />);

    const cancelButton = screen.getByText("Đóng");
    const confirmButton = screen.getByText("Loading...").closest('button');

    expect(cancelButton).toBeDisabled();
    expect(confirmButton).toBeDisabled();
  });

  it("should disable textarea when isLoading is true", () => {
    render(<ConfirmationModal {...defaultProps} isLoading={true} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
  });

  it("should reset reason when modal is closed and reopened", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ConfirmationModal {...defaultProps} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "Test reason");

    expect(textarea).toHaveValue("Test reason");

    // Close modal
    rerender(<ConfirmationModal {...defaultProps} isOpen={false} />);

    // Reopen modal
    rerender(<ConfirmationModal {...defaultProps} isOpen={true} />);

    const newTextarea = screen.getByRole("textbox");
    expect(newTextarea).toHaveValue("");
  });

  it("should prevent body scroll when modal is open", () => {
    render(<ConfirmationModal {...defaultProps} />);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should restore body scroll when modal is closed", () => {
    const { unmount } = render(<ConfirmationModal {...defaultProps} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("unset");
  });

  it("should render with portal", () => {
    render(<ConfirmationModal {...defaultProps} />);
    
    // The modal should be rendered directly under body, not in the test container
    const dialog = screen.getByRole("dialog");
    expect(dialog.parentElement).toBe(document.body);
  });

  it("should have proper accessibility attributes", () => {
    render(<ConfirmationModal {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  });

  it("should have proper label association with textarea", () => {
    render(<ConfirmationModal {...defaultProps} label="Test Label" />);

    const label = screen.getByText("Test Label");
    const textarea = screen.getByRole("textbox");

    expect(label).toHaveAttribute("for", "reason-input");
    expect(textarea).toHaveAttribute("id", "reason-input");
  });

  it("should call onConfirm with empty string if no reason is provided", async () => {
    const user = userEvent.setup();
    render(<ConfirmationModal {...defaultProps} />);

    const confirmButton = screen.getByText("Xác nhận");
    await user.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledWith("");
  });

  it("should show loading state in confirm button", () => {
    render(<ConfirmationModal {...defaultProps} isLoading={true} />);
    
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
