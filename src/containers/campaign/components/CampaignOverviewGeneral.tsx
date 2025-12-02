import { ChevronDownIcon } from "lucide-react";
import { DateRangeInput } from "@/components/ui/DateRangeInput";
import { CampaignLabels } from "@/components/features/CampaignLabels";
import { SectionCard } from "@/components/ui/SectionCard";

interface CampaignOverviewGeneralProps {
  campaignName: string;
  setCampaignName: (value: string) => void;
  commissionType: "fixed" | "percentage";
  setCommissionType: (value: "fixed" | "percentage") => void;
  fixedAmount: string;
  setFixedAmount: (value: string) => void;
  percentageAmount: string;
  setPercentageAmount: (value: string) => void;
  dateRange: string;
  setDateRange: (value: string) => void;
  ctaName: string;
  setCtaName: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: (value: string[]) => void;
  daysDifference: number | null;
}

export function CampaignOverviewGeneral({
  campaignName,
  setCampaignName,
  commissionType,
  setCommissionType,
  fixedAmount,
  setFixedAmount,
  percentageAmount,
  setPercentageAmount,
  dateRange,
  setDateRange,
  ctaName,
  setCtaName,
  selectedTags,
  setSelectedTags,
  daysDifference,
}: CampaignOverviewGeneralProps) {
  return (
    <SectionCard title="Thông tin chung" className="flex flex-col gap-3">
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
          <span className="text-sm leading-5 text-[#021337]">Toàn cầu</span>
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
    </SectionCard>
  );
}
