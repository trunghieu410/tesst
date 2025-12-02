import { ChevronDownIcon } from "lucide-react";
import { SectionCard } from "@/components/ui/SectionCard";

interface CampaignOverviewAdvertiserProps {
  advertiserName: string;
  setAdvertiserName: (value: string) => void;
  website: string;
  setWebsite: (value: string) => void;
  approvalPeriod: string;
  setApprovalPeriod: (value: string) => void;
  cookieLTV: string;
  setCookieLTV: (value: string) => void;
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export function CampaignOverviewAdvertiser({
  advertiserName,
  setAdvertiserName,
  website,
  setWebsite,
  approvalPeriod,
  setApprovalPeriod,
  cookieLTV,
  setCookieLTV,
  isExpanded,
  setIsExpanded,
}: CampaignOverviewAdvertiserProps) {
  return (
    <SectionCard
      title="Nhà quảng cáo (Advertiser)"
      className="flex flex-col"
      headerActions={
        <ChevronDownIcon
          className={`w-6 h-6 text-[#021337] transition-transform duration-200 cursor-pointer ${
            isExpanded ? "rotate-180" : ""
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      }
    > 
      <div className="flex flex-col mt-[-16px] gap-4">

      {isExpanded && (
        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <div className="border border-[#cfd6de] rounded-md w-[88px] h-[88px] bg-gray-100" />
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

          <div className="flex flex-row gap-4">
            <div className="flex-1 flex flex-col gap-1">
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

            <div className="flex-1 flex flex-col gap-1">
              <label className="font-medium text-sm leading-5 text-[#021337]">
                Thời gian tồn tại cookie (cookie LTV - life time value)
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
          </div>
        </div>
      )}
      </div>
    </SectionCard>
  );
}
