import { useEffect, useState } from "react";

import { SearchInput } from "@/components/SearchInput";
import { DateRangeInput } from "@/components/DateRangeInput";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import { CampaignTable } from "./CampaignTable";
import { Pagination } from "@/components/Pagination";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useCampaigns } from "@/lib/queries/useCampaigns";
import { useNavigate } from "react-router-dom";

const countryOptions = [
  { value: "VN", label: "Vietnam" },
  { value: "TH", label: "Thailand" },
  { value: "ID", label: "Indonesia" },
  { value: "MY", label: "Malaysia" },
];

const imageTypeOptions = [
  { value: "daily_checkin", label: "Daily Checkin" },
  { value: "view_ads", label: "View Ads" },
  { value: "shorten_link", label: "Shorten Link" },
];

const statusOptions = [
  { value: "active", label: "Đang diễn ra" },
  { value: "pending", label: "Sắp ra mắt" },
  { value: "completed", label: "Đã kết thúc" },
  { value: "inactive", label: "Nhập" },
];

export function Campaign() {
  const navigate = useNavigate();
  const { publish } = useEventEmitter();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("1.10 - 30.11");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedImageType, setSelectedImageType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
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
  }, [selectedCountry, selectedImageType, selectedStatus, rowsPerPage]);

  useEffect(() => {
    publish("title-change", { title: "Chiến dịch" });
  }, []);

  // Use the campaigns API hook
  const {
    data: campaignsData,
    isLoading,
    error,
  } = useCampaigns(currentPage, rowsPerPage, {
    search: debouncedSearchQuery || undefined,
    country: selectedCountry || undefined,
    imageType: selectedImageType || undefined,
    status: selectedStatus || undefined,
    dateRange: dateRange || undefined,
  });

  const campaigns = campaignsData?.data || [];
  const totalCount = campaignsData?.total || 0;
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handleCampaignClick = (campaign: (typeof campaigns)[0]) => {
    console.log("Campaign clicked:", campaign);
  };

  const handleCreateCampaign = () => {
    navigate(`/dashboard/campaigns/create`);
  };

  return (
    <div className="p-3 flex flex-col gap-4 items-center relative overflow-x-hidden">
      {/* Filters */}
      <div className="flex flex-col gap-2.5 w-full">
        {/* First row of filters */}
        <div className="flex items-start gap-2.5 flex-wrap">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tên chiến dịch"
            className="w-[250px]"
          />

          <DateRangeInput
            value={dateRange}
            onChange={setDateRange}
            className="w-auto min-w-40"
          />

          <Dropdown
            value={selectedCountry}
            onChange={setSelectedCountry}
            placeholder="Quốc gia"
            options={countryOptions}
            className="w-auto min-w-[103px]"
          />

          <Dropdown
            value={selectedImageType}
            onChange={setSelectedImageType}
            placeholder="Hình thức"
            options={imageTypeOptions}
            className="w-auto min-w-[108px]"
          />

          <Dropdown
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Trạng thái"
            options={statusOptions}
            className="w-auto min-w-[110px]"
          />
        </div>

        {/* Second row - Create button */}
        <div className="flex items-start">
          <Button
            variant="danger"
            size="sm"
            onClick={handleCreateCampaign}
            className="h-8 rounded-md"
          >
            Tạo chiến dịch
          </Button>
        </div>
      </div>

      {/* Table and Pagination combined in one bordered container */}
      <div className="border border-[#b5bcc4] rounded-md overflow-hidden w-full">
        {/* Loading state */}
        {isLoading && (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading campaigns...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="p-8 text-center">
            <p className="text-red-500">
              Error loading campaigns: {error.message}
            </p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && (
          <>
            <CampaignTable
              campaigns={campaigns}
              onRowClick={handleCampaignClick}
            />

            {/* Pagination Footer */}
            <div className="flex items-center gap-2 p-2 border-t border-[#b5bcc4] bg-white">
              <p className="font-normal text-sm leading-5 text-[#021337]">
                {totalCount.toLocaleString()} kết quả
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={setRowsPerPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
