import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/common";
import useClickOutside from "@/hooks/useClickOutside";
import { useIsMobile } from "@/hooks/use-mobile";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";
import { areDatesEqual, formatDateForDisplay, isDayInRange, toUtcIsoString } from "@/lib/utils/date";

export interface DateRangeValue {
  start: string;  // ISO 8601 UTC format: "YYYY-MM-DDTHH:mm:ssZ"
  end: string;    // ISO 8601 UTC format: "YYYY-MM-DDTHH:mm:ssZ"
}

interface DateRangeInputProps {
  value: DateRangeValue | null;
  onChange: (value: DateRangeValue) => void;
  className?: string;
  showYear?: boolean;
}

// Constants
const TOTAL_CALENDAR_SLOTS = 42; // 6 rows * 7 days
const WEEKDAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export function DateRangeInput({
  value,
  onChange,
  className = "",
  showYear = false,
}: DateRangeInputProps) {
  const isMobile = useIsMobile();

  // State management
  const [currentDate, setCurrentDate] = useState(() => {
    if (value) {
      return new Date(value.start);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Click outside handler
  const datepickerRef = useClickOutside<HTMLDivElement>(
    () => {
      if (!isMobile && selectedStartDate) {
        setIsOpen(false);
      }
    },
    { enabled: isOpen && !isMobile }
  );

  // Parse value to set initial dates
  useEffect(() => {
    if (value) {
      const startDate = new Date(value.start);
      const endDate = new Date(value.end);
      // If end is same as start, treat it as a single day (no end range)
      const isSingleDay = value.start === value.end;

      setSelectedStartDate(startDate);
      setSelectedEndDate(isSingleDay ? null : endDate);
      
      // Only update current view if not already viewing relevant month
      // logic could be improved but simple check:
      // setCurrentDate(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
    } else {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
    setIsInitialized(true);
  }, [value]);

  // Update parent value when dates change (desktop only)
  useEffect(() => {
    if (!isInitialized || isMobile) return;

    if (selectedStartDate) {
      const startIso = toUtcIsoString(selectedStartDate);
      const endIso = selectedEndDate ? toUtcIsoString(selectedEndDate) : startIso;

      // Check if value actually changed to avoid loops
      if (!value || value.start !== startIso || value.end !== endIso) {
        onChange({ start: startIso, end: endIso });
      }
    }
  }, [selectedStartDate, selectedEndDate, isInitialized, isMobile, value, onChange]);

  // Initialize temp states when opening on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setTempStartDate(selectedStartDate);
      setTempEndDate(selectedEndDate);
    }
  }, [isMobile, isOpen, selectedStartDate, selectedEndDate]);

  // Event handlers
  const toggleDatepicker = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
      return newDate;
    });
  }, []);

  const handleDayClick = useCallback(
    (day: Date, useTempState: boolean = false) => {
      // Create a new date object to avoid reference issues
      const clickedDate = new Date(day);

      if (useTempState) {
        // Mobile: update temp states
        if (!tempStartDate || (tempStartDate && tempEndDate)) {
          setTempStartDate(clickedDate);
          setTempEndDate(null);
        } else {
          if (clickedDate < tempStartDate) {
            setTempEndDate(tempStartDate);
            setTempStartDate(clickedDate);
          } else {
            setTempEndDate(clickedDate);
          }
        }
      } else {
        // Desktop: update actual states
        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
          setSelectedStartDate(clickedDate);
          setSelectedEndDate(null);
        } else {
          if (clickedDate < selectedStartDate) {
            setSelectedEndDate(selectedStartDate);
            setSelectedStartDate(clickedDate);
          } else {
            setSelectedEndDate(clickedDate);
          }
        }
      }
    },
    [tempStartDate, tempEndDate, selectedStartDate, selectedEndDate]
  );

  const handleClear = useCallback(() => {
    if (isMobile) {
      setTempStartDate(null);
      setTempEndDate(null);
    } else {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  }, [isMobile]);

  const handleDefault = useCallback(() => {
    setTempStartDate(null);
    setTempEndDate(null);
  }, []);

  const handleApply = useCallback(() => {
    setSelectedStartDate(tempStartDate);
    setSelectedEndDate(tempEndDate);

    if (tempStartDate) {
      const startIso = toUtcIsoString(tempStartDate);
      const endIso = tempEndDate ? toUtcIsoString(tempEndDate) : startIso;
      
      onChange({ start: startIso, end: endIso });
    }
    
    setIsOpen(false);
  }, [tempStartDate, tempEndDate, onChange]);

  const renderMonthHeader = useCallback(
    (monthOffset: number = 0) => {
      const baseDate = new Date(currentDate);
      baseDate.setMonth(baseDate.getMonth() + monthOffset);
      return `Tháng ${baseDate.getMonth() + 1} năm ${baseDate.getFullYear()}`;
    },
    [currentDate]
  );

  const renderCalendar = useCallback(
    (monthOffset: number = 0, useTempState: boolean = false) => {
      const baseDate = new Date(currentDate);
      baseDate.setMonth(baseDate.getMonth() + monthOffset);

      const year = baseDate.getFullYear();
      const month = baseDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

      // Use temp states on mobile, regular states on desktop
      const startDate = useTempState ? tempStartDate : selectedStartDate;
      const endDate = useTempState ? tempEndDate : selectedEndDate;

      const daysArray: React.JSX.Element[] = [];

      for (let i = 0; i < TOTAL_CALENDAR_SLOTS; i++) {
        const dayOffset = i - firstDayOfMonth + 1;
        const day = new Date(year, month, dayOffset);
        const isCurrentMonth = day.getMonth() === month;

        // Date state checks
        const isStartDate = isCurrentMonth && startDate && areDatesEqual(day, startDate);
        const isEndDate = isCurrentMonth && endDate && areDatesEqual(day, endDate);
        const isInRange = isCurrentMonth && isDayInRange(day, startDate, endDate);
        const isRangeStart = isStartDate && endDate && startDate.getTime() !== endDate.getTime();
        const isRangeEnd = isEndDate && startDate && startDate.getTime() !== endDate.getTime();

        // Boundary checks for rounded corners
        const isSunday = day.getDay() === 0;
        const isSaturday = day.getDay() === 6;
        const isFirstDayOfMonth = day.getDate() === 1;
        const isLastDayOfMonth = day.getDate() === daysInCurrentMonth;
        const shouldRoundLeft = isSunday || isFirstDayOfMonth;
        const shouldRoundRight = isSaturday || isLastDayOfMonth;

        daysArray.push(
          <div
            key={i}
            className={cn(
              "relative h-8 w-full flex items-center justify-center mb-1",
              isCurrentMonth ? "cursor-pointer" : "cursor-default"
            )}
            onClick={() => isCurrentMonth && handleDayClick(day, useTempState)}
          >
            {/* Range background */}
            {isInRange && (
              <div
                className={cn(
                  "absolute inset-0 bg-[#FFD3D5]",
                  shouldRoundLeft && "rounded-l-[6px]",
                  shouldRoundRight && "rounded-r-[6px]"
                )}
              />
            )}
            {/* Range start half background */}
            {isRangeStart && (
              <div
                className={cn(
                  "absolute right-0 top-0 bottom-0 w-1/2 bg-[#FFD3D5]",
                  shouldRoundRight && "rounded-r-[6px]"
                )}
              />
            )}
            {/* Range end half background */}
            {isRangeEnd && (
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-1/2 bg-[#FFD3D5]",
                  shouldRoundLeft && "rounded-l-[6px]"
                )}
              />
            )}

            {/* Day number */}
            <div
              className={cn(
                "relative z-10 h-8 w-8 flex items-center justify-center rounded-[6px] transition-colors text-[14px]",
                isStartDate || isEndDate
                  ? "bg-[#FF3B34] text-white"
                  : isCurrentMonth
                  ? "hover:bg-gray-100"
                  : "text-[#B0B5C1]"
              )}
            >
              {day.getDate()}
            </div>
          </div>
        );
      }

      return daysArray;
    },
    [currentDate, tempStartDate, tempEndDate, selectedStartDate, selectedEndDate, handleDayClick]
  );

  // Memoized weekday headers
  const weekdayHeaders = useMemo(
    () =>
      WEEKDAY_LABELS.map((day, index) => (
        <div key={index} className="flex h-6 w-11 items-center justify-center text-[14px] color-[#2C2A2A] font-bold">
          {day}
        </div>
      )),
    []
  );

  const weekdayHeadersMobile = useMemo(
    () =>
      WEEKDAY_LABELS.map((day, index) => (
        <div key={index} className="flex h-6 w-full items-center justify-center text-[14px] color-[#2C2A2A] font-bold">
          {day}
        </div>
      )),
    []
  );

  const displayValue = useMemo(() => {
    if (selectedStartDate && selectedEndDate) {
      return `${formatDateForDisplay(selectedStartDate, showYear)} - ${formatDateForDisplay(selectedEndDate, showYear)}`;
    }
    if (selectedStartDate) {
      return formatDateForDisplay(selectedStartDate, showYear);
    }
    return "";
  }, [selectedStartDate, selectedEndDate, showYear]);

  return (
    <div className={cn("relative", className)} ref={datepickerRef}>
      {/* Input trigger */}
      <div onClick={toggleDatepicker} className="cursor-pointer">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Calendar className="w-4 h-4 text-[#677187]" />
        </div>
        <input
          type="text"
          value={displayValue}
          placeholder="Select date range"
          className="w-full h-8 bg-white border border-[#cfd6de] rounded-md pl-9 pr-8 py-2 font-normal text-[14px] leading-4 text-[#021337] placeholder:text-[#677187] focus:outline-none cursor-pointer"
          readOnly
        />
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#677187]" />
      </div>

      {/* Desktop Popover */}
      {isOpen && !isMobile && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#cfd6de] rounded-md shadow-lg z-50 p-3 w-[250px]">
          {/* Header with navigation */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[14px] font-medium text-[#021337]">
              {renderMonthHeader()}
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigateMonth("prev")}
                className="flex h-7 w-7 items-center justify-center rounded border border-[#cfd6de] bg-white text-[#021337] hover:bg-gray-50 focus:outline-none transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={() => navigateMonth("next")}
                className="flex h-7 w-7 items-center justify-center rounded border border-[#cfd6de] bg-white text-[#021337] hover:bg-gray-50 focus:outline-none transition-colors"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-0 mb-1 text-[14px] font-medium text-[#677187] uppercase">
            {weekdayHeaders}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0 text-[14px] font-medium text-[#021337]">
            {renderCalendar(0, false)}
          </div>

          {/* Date range display */}
          <div className="flex items-center justify-center gap-2 pt-3 mt-3 border-t border-[#cfd6de]">
            <button className="h-7 rounded border border-[#cfd6de] bg-transparent px-2 text-[14px] font-medium text-[#677187] hover:border-[#FF3B34] focus:outline-none transition-colors">
              {selectedStartDate ? formatDateForDisplay(selectedStartDate, showYear) : "Bắt đầu"}
            </button>
            {" - "}
            <button className="h-7 rounded border border-[#cfd6de] bg-transparent px-2 text-[14px] font-medium text-[#677187] hover:border-[#FF3B34] focus:outline-none transition-colors">
              {selectedEndDate ? formatDateForDisplay(selectedEndDate, showYear) : "Kết thúc"}
            </button>
          </div>
        </div>
      )}

      {/* Mobile BottomSheet */}
      {isMobile && (
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Thời gian"
          rightAction={
            <button onClick={handleClear} className="text-[#0066ff] font-medium">
              Clear
            </button>
          }
          footer={
            <div className="flex gap-3">
              <Button variant="outline" size="md" onClick={handleDefault} className="flex-1">
                Mặc Định
              </Button>
              <Button variant="primary" size="md" onClick={handleApply} className="flex-1">
                Áp Dụng
              </Button>
            </div>
          }
        >
          {/* Two Months Display */}
          <div className="space-y-6">
            {[0, 1].map((offset) => (
              <div key={offset}>
                <h3 className="text-[14px] font-medium text-[#021337] mb-3">
                  {renderMonthHeader(offset)}
                </h3>
                <div className="grid grid-cols-7 gap-0 mb-1 text-[11px] font-medium text-[#677187] uppercase">
                  {weekdayHeadersMobile}
                </div>
                <div className="grid grid-cols-7 gap-0 text-[14px] font-medium text-[#021337]">
                  {renderCalendar(offset, true)}
                </div>
              </div>
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
