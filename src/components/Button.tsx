import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/common";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   */
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "ghost"
    | "outline"
    | "tab";
  /**
   * Size of the button
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
  /**
   * Icon to display on the left side
   */
  leftIcon?: ReactNode;
  /**
   * Icon to display on the right side
   */
  rightIcon?: ReactNode;
  /**
   * Button content
   */
  children: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether this is an active tab button
   */
  isActive?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  isActive = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center gap-2 font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",

        // Size variants (only apply if not tab)
        variant !== "tab" && size === "sm" && "h-8 px-3 text-[13px] leading-4",
        variant !== "tab" && size === "md" && "h-10 px-4 text-sm",
        variant !== "tab" && size === "lg" && "h-12 px-6 text-base",

        // Style variants
        variant === "primary" &&
          "bg-[#0066ff] text-white rounded hover:bg-[#0052cc] focus-visible:ring-[#0066ff]",
        variant === "secondary" &&
          "bg-[#e6e9ed] text-[#021337] rounded hover:bg-[#d4d8dd] focus-visible:ring-[#e6e9ed]",
        variant === "danger" &&
          "bg-[#ff3131] text-white rounded hover:bg-[#e52c2c] focus-visible:ring-[#ff3131]",
        variant === "success" &&
          "bg-[#00a349] text-white rounded hover:bg-[#009440] focus-visible:ring-[#00a349]",
        variant === "ghost" &&
          "bg-transparent text-[#021337] hover:bg-[#f1caca] rounded focus-visible:ring-gray-300",
        variant === "outline" &&
          "bg-white border border-[#cfd6de] text-[#021337] rounded hover:bg-gray-50 focus-visible:ring-gray-300",

        // Tab variant
        variant === "tab" &&
          "h-10 px-4 bg-transparent border-0 rounded-none text-[13px] leading-4",
        variant === "tab" &&
          isActive &&
          "text-[#021337] border-b-2 border-[#021337]",
        variant === "tab" && !isActive && "text-[#4e5a73]",

        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
