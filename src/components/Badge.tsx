import type { ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "pending"
  | "danger"
  | "approved";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#dbe1e7] text-[#021337]",
  success: "bg-[#00a349] text-white",
  error: "bg-[#e5240c] text-white",
  danger: "bg-[#e5240c] text-white",
  warning: "bg-[#ffe2a9] text-[#021337]",
  pending: "bg-[#e6e9ed] text-[#021337]",
  approved: "bg-[#acf1d6] text-[#021337]",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center justify-center px-1.5 py-0 rounded h-5 font-medium text-xs leading-4 text-nowrap ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
