import React, { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/common";
import useClickOutside from "@/hooks/useClickOutside";
import { useIsMobile } from "@/hooks/use-mobile";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";

interface DateRangeInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  showYear?: boolean;
}

export function DateRangeInput({
  value,
  onChange,
  className = "",
  showYear = false,
}: DateRangeInputProps) {
  const isMobile = useIsMobile();
  
  const [currentDate, setCurrentDate] = useState(() => {
    // Initialize to October (month 9) to match the Publisher's initial value "1.10 - 30.11"
    const now = new Date();
    return new Date(now.getFullYear(), 9, 1); // October 1st
  });
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  
  // Temporary states for mobile (transactional selection)
  const [tempStartDate, setTempStartDate] = useState<string | null>(null);
  const [tempEndDate, setTempEndDate] = useState<string | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Bind click-outside to the container; close only when both dates are selected (desktop only)
  const datepickerRef = useClickOutside<HTMLDivElement>(
    () => {
      if (!isMobile && selectedStartDate && selectedEndDate) {
        setIsOpen(false);
      }
    },
    {
      enabled: isOpen && !isMobile,
    }
  );

  // Helper function to parse date string to Date object
  const parseDateString = (dateString: string): Date | null => {
    // Try different formats: "MM/DD/YYYY", "DD.MM", "DD.MM.YYYY"
    const formats = [
      // MM/DD/YYYY format
      (str: string) => {
        const parts = str.split("/");
        if (parts.length === 3) {
          const [month, day, year] = parts.map(Number);
          return new Date(year, month - 1, day);
        }
        return null;
      },
      // DD.MM or DD.MM.YYYY format
      (str: string) => {
        const parts = str.split(".");
        if (parts.length >= 2) {
          const [day, month, year] = parts.map(Number);
          const currentYear = year || new Date().getFullYear();
          return new Date(currentYear, month - 1, day);
        }
        return null;
      },
    ];

    for (const formatParser of formats) {
      const date = formatParser(dateString);
      if (date && !isNaN(date.getTime())) {
        return date;
      }
    }
    return null;
  };

  // Helper function to format date for display/output
  const formatDateForDisplay = (
    date: Date,
    showYear: boolean = false
  ): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    if (showYear) {
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return `${day}.${month}`;
  };

  // Parse value to set initial dates
  useEffect(() => {
    if (value) {
      const parts = value.split(" - ");
      if (parts.length === 2) {
        setSelectedStartDate(parts[0]);
        setSelectedEndDate(parts[1]);
        // Set current date to the month of the start date
        const startDate = parseDateString(parts[0]);
        if (startDate) {
          setCurrentDate(
            new Date(startDate.getFullYear(), startDate.getMonth(), 1)
          );
        }
      } else if (parts.length === 1) {
        setSelectedStartDate(parts[0]);
        setSelectedEndDate(null);
        // Set current date to the month of the selected date
        const selectedDate = parseDateString(parts[0]);
        if (selectedDate) {
          setCurrentDate(
            new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
          );
        }
      }
    } else {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
    setIsInitialized(true);
  }, [value]);

  // Update parent value when dates change (only after initialization and only on desktop)
  useEffect(() => {
    if (!isInitialized || isMobile) return;

    const startDate = selectedStartDate
      ? parseDateString(selectedStartDate)
      : null;
    const endDate = selectedEndDate ? parseDateString(selectedEndDate) : null;

    let newValue = "";
    if (startDate && endDate) {
      newValue = `${formatDateForDisplay(
        startDate,
        showYear
      )} - ${formatDateForDisplay(endDate, showYear)}`;
    } else if (startDate) {
      newValue = formatDateForDisplay(startDate, showYear);
    }

    // Only update if the value has actually changed
    if (newValue !== value) {
      onChange(newValue);
    }
  }, [
    selectedStartDate,
    selectedEndDate,
    onChange,
    isInitialized,
    value,
    showYear,
    isMobile,
  ]);

  // Initialize temp states when opening on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      setTempStartDate(selectedStartDate);
      setTempEndDate(selectedEndDate);
    }
  }, [isMobile, isOpen, selectedStartDate, selectedEndDate]);

  const renderCalendar = (monthOffset: number = 0, useTempState: boolean = false) => {
    const baseDate = new Date(currentDate);
    baseDate.setMonth(baseDate.getMonth() + monthOffset);
    
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray: React.JSX.Element[] = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Use temp states on mobile, regular states on desktop
    const startDateStr = useTempState ? tempStartDate : selectedStartDate;
    const endDateStr = useTempState ? tempEndDate : selectedEndDate;

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const dayString = day.toLocaleDateString("en-US");
      let className =
        "flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 mb-1 cursor-pointer transition-colors mx-auto";

      const startDate = startDateStr ? parseDateString(startDateStr) : null;
      const endDate = endDateStr ? parseDateString(endDateStr) : null;

      const isStartDate =
        startDate &&
        day.getDate() === startDate.getDate() &&
        day.getMonth() === startDate.getMonth() &&
        day.getFullYear() === startDate.getFullYear();

      const isEndDate =
        endDate &&
        day.getDate() === endDate.getDate() &&
        day.getMonth() === endDate.getMonth() &&
        day.getFullYear() === endDate.getFullYear();
      const isInRange =
        startDate && endDate && day > startDate && day < endDate;

      if (isStartDate) {
        className += " bg-[#ff3131] text-white";
      } else if (isEndDate) {
        className += " bg-[#ff3131] text-white";
      } else if (isInRange) {
        className += " bg-[#ff3131]/10";
      }

      daysArray.push(
        <div
          key={i}
          className={className}
          onClick={() => handleDayClick(dayString, useTempState)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  const handleDayClick = (selectedDay: string, useTempState: boolean = false) => {
    const clickedDate = parseDateString(selectedDay);
    if (!clickedDate) return;

    const formattedDate = formatDateForDisplay(clickedDate, showYear);

    if (useTempState) {
      // Mobile: update temp states
      if (!tempStartDate || (tempStartDate && tempEndDate)) {
        setTempStartDate(formattedDate);
        setTempEndDate(null);
      } else {
        const currentStart = parseDateString(tempStartDate);

        if (currentStart && clickedDate < currentStart) {
          setTempEndDate(tempStartDate);
          setTempStartDate(formattedDate);
        } else {
          setTempEndDate(formattedDate);
        }
      }
    } else {
      // Desktop: update actual states
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(formattedDate);
        setSelectedEndDate(null);
      } else {
        const currentStart = parseDateString(selectedStartDate);

        if (currentStart && clickedDate < currentStart) {
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate(formattedDate);
        } else {
          setSelectedEndDate(formattedDate);
        }
      }
    }
  };

  const toggleDatepicker = () => {
    setIsOpen(!isOpen);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleClear = () => {
    if (isMobile) {
      setTempStartDate(null);
      setTempEndDate(null);
    } else {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    }
  };

  const handleDefault = () => {
    setTempStartDate(null);
    setTempEndDate(null);
  };

  const handleApply = () => {
    // Commit temp states to actual states
    setSelectedStartDate(tempStartDate);
    setSelectedEndDate(tempEndDate);
    
    // Trigger onChange
    const startDate = tempStartDate ? parseDateString(tempStartDate) : null;
    const endDate = tempEndDate ? parseDateString(tempEndDate) : null;

    let newValue = "";
    if (startDate && endDate) {
      newValue = `${formatDateForDisplay(
        startDate,
        showYear
      )} - ${formatDateForDisplay(endDate, showYear)}`;
    } else if (startDate) {
      newValue = formatDateForDisplay(startDate, showYear);
    }

    onChange(newValue);
    setIsOpen(false);
  };

  const renderMonthHeader = (monthOffset: number = 0) => {
    const baseDate = new Date(currentDate);
    baseDate.setMonth(baseDate.getMonth() + monthOffset);
    return `Tháng ${baseDate.getMonth() + 1} năm ${baseDate.getFullYear()}`;
  };

  return (
    <div className={cn("relative", className)} ref={datepickerRef}>
      <div onClick={toggleDatepicker} className="cursor-pointer">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Calendar className="w-4 h-4 text-[#677187]" />
        </div>
        <input
          type="text"
          value={value}
          placeholder="Select date range"
          className="w-full h-8 bg-white border border-[#cfd6de] rounded-md pl-9 pr-8 py-2 font-normal text-[13px] leading-4 text-[#021337] placeholder:text-[#677187] focus:outline-none cursor-pointer"
          readOnly
        />
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#677187]" />
      </div>

      {/* Desktop Popover */}
      {isOpen && !isMobile && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#cfd6de] rounded-md shadow-lg z-50 p-3 w-[250px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-medium text-[#021337]">
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
                className="flex h-7 w-7 items-center justify-center rounded border border-[#cfd6de] bg-white text-[#021337] hover:bg-gray-50 focus:outline-none  transition-colors"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-0 mb-1 text-[13px] font-medium text-[#677187] uppercase">
            {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
              <div
                key={day}
                className="flex h-6 w-11 items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0 text-[13px] font-medium text-[#021337]">
            {renderCalendar(0, false)}
          </div>

          <div className="flex items-center justify-center gap-2 pt-3 mt-3 border-t border-[#cfd6de]">
            <button className="h-7 rounded border border-[#cfd6de] bg-transparent px-2 text-[13px] font-medium text-[#677187] hover:border-[#ff3131] focus:outline-none  transition-colors">
              {selectedStartDate || "Bắt đầu"}
            </button>
            {" - "}
            <button className="h-7 rounded border border-[#cfd6de] bg-transparent px-2 text-[13px] font-medium text-[#677187] hover:border-[#ff3131] focus:outline-none  transition-colors">
              {selectedEndDate || "Kết thúc"}
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
            <button
              onClick={handleClear}
              className="text-[#0066ff] font-medium"
            >
              Clear
            </button>
          }
          footer={
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={handleDefault}
                className="flex-1"
              >
                Mặc Định
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleApply}
                className="flex-1"
              >
                Áp Dụng
              </Button>
            </div>
          }
        >
          {/* Navigation Controls */}
          {/* <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth("prev")}
              className="flex h-8 w-8 items-center justify-center rounded border border-[#cfd6de] bg-white text-[#021337] hover:bg-gray-50 focus:outline-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="flex h-8 w-8 items-center justify-center rounded border border-[#cfd6de] bg-white text-[#021337] hover:bg-gray-50 focus:outline-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div> */}

          {/* Two Months Display */}
          <div className="space-y-6">
            {/* First Month */}
            <div>
              <h3 className="text-[13px] font-medium text-[#021337] mb-3">
                {renderMonthHeader(0)}
              </h3>
              <div className="grid grid-cols-7 gap-0 mb-1 text-[11px] font-medium text-[#677187] uppercase">
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                  <div
                    key={day}
                    className="flex h-6 w-full items-center justify-center"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0 text-[13px] font-medium text-[#021337]">
                {renderCalendar(0, true)}
              </div>
            </div>

            {/* Second Month */}
            <div>
              <h3 className="text-[13px] font-medium text-[#021337] mb-3">
                {renderMonthHeader(1)}
              </h3>
              <div className="grid grid-cols-7 gap-0 mb-1 text-[11px] font-medium text-[#677187] uppercase">
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                  <div
                    key={day}
                    className="flex h-6 w-full items-center justify-center"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0 text-[13px] font-medium text-[#021337]">
                {renderCalendar(1, true)}
              </div>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
