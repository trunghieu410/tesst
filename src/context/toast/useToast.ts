import * as React from "react";
import { ToastContext } from "@/context/toast/toast-context";
import type { ToastContextValue } from "@/context/toast/toast-context";

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
