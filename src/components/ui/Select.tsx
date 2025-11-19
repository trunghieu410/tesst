import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  options?: { value: string; label: string }[];
  className?: string;
}

export function Select({
  value,
  onChange,
  placeholder = "Select...",
  icon,
  options = [],
  className = "",
}: SelectProps) {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {icon}
        </div>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-8 bg-white border border-[#cfd6de] rounded-md ${
          icon ? "pl-9" : "pl-3"
        } pr-8 py-2 font-normal text-[13px] leading-4 appearance-none cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
          value ? "text-[#021337]" : "text-[#677187]"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#677187]" />
    </div>
  );
}
