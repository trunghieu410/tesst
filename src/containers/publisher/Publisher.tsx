import { useEffect, useState } from "react";

import { SearchInput } from "@/components/SearchInput";
import { DateRangeInput } from "@/components/DateRangeInput";
import { Dropdown } from "@/components/Dropdown";
import { Pagination } from "@/components/Pagination";
import { RightSidePanel } from "@/components/RightSidePanel";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { usePublishers } from "@/lib/queries/usePublishers";
import { Tooltip } from "@/components/Tooltip";
import { PublisherDetails } from "./PublisherDetails";
import { PublisherTable } from "./PublisherTable";

const countryOptions = [
  { value: "VN", label: "Vietnam" },
  { value: "TH", label: "Thailand" },
  { value: "ID", label: "Indonesia" },
  { value: "MY", label: "Malaysia" },
];

const statusOptions = [
  { value: "active", label: "Kích hoạt" },
  { value: "deleted", label: "Đã xoá" },
  { value: "suspended", label: "Tạm dừng" },
];

export function Publisher() {
  const { publish } = useEventEmitter();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("1.10 - 30.11");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [minMembers, setMinMembers] = useState("0");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page when search changes
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset page when filters or rows per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountry, selectedStatus, minMembers, rowsPerPage]);

  useEffect(() => {
    publish("title-change", { title: "Publisher" });
  }, [publish]);
  //

  const {
    data: publishersData,
    isLoading,
    error,
  } = usePublishers(currentPage, rowsPerPage, {
    search: debouncedSearchQuery || undefined,
    country: selectedCountry || undefined,
    status: selectedStatus || undefined,
    minMembers: minMembers ? parseInt(minMembers) : undefined,
    dateRange: dateRange || undefined,
  });
  const publishers = publishersData?.data.data || [];
  const pagination = publishersData?.data.pagination;

  const handlePublisherClick = (publisherId: string) => {
    publish("show-right-panel", publisherId); // Mở panel
  };

  return (
    <div className="p-3 flex flex-col gap-4 items-center relative">
      {/* Filters */}
      <div className="flex items-start gap-2.5 flex-wrap w-full">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Tên, email, mã giới thiệu của pub"
          className="w-[250px]"
        />
        <Tooltip position="top" tooltipsText="Thời gian tạo.">
          <DateRangeInput
            value={dateRange}
            onChange={setDateRange}
            className="w-[140px]"
          />
        </Tooltip>

        <Dropdown
          value={selectedCountry}
          onChange={setSelectedCountry}
          placeholder="Quốc gia"
          options={countryOptions}
          className="w-auto min-w-[120px]"
        />

        <Dropdown
          value={selectedStatus}
          onChange={setSelectedStatus}
          placeholder="Trạng thái"
          options={statusOptions}
          className="w-auto min-w-[120px]"
        />

        <div className="relative">
          <div className="h-8 bg-white border border-[#cfd6de] rounded-md flex items-center">
            <div className="px-3 border-r border-[#cfd6de] h-full flex items-center">
              <span className="font-medium text-[13px] leading-4 text-[#021337] whitespace-nowrap">
                Số thành viên từ
              </span>
            </div>
            <input
              type="number"
              value={minMembers}
              onChange={(e) => setMinMembers(e.target.value)}
              className="w-20 px-1 h-full text-center font-normal text-[13px] leading-4 text-[#021337] focus:outline-none"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Table and Pagination combined in one bordered container */}
      <div className="border border-[#b5bcc4] rounded-md overflow-hidden w-full">
        {/* Loading state */}
        {isLoading && (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading publishers...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-8 text-center">
            <p className="text-red-500">
              Error loading publishers: {error.message}
            </p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && (
          <>
            <PublisherTable
              publishers={publishers}
              onRowClick={handlePublisherClick}
            />

            {/* Pagination Footer */}
            <div className="flex items-center gap-2 p-2 border-t border-[#b5bcc4] bg-white">
              <p className="font-normal text-sm leading-5 text-[#021337]">
                {pagination.total.toLocaleString()} kết quả
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={pagination.totalPages}
                onPageChange={setCurrentPage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={setRowsPerPage}
              />
            </div>
          </>
        )}
      </div>

      {/* Right-side-panel */}
      <RightSidePanel>
        <PublisherDetails />
      </RightSidePanel>
    </div>
  );
}
