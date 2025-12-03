import type { ReactNode } from "react";
import { cn } from "@/lib/utils/common";
import { InfoIcon } from "@/icon/InfoIcon";

interface SectionCardProps {
  /**
   * Title of the section
   */
  title: string;
  /**
   * Whether to show the info icon
   */
  showInfoIcon?: boolean;
  /**
   * Additional actions or elements to show in the header
   */
  headerActions?: ReactNode;
  /**
   * Content of the section
   */
  children: ReactNode;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
}

export function SectionCard({
  title,
  showInfoIcon = false,
  headerActions,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-md overflow-hidden flex flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 ">
        <div className="flex items-center gap-2">
          <h3 className="text-[14px] font-medium leading-5 text-[#021337] m-0">
            {title}
          </h3>
          {showInfoIcon && (
            <div className="w-4 h-4 text-[#a1abbf] flex items-center justify-center">
              <InfoIcon />
            </div>
          )}
        </div>
        {headerActions && (
          <div className="flex items-center">{headerActions}</div>
        )}
      </div>

      {/* Content */}
      <div className={cn(contentClassName)}>{children}</div>
    </div>
  );
}
