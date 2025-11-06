import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/common";
import { Button } from "./Button";
import { XIcon } from "@/icon/XIcon";
import useClickOutside from "@/hooks/useClickOutside";

// useClickOutside is now a shared hook

interface MultipleSelectItem {
  value: string;
  label: string;
}

interface MultipleSelectDropdownProps {
  /** Array of options */
  options: MultipleSelectItem[];
  /** Placeholder (main label) - always shown */
  placeholder?: string;
  /** Additional classes for the trigger button */
  className?: string;
  /** Disable interaction */
  disabled?: boolean;
  /** Custom trigger content */
  children?: ReactNode;
  /** Optional callback to receive current selected values */
  onSelectedChange?: (values: string[]) => void;
  /** Optional initial selected values */
  initialValues?: string[];
}

export function MultipleSelectDropdown({
  options,
  placeholder = "Select...",
  className,
  disabled = false,
  children,
  onSelectedChange,
  initialValues = [],
}: MultipleSelectDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [values, setValues] = useState<string[]>(initialValues);

  const domNode = useClickOutside<HTMLDivElement>(() => {
    setDropdownOpen(false);
  });

  const selectedCount = values.length;

  const toggleValue = (val: string) => {
    const exists = values.includes(val);
    const next = exists ? values.filter((v) => v !== val) : [...values, val];
    setValues(next);
    onSelectedChange?.(next);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setValues([]);
    onSelectedChange?.([]);
  };

  const triggerLabel = () => {
    // Always show placeholder (main label) or custom children
    if (children) return children;
    return placeholder;
  };

  return (
    <div ref={domNode} className="relative">
      {/*MultipleSelectDropdown trigger*/}
      <Button
        variant="outline"
        size="sm"
        onClick={() => !disabled && setDropdownOpen(!dropdownOpen)}
        disabled={disabled}
        className={cn(
          "justify-between min-w-[120px] bg-white border-[#cfd6de] text-[#021337] hover:bg-gray-50 px-2.5!",
          className
        )}
        rightIcon={
          <div className="flex items-center gap-2">
            {selectedCount > 0 && (
              <>
                <span
                  className={cn(
                    "bg-[#e5240c] text-white rounded-full border border-white w-4 h-4 inline-flex items-center justify-center text-[10px] font-medium"
                  )}
                >
                  {selectedCount}
                </span>
                <button
                  type="button"
                  aria-label="Clear selection"
                  className="text-[#677187] hover:text-[#021337]"
                  onClick={handleClear}
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </>
            )}
            {selectedCount === 0 && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200 text-[#677187]",
                  dropdownOpen && "rotate-180"
                )}
              />
            )}
          </div>
        }
      >
        {triggerLabel()}
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
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                toggleValue(option.value);
              }}
              className={cn(
                "w-full justify-start rounded-none px-4 py-2 text-left",
                checked
                  ? "bg-[#ff3131]! text-white hover:bg-[#f1caca]"
                  : "hover:bg-[#f1caca]"
              )}
            >
              <div className="flex items-center gap-3 text-inherit">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleValue(option.value)}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "size-4 rounded border border-[#cfd6de]",
                    checked && "accent-white"
                  )}
                />
                <span>{option.label}</span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default MultipleSelectDropdown;
