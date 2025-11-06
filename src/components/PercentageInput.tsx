import { cn } from "@/lib/utils/common";

interface PercentageInputProps {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PercentageInput({
  label,
  description,
  value,
  onChange,
  className
}: PercentageInputProps) {
  return (
    <div className={cn(
      "border-b border-[#cfd6de] border-solid flex items-start p-4 w-full gap-7",
      className
    )}>
      {/* Label and Description */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-normal text-[#021337] leading-4 whitespace-nowrap">
            {label}
          </p>
          <p className="text-sm font-normal text-[#677187] leading-4">
            {description}
          </p>
        </div>
      </div>

      {/* Input Field */}
      <div className="w-40 flex-shrink-0">
        <div className="bg-white border border-[#cfd6de] rounded-lg h-10 flex items-center px-3 gap-2">
          <span className="text-sm font-medium text-[#021337]">%</span>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-sm font-normal text-[#021337] bg-transparent border-0 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
