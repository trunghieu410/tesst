import { XCircleIcon } from "@/icon/XCircleIcon";
import { useState } from "react";

interface InputTagLabelsProps {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  optionalText?: string;
  placeholder?: string;
  className?: string;
}

export function InputTagLabels({
  value = [],
  onChange,
  label = "Nhãn chiến dịch",
  optionalText = "Không bắt buộc",
  placeholder = "Nhập nhãn và nhấn Enter",
  className,
}: InputTagLabelsProps) {
  const safeValue = Array.isArray(value) ? value : [];
  const [inputValue, setInputValue] = useState("");

  const removeTag = (tag: string) => {
    const newTags = safeValue.filter((t) => t !== tag);
    onChange(newTags);
  };

  const addTag = (tag: string) => {
    const normalized = tag.trim();
    if (!normalized) return;
    if (!safeValue.includes(normalized)) {
      const newTags = [...safeValue, normalized];
      onChange(newTags);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        // Support comma-separated input
        const parts = inputValue
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);
        if (parts.length > 0) {
          // Add all valid tags at once
          const newTags = [...safeValue];
          parts.forEach((part) => {
            const normalized = part.trim();
            if (normalized && !newTags.includes(normalized)) {
              newTags.push(normalized);
            }
          });
          if (newTags.length > safeValue.length) {
            onChange(newTags);
            setInputValue("");
          }
        }
      }
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (inputValue.trim()) {
      const parts = inputValue
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      // Add all valid tags at once
      const newTags = [...safeValue];
      parts.forEach((part) => {
        const normalized = part.trim();
        if (normalized && !newTags.includes(normalized)) {
          newTags.push(normalized);
        }
      });
      if (newTags.length > safeValue.length) {
        onChange(newTags);
        setInputValue("");
      }
    }
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
      <div className="relative">
        <div className="bg-white border border-[#cfd6de] rounded-md px-2.5 py-1 flex flex-wrap items-center gap-2.5 max-h-32 overflow-y-auto">
          {safeValue.map((tag) => (
            <div
              key={tag}
              className="bg-[#e6e9ed] rounded px-1.5 h-5 inline-flex items-center gap-1"
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
                aria-label={`Remove ${tag}`}
              >
                <XCircleIcon className="w-3 h-3" />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="min-w-[120px] flex-1 py-1.5 text-[13px] leading-4 text-[#021337] placeholder:text-[#677187] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
