import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { XIcon } from "@/icon/XIcon";
import { cn } from "@/lib/utils/common";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  rightAction?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  rightAction,
  footer,
  children,
}: BottomSheetProps) {
  const bodyRef = useRef<HTMLBodyElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    bodyRef.current = document.querySelector("body");
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Trigger animation after mounting
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !bodyRef.current) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-300",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={cn(
          "relative w-full max-w-md bg-white rounded-t-3xl shadow-xl transform transition-all duration-300 ease-in-out flex flex-col max-h-[85vh]",
          isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close"
          >
            <XIcon className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <div className="w-8 flex justify-end">
            {rightAction && <div className="text-sm">{rightAction}</div>}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 min-h-[200px]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-4 py-4 border-t border-gray-100 bg-white shrink-0 pb-8">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
