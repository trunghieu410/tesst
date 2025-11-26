import type { ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badge = tv({
  base: "inline-flex items-center justify-center px-1.5 py-0 h-5 font-medium text-xs leading-4 text-nowrap",
  variants: {
    variant: {
      default: "bg-[#dbe1e7] text-[#021337]",
      draft: "bg-[#ffe2a9] text-[#021337]",
      success: "bg-[#00a349] text-white",
      ended: "bg-[#00a349] text-white",
      error: "bg-[#e5240c] text-white",
      danger: "bg-[#e5240c] text-white",
      warning: "bg-[#ffe2a9] text-[#021337]",
      pending: "bg-[#e6e9ed] text-[#021337]",
      approved: "bg-[#acf1d6] text-[#021337]",
    },
    isCircle: {
      true: "rounded-full",
      false: "rounded",
    },
    isActive: {
      true: "bg-black text-white",
      false: "",
    },
  },
  defaultVariants: {
    variant: "default",
    isCircle: false,
    isActive: false,
  },
});

export type BadgeVariant = VariantProps<typeof badge>["variant"];

interface BadgeProps extends VariantProps<typeof badge> {
  children: ReactNode;
  className?: string;
}

export function Badge({
  children,
  variant,
  className,
  isCircle,
  isActive,
}: BadgeProps) {
  return (
    <div
      className={badge({ variant, isCircle, isActive, className })}
    >
      {children}
    </div>
  );
}

