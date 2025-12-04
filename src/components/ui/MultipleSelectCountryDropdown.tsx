import { useState, type ReactNode, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/common";
import { Button } from "./Button";
import { XIcon } from "@/icon/XIcon";
import useClickOutside from "@/hooks/useClickOutside";
import { useIsMobile } from "@/hooks/use-mobile";
import { BottomSheet } from "./BottomSheet";
import { useCountries } from "@/lib/queries/useCountries";

interface MultipleSelectItem {
  value: string;
  label: string;
}

interface MultipleSelectCountryDropdownProps {
  /** Placeholder (main label) - always shown */
  placeholder?: string;
  /** Additional classes for the trigger button */
  className?: string;
  /** Custom trigger content */
  children?: ReactNode;
  /** Optional callback to receive current selected ISO codes */
  onSelectedChange?: (isoCodes: string[]) => void;
  /** Optional initial selected ISO codes */
  initialValues?: string[];
  /** Title for the mobile bottom sheet */
  mobileTitle?: string;
}

export function MultipleSelectCountryDropdown({
  placeholder = "Quốc gia",
  className,
  children,
  onSelectedChange,
  initialValues = [],
  mobileTitle = "Quốc gia",
}: MultipleSelectCountryDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedIsoCodes, setSelectedIsoCodes] = useState<string[]>(initialValues);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  // Fetch countries data
  const { data: countriesData, isLoading, error } = useCountries();

  const domNode = useClickOutside<HTMLDivElement>(() => {
    if (!isMobile) {
      setDropdownOpen(false);
      setSearchQuery("");
    }
  });

  // Focus search input when dropdown opens
  useEffect(() => {
    if (dropdownOpen && searchInputRef.current && !isMobile) {
      searchInputRef.current.focus();
    }
  }, [dropdownOpen, isMobile]);

  // Clear search query when dropdown closes
  useEffect(() => {
    if (!dropdownOpen) {
      setSearchQuery("");
    }
  }, [dropdownOpen]);

  const selectedCount = selectedIsoCodes.length;

  // Transform countries data to options format
  const allOptions: MultipleSelectItem[] = useMemo(() => {
    if (!countriesData?.data) return [];
    return countriesData.data.map((country) => ({
      value: country.iso,
      label: country.niceName,
    }));
  }, [countriesData]);

  // Filter and sort options: selected first, then search filtered
  const displayedOptions = useMemo(() => {
    let filtered = allOptions;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort: selected items first, then alphabetically
    const selected = filtered.filter((option) =>
      selectedIsoCodes.includes(option.value)
    );
    const unselected = filtered.filter(
      (option) => !selectedIsoCodes.includes(option.value)
    );

    return [...selected, ...unselected];
  }, [allOptions, searchQuery, selectedIsoCodes]);

  const toggleValue = (isoCode: string) => {
    const exists = selectedIsoCodes.includes(isoCode);
    const next = exists
      ? selectedIsoCodes.filter((code) => code !== isoCode)
      : [...selectedIsoCodes, isoCode];
    setSelectedIsoCodes(next);
    onSelectedChange?.(next);
  };

  const handleClear = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIsoCodes([]);
    onSelectedChange?.([]);
  };

  const triggerLabel = () => {
    // Always show placeholder (main label) or custom children
    if (children) return children;
    return placeholder;
  };

  const renderOptionsList = () => (
    <div
      className={cn(
        "overflow-y-auto",
        isMobile ? "max-h-[220px]" : "max-h-48"
      )}
    >
      {displayedOptions.length > 0 ? (
        displayedOptions.map((option) => {
          const checked = selectedIsoCodes.includes(option.value);
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
                "w-full justify-between rounded-none px-4 py-3 text-left",
                checked
                  ? "bg-transparent text-[#021337]"
                  : "hover:bg-[#f1caca]",
                isMobile ? "h-[44px]" : ""
              )}
            >
              <div className="flex items-center gap-3 text-inherit w-full">
                <span className={`flag flag-${option.value.toLowerCase()} shrink-0 inline-block w-[13px] h-[10px]`}></span>
                <span className="flex-1 text-[13px]">{option.label}</span>
                {checked && <Check className="w-5 h-5 sm:w-4 sm:h-4 text-green-500" />}
              </div>
            </Button>
          );
        })
      ) : (
        <div className="px-4 py-2 text-[13px] text-gray-500 text-center">
          No countries found
        </div>
      )}
    </div>
  );

  const isDisabled = isLoading || !!error;

  return (
    <>
      <div ref={domNode} className="relative inline-block">
        {/* Country Dropdown trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => !isDisabled && setDropdownOpen(!dropdownOpen)}
          disabled={isDisabled}
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
                  <div
                    role="button"
                    aria-label="Clear selection"
                    className="text-[#677187] hover:text-[#021337] cursor-pointer"
                    onClick={handleClear}
                  >
                    <XIcon className="w-4 h-4" />
                  </div>
                </>
              )}
              {selectedCount === 0 && (
                <>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#677187]" />
                  ) : (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200 text-[#677187]",
                        dropdownOpen && "rotate-180"
                      )}
                    />
                  )}
                </>
              )}
            </div>
          }
        >
          {triggerLabel()}
        </Button>

        {/* Desktop Dropdown Menu */}
        {!isMobile && (
          <div
            className={cn(
              "absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 transition-all duration-200",
              dropdownOpen
                ? "top-full opacity-100 visible"
                : "top-[110%] invisible opacity-0"
            )}
          >
            {/* Search Input */}
            <div className="px-3 py-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-[13px] border border-gray-300 rounded-md focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Options List */}
            {renderOptionsList()}
          </div>
        )}
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <BottomSheet
          isOpen={dropdownOpen}
          onClose={() => setDropdownOpen(false)}
          title={mobileTitle}
          rightAction={
            <button
              onClick={() => handleClear()}
              className="text-[#0066ff] font-medium"
            >
              Clear
            </button>
          }
          footer={
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1 justify-center"
                onClick={() => handleClear()}
              >
                Mặc định
              </Button>
              <Button
                variant="primary"
                className="flex-1 justify-center"
                onClick={() => setDropdownOpen(false)}
              >
                Áp dụng
              </Button>
            </div>
          }
        >
          {/* Search Input for Mobile */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-[4px] text-base border border-gray-300 rounded-[8px] focus:outline-none"
              />
            </div>
          </div>
          {renderOptionsList()}
        </BottomSheet>
      )}
    </>
  );
}

export default MultipleSelectCountryDropdown;
