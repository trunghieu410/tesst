import type { ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "error"
  | "draft"
  | "warning"
  | "pending"
  | "danger"
  | "approved"
  | "ended";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
  isCircle?: boolean;
  isActive?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[#dbe1e7] text-[#021337]",
  draft: "bg-[#ffe2a9] text-[#021337]",
  success: "bg-[#00a349] text-white",
  ended: "bg-[#00a349] text-white",
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
  isCircle = false,
  isActive = false,
}: BadgeProps) {
  const radius = isCircle ? "rounded-full" : "rounded";
  const activeStyles = isActive ? "bg-black text-white" : "";
  return (
    <div
      className={`inline-flex items-center justify-center px-1.5 py-0 h-5 font-medium text-xs leading-4 text-nowrap ${variantStyles[variant]} ${className} ${radius} ${activeStyles}`}
    >
      {children}
    </div>
  );
}
