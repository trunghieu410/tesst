import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage?: number;
  onRowsPerPageChange?: (rows: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage = 1000,
  onRowsPerPageChange,
  className = "",
}: PaginationProps) {
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
      className={`flex flex-1 items-center gap-2.5 justify-end ${className}`}
    >
      {/* Pagination Buttons */}
      <div className="border border-[#d0d5dd] rounded-md overflow-hidden flex items-stretch">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-white border-r border-[#cfd6de] px-3 py-2 w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {renderPageNumbers().map((page, index) =>
          page === "..." ? (
            <div
              key={`ellipsis-${index}`}
              className="bg-white border-r border-[#cfd6de] px-3 py-2 w-8 h-8 flex items-center justify-center font-medium text-[13px] leading-4 text-[#021337]"
            >
              ...
            </div>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`border-r border-[#cfd6de] px-3 py-2 w-8 h-8 flex items-center justify-center font-medium text-[13px] leading-4 hover:bg-gray-50 ${
                currentPage === page ? "bg-gray-100" : "bg-white"
              } ${currentPage === page ? "text-[#021337]" : "text-[#021337]"}`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="bg-white px-3 py-2 w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Rows per page selector */}
      {onRowsPerPageChange && (
        <div className="relative">
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 h-8 pr-8 font-normal text-[13px] leading-4 text-[#021337] appearance-none cursor-pointer hover:bg-gray-50"
          >
            <option value={10}>10 row</option>
            <option value={20}>20 row</option>
            <option value={50}>50 row</option>
            <option value={100}>100 row</option>
          </select>
          <ChevronRight className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
        </div>
      )}
    </div>
  );
}
