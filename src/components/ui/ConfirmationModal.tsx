import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";

interface ConfirmationModalProps {
  /**
   * Controls whether the modal is visible
   */
  isOpen: boolean;
  /**
   * Callback when modal is closed (via cancel button or backdrop click)
   */
  onClose: () => void;
  /**
   * Callback when confirm is clicked, receives the reason string
   */
  onConfirm: (reason: string) => void;
  /**
   * Title of the modal
   * @example "Tạm khóa tài khoản?"
   */
  title: string;
  /**
   * Description text below the title
   * @example "Publisher sau khi bị khoá..."
   */
  description?: string;
  /**
   * Label for the textarea input
   * @default "Lý do tạm khóa"
   */
  label?: string;
  /**
   * Warning message displayed below the textarea in red
   * @example "Vui lòng cung cấp lý do..."
   */
  warningMessage?: string;
  /**
   * Text for the confirm button
   * @default "Xác nhận"
   */
  confirmText?: string;
  /**
   * Text for the cancel button
   * @default "Đóng"
   */
  cancelText?: string;
  /**
   * Whether the confirm action is processing (disables confirm button)
   */
  isLoading?: boolean;
  /**
   * Placeholder text for the textarea
   * @default "Nội dung ..."
   */
  placeholder?: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  label = "Lý do tạm khóa",
  warningMessage,
  confirmText = "Xác nhận",
  cancelText = "Đóng",
  isLoading = false,
  placeholder = "Nội dung ...",
}: ConfirmationModalProps) {
  const [reason, setReason] = useState("");

  // Reset reason when modal closes
  useEffect(() => {
    if (!isOpen) {
      setReason("");
    }
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    onConfirm(reason);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        {/* Title */}
        <h2 id="modal-title" className="text-xl font-bold text-gray-900">
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p className="mt-2 text-gray-600 text-sm">{description}</p>
        )}

        {/* Label */}
        <label htmlFor="reason-input" className="block mt-4 font-medium text-gray-900 text-sm">
          {label}
        </label>

        {/* Textarea */}
        <textarea
          id="reason-input"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y text-sm"
          disabled={isLoading}
        />

        {/* Warning Message */}
        {warningMessage && (
          <p className="mt-2 text-sm text-red-500">{warningMessage}</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            {cancelText}
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={handleConfirm}
            disabled={isLoading}
            isLoading={isLoading}
            className="px-4 py-2 bg-white text-red-500 border border-red-500 hover:bg-red-50 hover:border-red-600"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
