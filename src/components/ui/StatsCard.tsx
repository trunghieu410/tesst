import { cn } from "@/lib/utils/common";

interface StatsCardProps {
  /**
   * Label text shown above the value
   */
  label: string;
  /**
   * Main value to display
   */
  value: string | number;
  /**
   * Color variant for the value text
   */
  valueColor?: "default" | "primary" | "positive" | "negative";
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show a border on the left
   */
  showBorder?: boolean;
}

export function StatsCard({
  label,
  value,
  valueColor = "default",
  className,
  showBorder = false,
}: StatsCardProps) {
  const valueColors = {
    default: "text-[#021337]",
    primary: "text-[#ff3b34]",
    positive: "text-[#00a349]",
    negative: "text-[#e5240c]",
  };

  return (
    <div
      className={cn(
        "flex md:gap-[8px] items-start md:items-center px-[16px] py-[8px] shrink-0 flex-col md:flex-row ",
        showBorder && "border-l border-[#cfd6de]",
        className
      )}
    >
      {label && (
        <p className="font-normal leading-[16px] text-[#021337] text-[12px] whitespace-nowrap">
          {label}
        </p>
      )}
      {value && (
        <p
          className={cn(
            "font-semibold leading-[20px] text-[14px] whitespace-nowrap",
            valueColors[valueColor]
          )}
        >
          {value}
        </p>
      )}
    </div>
  );
}

interface CompactStatsCardProps {
  /**
   * Label text shown above the value
   */
  label: string;
  /**
   * Main value to display
   */
  value: string | number;
  /**
   * Percentage or secondary text
   */
  percentage?: string;
  /**
   * Color variant for the value text
   */
  valueColor?: "default" | "positive" | "warning" | "negative";
  /**
   * Additional CSS classes
   */
  className?: string;
}

export function CompactStatsCard({
  label,
  value,
  percentage,
  valueColor = "default",
  className,
}: CompactStatsCardProps) {
  const valueColorClasses = {
    default: "text-[#021337]",
    positive: "text-[#00a349]",
    warning: "text-[#f59e0b]",
    negative: "text-[#e5240c]",
  };

  const percentageColorClasses = {
    default: "text-[#677187]",
    positive: "text-[#00a349]",
    warning: "text-[#f59e0b]",
    negative: "text-[#e5240c]",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        className
      )}
    >
      {/* Panel - Label section */}
      <div className="flex gap-2 items-center justify-center px-3 pt-2 pb-0 w-full rounded-tl-md rounded-tr-md">
        <p className="text-[10px] font-normal leading-[14px] text-[#677187] text-center w-[83px]">
          {label}
        </p>
      </div>

      {/* Content section */}
      <div className="flex flex-col gap-1 items-center justify-center px-3 pt-0 pb-2 rounded-[5px] w-full overflow-hidden">
        <p className={cn(
          "text-[18px] font-semibold leading-[26px] w-[73px]",
          valueColorClasses[valueColor]
        )}>
          {value}
        </p>
        {percentage && (
          <p className={cn(
            "text-[12px] font-normal leading-4 text-center whitespace-nowrap",
            valueColor === "default" ? "text-[#677187]" : percentageColorClasses[valueColor]
          )}>
            {percentage}
          </p>
        )}
      </div>
    </div>
  );
}

