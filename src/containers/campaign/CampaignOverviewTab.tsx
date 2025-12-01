import { useState, useMemo } from "react";
import { ChevronDownIcon } from "lucide-react";
import { DateRangeInput } from "@/components/ui/DateRangeInput";
import { CampaignLabels } from "@/components/features/CampaignLabels";

export function CampaignOverviewTab() {

  const [campaignName, setCampaignName] = useState("");
  const [commissionType, setCommissionType] = useState<"fixed" | "percentage">(
    "fixed"
  );
  const [fixedAmount, setFixedAmount] = useState("0.00002");
  const [percentageAmount, setPercentageAmount] = useState("0");
  const [dateRange, setDateRange] = useState("15.11.2025 - 30.06.2026");
  const [ctaName, setCtaName] = useState("");
  const [advertiserName, setAdvertiserName] = useState("");
  const [website, setWebsite] = useState("");
  const [approvalPeriod, setApprovalPeriod] = useState("0");
  const [cookieLTV, setCookieLTV] = useState("30");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "Hot",
    "Đề xuất",
  ]);
  const [isAdvertiserExpanded, setIsAdvertiserExpanded] = useState(true);

  // Calculate days difference between start and end dates
  const daysDifference = useMemo(() => {
    if (!dateRange) return null;

    const parts = dateRange.split(" - ");
    if (parts.length !== 2) return null;

    const parseDate = (dateString: string): Date | null => {
      const parts = dateString.split(".");
      if (parts.length >= 2) {
        const [day, month, year] = parts.map(Number);
        const currentYear = year || new Date().getFullYear();
        return new Date(currentYear, month - 1, day);
      }
      return null;
    };

    const startDate = parseDate(parts[0]);
    const endDate = parseDate(parts[1]);

    if (startDate && endDate) {
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
      return diffDays;
    }

    return null;
  }, [dateRange]);

  return (
    <>
      <div
        className="p-4 flex gap-4 relative w-full bg-[#F3F4F5] h-full overflow-auto"
      >
        {/* Left Column */}
        <div className="flex flex-col gap-2.5 w-full">
          {/* General Information Section */}
          <div className="bg-white border border-[#e7e9eb] rounded-lg p-4 flex flex-col gap-3">
            <h2 className="font-medium text-sm leading-5 text-[#021337]">
              Thông tin chung
            </h2>

            {/* Campaign Name */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Tên chiến dịch
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                placeholder="Nhập tên chiến dịch"
                className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 text-sm leading-5 text-[#021337] placeholder:text-[#677187] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Form Type */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Hình thức
              </label>
              <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center justify-between cursor-pointer">
                <span className="text-sm leading-5 text-[#677187]">
                  Chọn hình thức
                </span>
                <ChevronDownIcon className="w-[18px] h-[18px]" />
              </div>
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Quốc gia áp dụng
              </label>
              <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center justify-between cursor-pointer">
                <span className="text-sm leading-5 text-[#021337]">
                  Toàn cầu
                </span>
                <ChevronDownIcon className="w-[18px] h-[18px]" />
              </div>
            </div>

            {/* Commissions */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Commissions
              </label>

              {/* Fixed Commission */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      commissionType === "fixed"
                        ? "border-[#f71e1e]"
                        : "border-[#cfd6de]"
                    }`}
                    onClick={() => setCommissionType("fixed")}
                  >
                    {commissionType === "fixed" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f71e1e]" />
                    )}
                  </div>
                  <span className="text-[13px] leading-4 text-[#021337]">
                    Hoa hồng mức cố định
                  </span>
                </label>

                <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-0 flex items-center w-[200px]">
                  <div className="border-r border-[#cfd6de] pr-2.5 py-1.5 flex items-center gap-2.5">
                    <span className="font-medium text-[13px] leading-4 text-[#021337]">
                      OKT
                    </span>
                    <ChevronDownIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fixedAmount}
                    onChange={(e) => setFixedAmount(e.target.value)}
                    className="flex-1 pl-2 py-2 text-[13px] leading-4 text-[#021337] focus:outline-none"
                  />
                </div>
              </div>

              {/* Percentage Commission */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      commissionType === "percentage"
                        ? "border-[#f71e1e]"
                        : "border-[#cfd6de]"
                    }`}
                    onClick={() => setCommissionType("percentage")}
                  >
                    {commissionType === "percentage" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f71e1e]" />
                    )}
                  </div>
                  <span className="text-[13px] leading-4 text-[#021337]">
                    Hoa hồng % theo giá trị giao dịch
                  </span>
                </label>

                <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-0 flex items-center w-[135px]">
                  <span className="font-medium text-[13px] leading-4 text-[#021337] py-1.5">
                    %
                  </span>
                  <input
                    type="text"
                    value={percentageAmount}
                    onChange={(e) => setPercentageAmount(e.target.value)}
                    className="flex-1 pl-2 py-2 text-[13px] leading-4 text-[#021337] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="flex items-end gap-3">
              <div className="flex-1 flex flex-col gap-1">
                <label className="font-medium text-sm leading-5 text-[#021337]">
                  Thời hạn áp dụng
                </label>
                <DateRangeInput
                  value={dateRange}
                  onChange={setDateRange}
                  showYear={true}
                />
              </div>
              <p className="flex-1 text-sm leading-5 text-[#021337]">
                {daysDifference ? `${daysDifference} ngày` : ""}
              </p>
            </div>

            {/* CTA Name */}
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Tên nút CTA dành cho user đang tham gia chiến dịch
              </label>
              <input
                type="text"
                value={ctaName}
                onChange={(e) => setCtaName(e.target.value)}
                placeholder="VD: Checkin nhận airdrop, Xem quảng cáo, ..."
                className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 text-sm leading-5 text-[#021337] placeholder:text-[#677187] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <CampaignLabels value={selectedTags} onChange={setSelectedTags} />
          </div>

          {/* Advertiser Section */}
          <div className="bg-white border border-[#e7e9eb] rounded-lg p-4 flex flex-col gap-3">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsAdvertiserExpanded(!isAdvertiserExpanded)}
            >
              <h2 className="font-medium text-sm leading-5 text-[#021337]">
                Nhà quảng cáo (Advertiser)
              </h2>
              <ChevronDownIcon
                className={`w-6 h-6 text-[#021337] transition-transform duration-200 ${
                  isAdvertiserExpanded ? "rotate-180" : ""
                }`}
              />
            </div>

            {isAdvertiserExpanded && (
              <>
                <div className="flex gap-4">
                  <div className="border border-[#cfd6de] w-[88px] h-[88px] bg-gray-100" />
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="font-medium text-sm leading-5 text-[#021337]">
                      Tên nhà quảng cáo
                    </label>
                    <input
                      type="text"
                      value={advertiserName}
                      onChange={(e) => setAdvertiserName(e.target.value)}
                      placeholder="Nhập tên nhà quảng cáo"
                      className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 text-sm leading-5 text-[#021337] placeholder:text-[#677187] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <label className="font-medium text-sm leading-5 text-[#021337]">
                      Website chính thức
                    </label>
                    <span className="font-normal text-xs leading-4 text-[#677187]">
                      Không bắt buộc
                    </span>
                  </div>
                  <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center">
                    <span className="font-medium text-sm leading-5 text-[#021337]">
                      https://
                    </span>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="Nhập địa chỉ website"
                      className="flex-1 pl-2 text-sm leading-5 text-[#021337] placeholder:text-[#677187] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm leading-5 text-[#021337]">
                    Thời hạn hoa hồng được duyệt trên hệ thống
                  </label>
                  <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center">
                    <input
                      type="text"
                      value={approvalPeriod}
                      onChange={(e) => setApprovalPeriod(e.target.value)}
                      className="flex-1 text-sm leading-5 text-[#021337] focus:outline-none"
                    />
                    <span className="font-medium text-sm leading-5 text-[#021337]">
                      ngày
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-medium text-sm leading-5 text-[#021337]">
                    Cookie LTV (life-time value)
                  </label>
                  <div className="bg-white border border-[#cfd6de] rounded-md px-3 py-2 flex items-center">
                    <input
                      type="text"
                      value={cookieLTV}
                      onChange={(e) => setCookieLTV(e.target.value)}
                      className="flex-1 text-sm leading-5 text-[#021337] focus:outline-none"
                    />
                    <span className="font-medium text-sm leading-5 text-[#021337]">
                      ngày
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
