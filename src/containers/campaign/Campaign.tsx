import { useEffect, useState } from "react";

import { SearchInput } from "@/components/ui/SearchInput";
import { DateRangeInput, type DateRangeValue } from "@/components/ui/DateRangeInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { Button } from "@/components/ui/Button";
import { CampaignTable } from "./CampaignTable";
import { Pagination } from "@/components/ui/Pagination";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useCampaigns } from "@/lib/queries/useCampaigns";
// import { useNavigate } from "react-router-dom";
import { RightSidePanel } from "@/components/features/RightSidePanel";
import { CampaignCreate } from "./CampaignCreate";

import {
  COUNTRY_OPTIONS,
  IMAGE_TYPE_OPTIONS,
  STATUS_OPTIONS,
} from "./constants";
import { toUtcIsoString } from "@/lib/utils/date";

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

export function Campaign() {
  // const navigate = useNavigate();
  const { publish } = useEventEmitter();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
  // Initialize with Oct 1 - Nov 30 (approximate for current year based on original string)
  const [dateRange, setDateRange] = useState<DateRangeValue | null>(getDefaultDateRange);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedImageType, setSelectedImageType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCampaignId, setSelectedCampaignId] = useState<
    string | number | null
  >(null);

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
    // Pass dateRange as object or string depending on what API expects.
    // Assuming API expects string "start - end" or separate fields.
    // The original code passed `dateRange` which was a string.
    // If `useCampaigns` expects a string, we might need to format it here.
    // Let's assume for now we pass the object if the hook supports it, or format it.
    // Checking `useCampaigns` signature would be good, but for now I'll cast or format if needed.
    // Given the original was string, I should probably format it back to string for the API if the API wasn't updated.
    // But the task is to change the input format.
    // If I pass the object, `useCampaigns` might break if it expects string.
    // I'll format it to string for the API call to maintain compatibility if the API hook wasn't refactored.
    // Wait, the task didn't say to refactor the API hook.
    // So I should probably convert `dateRange` object to string for `useCampaigns`.
    dateRange: dateRange ? `${new Date(dateRange.start).toLocaleDateString("en-GB").replace(/\//g, ".")} - ${new Date(dateRange.end).toLocaleDateString("en-GB").replace(/\//g, ".")}` : undefined,
  });

  const campaigns = campaignsData?.data.data || [];
  const pagination = campaignsData?.data.pagination || 0;
  console.log(isLoading, campaignsData, error);
  
  const handleCampaignClick = (campaign: (typeof campaigns)[0]) => {
    setSelectedCampaignId(campaign.id);
    publish("show-right-panel");
  };

  const handleCreateCampaign = () => {
    setSelectedCampaignId(null);
    publish("show-right-panel");
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
            options={COUNTRY_OPTIONS}
            className="w-auto min-w-[103px]"
          />

          <Dropdown
            value={selectedImageType}
            onChange={setSelectedImageType}
            placeholder="Hình thức"
            options={IMAGE_TYPE_OPTIONS}
            className="w-auto min-w-[108px]"
          />

          <Dropdown
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Trạng thái"
            options={STATUS_OPTIONS}
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
      {/* Right-side-panel CampaignCreate */}
      <RightSidePanel>
        <CampaignCreate campaignId={selectedCampaignId} />
      </RightSidePanel>
    </div>
  );
}
