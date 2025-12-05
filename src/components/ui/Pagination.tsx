import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { ArrowLeftIcon } from "@/icon/ArrowLeftIcon";
import { ArrowRightIcon } from "@/icon/ArrowRightIcon";
import useClickOutside from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils/common";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
  className?: string;
}

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50, 100];

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage = 1000,
  onRowsPerPageChange,
  className = "",
}: PaginationProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useClickOutside<HTMLDivElement>(
    () => setIsDropdownOpen(false),
    { enabled: isDropdownOpen }
  );

  useEffect(() => {
    if (isDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isDropdownOpen]);

  // Close dropdown on scroll
  useEffect(() => {
    if (!isDropdownOpen) return;
    
    const handleScroll = () => setIsDropdownOpen(false);
    window.addEventListener("scroll", handleScroll, true);
    
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isDropdownOpen]);

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div
      className={`flex flex-1 items-center gap-[10px] justify-end ${className}`}
    >
      {/* Pagination Buttons */}
      <div className="border border-[#d0d5dd] rounded-[6px] overflow-hidden flex items-stretch">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-white border-r cursor-pointer border-[#cfd6de] w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-[6px]"
        >
          <ArrowLeftIcon />
        </button>

        {renderPageNumbers().map((page, index) =>
          page === "..." ? (
            <div
              key={`ellipsis-${index}`}
              className="bg-white border-r border-[#cfd6de] w-8 h-8 flex items-center justify-center font-medium text-[13px] leading-4 text-[#021337]"
            >
              ...
            </div>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`cursor-pointer border-r border-[#cfd6de] w-8 h-8 flex items-center justify-center font-medium text-[13px] leading-4 hover:bg-gray-50 ${
                currentPage === page ? "bg-[#F9FAFB]" : "bg-white"
              } text-[#021337]`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="bg-white w-8 h-8 flex cursor-pointer items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-[6px]"
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* Rows per page selector */}
      {onRowsPerPageChange && (
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white border border-[#d0d5dd] rounded-[6px] h-8 pl-4 pr-8 font-normal text-[13px] leading-4 text-[#021337] cursor-pointer hover:bg-gray-50 flex items-center"
          >
            {rowsPerPage} row
          </button>
          <ChevronDown 
            className={cn(
              "w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#021337] transition-transform",
              isDropdownOpen && "rotate-180"
            )} 
            strokeWidth={1.5} 
          />
          
          {isDropdownOpen && createPortal(
            <div 
              ref={dropdownRef}
              className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[9999]"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              }}
            >
              {ROWS_PER_PAGE_OPTIONS.filter((option) => option !== rowsPerPage).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onRowsPerPageChange(option);
                    setIsDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 font-normal text-[13px] leading-4 text-[#021337] hover:bg-[#f1caca] cursor-pointer",
                    rowsPerPage === option && "bg-gray-50"
                  )}
                >
                  {option} row
                </button>
              ))}
            </div>,
            document.body
          )}
        </div>
      )}
    </div>
  );
}
