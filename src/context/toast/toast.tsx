import * as React from "react";
import { createPortal } from "react-dom";
import { ToastContext } from "@/context/toast/toast-context";
import type {
  ToastContextValue,
  ToastMessage,
  ToastType,
} from "@/context/toast/toast-context";
import { SuccessIcon } from "@/icon/SuccessIcon";
import { ErrorIcon } from "@/icon/ErrorIcon";
import { WarningIcon } from "@/icon/WarningIcon";
import { InfoIcon } from "@/icon/InfoIcon";
import { XIcon } from "@/icon/XIcon";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const removeToastById = React.useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const show = React.useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const toast: ToastMessage = { id, type, message };
      setToasts((current) => [toast, ...current]);
      window.setTimeout(() => removeToastById(id), 3000);
    },
    [removeToastById]
  );

  const contextValue = React.useMemo<ToastContextValue>(
    () => ({
      show,
      success: (message: string) => show(message, "success"),
      error: (message: string) => show(message, "error"),
      info: (message: string) => show(message, "info"),
      warning: (message: string) => show(message, "warning"),
    }),
    [show]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToastById} />
    </ToastContext.Provider>
  );
}

function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastMessage[];
  onClose: (id: number) => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed top-4 right-4 z-9999 flex flex-col gap-2 pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => onClose(t.id)} />
      ))}
    </div>,
    document.body
  );
}

const ToastItem = React.memo(function ToastItem({
  toast,
  onClose,
}: {
  toast: ToastMessage;
  onClose: () => void;
}) {
  const base =
    "px-4 py-3 rounded-lg shadow-lg border transform transition-all duration-300 ease-out max-w-sm bg-white/80 backdrop-blur pointer-events-auto";
  const variant =
    toast.type === "success"
      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
      : toast.type === "error"
      ? "bg-red-50 border-red-200 text-red-800"
      : toast.type === "warning"
      ? "bg-amber-50 border-amber-200 text-amber-800"
      : "bg-blue-50 border-blue-200 text-blue-800";

  return (
    <div
      className={`${base} ${variant}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        <ToastIcon type={toast.type} />
        <div className="flex-1 flex items-center justify-between gap-3">
          <span className="font-medium text-sm">{toast.message}</span>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
            onClick={onClose}
            aria-label="Close"
          >
            <XIcon />
          </button>
        </div>
      </div>
    </div>
  );
});

function ToastIcon({ type }: { type: ToastType }) {
  switch (type) {
    case "success":
      return <SuccessIcon className="w-5 h-5 shrink-0 text-emerald-600" />;
    case "error":
      return <ErrorIcon className="w-5 h-5 shrink-0 text-red-600" />;
    case "warning":
      return <WarningIcon className="w-5 h-5 shrink-0 text-amber-600" />;
    case "info":
    default:
      return <InfoIcon className="w-5 h-5 shrink-0 text-blue-600" />;
  }
}
