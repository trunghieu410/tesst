import { XCircleIcon } from "@/icon/XCircleIcon";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface CampaignLabelsProps {
  /**
   * Array of selected tag values
   */
  value: string[];
  /**
   * Callback when selected tags change
   */
  onChange: (tags: string[]) => void;
  /**
   * Array of available tag options (defaults to predefined campaign tags)
   */
  availableTags?: string[];
  /**
   * Label text for the field
   */
  label?: string;
  /**
   * Optional text shown next to label
   */
  optionalText?: string;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * CampaignLabels - A reusable multi-select dropdown component for selecting campaign labels/tags.
 *
 * Features:
 * - Multi-select functionality with dropdown
 * - Tag pills with remove buttons
 * - Outside click detection to close dropdown
 * - Customizable available options
 * - TypeScript support
 *
 * @example
 * ```tsx
 * const [selectedTags, setSelectedTags] = useState<string[]>([]);
 *
 * <CampaignLabels
 *   value={selectedTags}
 *   onChange={setSelectedTags}
 *   label="Campaign Tags"
 *   availableTags={["Hot", "New", "Featured"]}
 * />
 * ```
 */

export function CampaignLabels({
  value = [],
  onChange,
  availableTags = [
    "Hot",
    "Đề xuất",
    "Mới",
    "Đang diễn ra",
    "Sắp kết thúc",
    "VIP",
    "Premium",
    "Khuyến mãi",
    "Flash Sale",
    "Limited Time",
  ],
  label = "Nhãn chiến dịch",
  optionalText = "Không bắt buộc",
  placeholder = "Chọn nhãn",
  className,
}: CampaignLabelsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ref for dropdown container and outside click handling
  const dropdownRef = useClickOutside<HTMLDivElement>(
    () => setIsDropdownOpen(false),
    { enabled: isDropdownOpen }
  );

  const removeTag = (tag: string) => {
    const newTags = value.filter((t) => t !== tag);
    onChange(newTags);
  };

  const addTag = (tag: string) => {
    if (!value.includes(tag)) {
      const newTags = [...value, tag];
      onChange(newTags);
    }
  };

  const toggleTag = (tag: string) => {
    if (value.includes(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
    // Keep dropdown open for multiple selections
  };

  return (
    <div className={`flex flex-col gap-1 ${className || ""}`}>
      <div className="flex items-center gap-2">
        <label className="font-medium text-xs leading-4 text-[#021337]">
          {label}
        </label>
        <span className="font-normal text-xs leading-4 text-[#677187]">
          {optionalText}
        </span>
      </div>
      <div className="relative" ref={dropdownRef}>
        <div
          className="bg-white border border-[#cfd6de] rounded-md px-2.5 py-0 flex items-center gap-2.5 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {value.map((tag) => (
            <div
              key={tag}
              className="bg-[#e6e9ed] rounded px-1.5 h-5 flex items-center gap-1"
            >
              <span className="font-medium text-xs leading-4 text-[#021337]">
                {tag}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="w-3 h-3 flex items-center justify-center"
              >
                <XCircleIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
          <input
            type="text"
            placeholder={placeholder}
            className="flex-1 py-2 text-[13px] leading-4 text-[#021337] placeholder:text-[#677187] focus:outline-none cursor-pointer"
            readOnly
          />
          <ChevronDownIcon
            className={`w-[18px] h-[18px] transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#cfd6de] rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {availableTags.map((tag) => {
              const isSelected = value.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`w-full px-3 py-2 text-left text-[13px] leading-4 hover:bg-[#f1f1f1] transition-colors ${
                    isSelected
                      ? "bg-[#ff3131] text-white hover:bg-[#e62e2e]"
                      : "text-[#021337]"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
