import type { ReactNode, ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
  variants: {
    variant: {
      primary: "bg-[#0066ff] text-white rounded hover:bg-[#0052cc] focus-visible:ring-[#0066ff]",
      secondary: "bg-[#e6e9ed] text-[#021337] rounded hover:bg-[#d4d8dd] focus-visible:ring-[#e6e9ed]",
      danger: "bg-[#ff3131] text-white rounded hover:bg-[#e52c2c] focus-visible:ring-[#ff3131]",
      success: "bg-[#00a349] text-white rounded hover:bg-[#009440] focus-visible:ring-[#00a349]",
      ghost: "bg-transparent text-[#021337] rounded hover:bg-[#f1caca] focus-visible:ring-gray-300",
      outline: "bg-white border border-[#cfd6de] text-[#021337] rounded hover:bg-gray-50 focus-visible:ring-gray-300",
      tab: "h-10 px-4 bg-transparent border-0 rounded-none text-[13px] leading-4",
    },
    size: {
      sm: "h-8 px-3 text-[13px] leading-4",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    },
    isActive: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "tab",
      isActive: true,
      class: "text-[#021337] border-b-2 border-[#021337]",
    },
    {
      variant: "tab",
      isActive: false,
      class: "text-[#4e5a73]",
    },
  ],
  defaultVariants: {
    variant: "primary",
    // size default is handled in component to allow unsetting it for 'tab' variant
  },
});

type ButtonVariants = VariantProps<typeof button>;

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">, Omit<ButtonVariants, "isActive"> {
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
  // Disable size styles for tab variant to avoid conflicts
  const finalSize = variant === "tab" ? undefined : size;

  return (
    <button
      type="button"
      className={button({ variant, size: finalSize, isActive, className })}
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

