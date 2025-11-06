import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/common";
import { Button } from "./Button";
import useClickOutside from "@/hooks/useClickOutside";

// useClickOutside is now a shared hook

interface DropdownItem {
  value: string;
  label: string;
}

interface DropdownProps {
  /**
   * Array of dropdown options
   */
  options: DropdownItem[];
  /**
   * Currently selected value
   */
  value: string;
  /**
   * Callback when selection changes
   */
  onChange: (value: string) => void;
  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string;
  /**
   * Additional CSS classes for the trigger button
   */
  className?: string;
  /**
   * Whether the dropdown is disabled
   */
  disabled?: boolean;
  /**
   * Custom trigger content
   */
  children?: ReactNode;
}

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  disabled = false,
  children,
}: DropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const domNode = useClickOutside<HTMLDivElement>(() => {
    setDropdownOpen(false);
  });

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setDropdownOpen(false);
  };

  return (
    <div ref={domNode} className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
        disabled={disabled}
        className={cn(
          "justify-between min-w-[120px] bg-white border-[#cfd6de] text-[#021337] hover:bg-gray-50",
          className
        )}
        rightIcon={
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200 text-[#677187]",
              dropdownOpen && "rotate-180"
            )}
          />
        }
      >
        {children || selectedOption?.label || placeholder}
      </Button>

      {/* Dropdown Menu */}
      <div
        className={cn(
          "absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transition-all duration-200",
          dropdownOpen
            ? "top-full opacity-100 visible"
            : "top-[110%] invisible opacity-0"
        )}
      >
        {options.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            onClick={() => handleSelect(option.value)}
            className={cn(
              "w-full justify-start rounded-none px-4 py-2 text-left",
              option.value === value
                ? "bg-[#ff3131]! text-white hover:bg-[#f1caca]"
                : "hover:bg-[#f1caca]"
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
