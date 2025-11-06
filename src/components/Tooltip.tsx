import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  tooltipsText: string;
}

export function Tooltip({
  children,
  tooltipsText,
  position = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  const getTooltipClasses = () => {
    const baseClasses =
      "max-w-[264px] w-auto z-50 text-wrap rounded bg-black px-4 py-1.5 text-[13px] font-regular text-white shadow-lg fixed";

    // Use transforms to center relative to trigger without needing tooltip dimensions
    if (position === "top") {
      return `${baseClasses} -translate-x-1/2 -translate-y-full`;
    }
    if (position === "bottom") {
      return `${baseClasses} -translate-x-1/2`;
    }
    if (position === "left") {
      return `${baseClasses} -translate-y-1/2 -translate-x-full`;
    }
    if (position === "right") {
      return `${baseClasses} -translate-y-1/2`;
    }
    return baseClasses;
  };

  const getArrowClasses = () => {
    const baseArrowClasses = "absolute -z-10";

    switch (position) {
      case "right":
        return `${baseArrowClasses} -left-1.5 top-1/2 -translate-y-1/2 border-r-[6px] border-r-black border-y-[6px] border-y-transparent`;
      case "top":
        return `${baseArrowClasses} -bottom-1.5 left-1/2 -translate-x-1/2 border-t-[6px] border-t-black border-x-[6px] border-x-transparent`;
      case "left":
        return `${baseArrowClasses} -right-1.5 top-1/2 -translate-y-1/2 border-l-[6px] border-l-black border-y-[6px] border-y-transparent`;
      case "bottom":
        return `${baseArrowClasses} left-1/2 -top-1.5 -translate-x-1/2 border-b-[6px] border-b-black border-x-[6px] border-x-transparent`;
      default:
        return baseArrowClasses;
    }
  };

  const getTooltipPosition = () => {
    if (!triggerRef.current) return {};

    const rect = triggerRef.current.getBoundingClientRect();

    switch (position) {
      case "right":
        return {
          left: rect.right + 12, // spacing
          top: rect.top + rect.height / 2,
        };
      case "top":
        return {
          left: rect.left + rect.width / 2,
          top: rect.top - 12, // spacing
        };
      case "left":
        return {
          left: rect.left - 12, // spacing
          top: rect.top + rect.height / 2,
        };
      case "bottom":
        return {
          left: rect.left + rect.width / 2,
          top: rect.bottom + 12, // spacing
        };
      default:
        return {};
    }
  };

  const tooltipContent = isVisible ? (
    <div className={getTooltipClasses()} style={getTooltipPosition()}>
      <span className={getArrowClasses()}></span>
      {tooltipsText}
    </div>
  ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {createPortal(tooltipContent, document.body)}
    </>
  );
}
