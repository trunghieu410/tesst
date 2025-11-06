import type { ReactNode } from "react";
import { cn } from "@/lib/utils/common";

interface SettingsCardProps {
  /**
   * Title of the settings card
   */
  title: string;
  /**
   * Description text below the title
   */
  description: string;
  /**
   * Icon component to display on the right side
   */
  icon: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Click handler for the card
   */
  onClick?: () => void;
}

export function SettingsCard({
  title,
  description,
  icon,
  className,
  onClick,
}: SettingsCardProps) {
  return (
    <div
      className={cn(
        // Base styles from Figma design
        "border border-[#cfd6de] border-solid box-border",
        "content-stretch flex gap-2.5 items-start justify-end",
        "px-4 py-3 rounded-[10px] w-[280px]",
        // Hover effects
        "hover:bg-gray-50 transition-colors cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Text content */}
      <div className="flex flex-col gap-2.5 flex-1]">
        <h3 className="font-medium text-[16px] leading-5 text-[#021337] m-0">
          {title}
        </h3>
        <p className="font-normal text-[14px] leading-5 text-[#677187] m-0">
          {description}
        </p>
      </div>

      {/* Icon */}
      <div className="shrink-0 w-8 h-8 flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}
