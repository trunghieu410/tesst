import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchInput } from "@/components/ui/SearchInput";
import { DateRangeInput, type DateRangeValue } from "@/components/ui/DateRangeInput";
import { Pagination } from "@/components/ui/Pagination";
import { RightSidePanel } from "@/components/features/RightSidePanel";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { usePublishers } from "@/lib/queries/usePublishers";
import { Tooltip } from "@/components/ui/Tooltip";
import { PublisherDetails } from "./PublisherDetails";
import { PublisherTable } from "./PublisherTable";
import { MultipleSelectCountryDropdown } from "@/components/ui/MultipleSelectCountryDropdown";
import MultipleSelectDropdown from "@/components/ui/MultipleSelectDropdown";

const statusOptions = [
  { value: "active", label: "Kích hoạt" },
  { value: "deleted", label: "Đã xoá" },
  { value: "suspended", label: "Tạm dừng" },
];

const toUtcIsoString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}T00:00:00Z`;
};

// Get default date range: 1st of previous month - end of current month
const getDefaultDateRange = (): DateRangeValue => {
  const now = new Date();
  // First day of previous month
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  // Last day of current month
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    start: toUtcIsoString(start),
    end: toUtcIsoString(end),
  };
};

export function Publisher() {
  const { publish } = useEventEmitter();
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to get initial values from URL or defaults
  const getInitialState = useCallback(() => {
    const urlPublisherId = searchParams.get("publisherId") || "";
    const urlCountry = searchParams.get("country");
    const urlStatus = searchParams.get("status");
    const urlMinMembers = searchParams.get("minMembers") || "0";
    const urlPage = searchParams.get("page");
    const urlLimit = searchParams.get("limit");
    const urlStartDate = searchParams.get("startDate");
    const urlEndDate = searchParams.get("endDate");
    const urlSearchQuery = searchParams.get("q");

    const defaultRange = getDefaultDateRange();

    return {
      searchQuery: urlSearchQuery || "",
      publisherId: urlPublisherId,
      selectedCountry: urlCountry ? urlCountry.split(",") : [],
      selectedStatus: urlStatus ? urlStatus.split(",") : [],
      minMembers: urlMinMembers,
      currentPage: urlPage ? parseInt(urlPage, 10) : 1,
      rowsPerPage: urlLimit ? parseInt(urlLimit, 10) : 10,
      dateRange: {
        start: urlStartDate || defaultRange.start,
        end: urlEndDate || defaultRange.end,
      } as DateRangeValue,
    };
  }, [searchParams]);

  // Initialize state from URL params
  const initial = getInitialState();
  const [publisherId, setPublisherId] = useState(initial.publisherId);
  const [searchQuery, setSearchQuery] = useState(initial.searchQuery);
  const [dateRange, setDateRange] = useState<DateRangeValue | null>(initial.dateRange);
  const [selectedCountry, setSelectedCountry] = useState<string[]>(initial.selectedCountry);
  const [selectedStatus, setSelectedStatus] = useState<string[]>(initial.selectedStatus);
  const [minMembers, setMinMembers] = useState(initial.minMembers);
  const [currentPage, setCurrentPage] = useState(initial.currentPage);
  const [rowsPerPage, setRowsPerPage] = useState(initial.rowsPerPage);

  // Sync state to URL params
  useEffect(() => {
    const params = new URLSearchParams();

    if (publisherId) params.set("publisherId", publisherId);
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCountry.length > 0) params.set("country", selectedCountry.join(","));
    if (selectedStatus.length > 0) params.set("status", selectedStatus.join(","));
    if (minMembers && minMembers !== "0") params.set("minMembers", minMembers);
    if (currentPage > 1) params.set("page", currentPage.toString());
    if (rowsPerPage !== 10) params.set("limit", rowsPerPage.toString());
    if (dateRange?.start) params.set("startDate", dateRange.start);
    if (dateRange?.end) params.set("endDate", dateRange.end);

    setSearchParams(params, { replace: true });
  }, [searchQuery, publisherId, selectedCountry, selectedStatus, minMembers, currentPage, rowsPerPage, dateRange, setSearchParams]);

  // Reset page when filters or rows per page change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCountry, selectedStatus, minMembers, rowsPerPage]);

  useEffect(() => {
    publish("title-change", { title: "Publisher" });
  }, [publish]);

  // Show right panel if publisherId is present in URL on initial load
  useEffect(() => {
    if (initial.publisherId) {
      publish("show-right-panel", initial.publisherId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: publishersData,
    isLoading,
    error,
  } = usePublishers(currentPage, rowsPerPage, {
    search: searchQuery || undefined,
    country: selectedCountry.length > 0 ? selectedCountry : undefined,
    status: selectedStatus.length > 0 ? selectedStatus : undefined,
    minMembers: minMembers ? parseInt(minMembers) : undefined,
    createdFrom: dateRange?.start,
    createdTo: dateRange?.end,
  });
  const publishers = publishersData?.data.data || [];
  const pagination = publishersData?.data.pagination;

  const handlePublisherClick = (id: string) => {
    setPublisherId(id);
    publish("show-right-panel", id);
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

        <MultipleSelectCountryDropdown
          onSelectedChange={setSelectedCountry}
          placeholder="Quốc gia"
          className="w-auto min-w-[120px]"
        />

        <MultipleSelectDropdown
          onSelectedChange={setSelectedStatus}
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

      {/* Right-side-panel - only show when publisherId is in URL */}
      {publisherId && (
        <RightSidePanel>
          <PublisherDetails />
        </RightSidePanel>
      )}
    </div>
  );
}
