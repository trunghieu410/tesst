import { useState, useMemo, useEffect } from "react";
import { CampaignOverviewGeneral } from "./components/CampaignOverviewGeneral";
import { CampaignOverviewAdvertiser } from "./components/CampaignOverviewAdvertiser";
import { calculateDaysDifference } from "./utils";

interface CampaignOverviewTabProps {
  defaultValues?: any;
}

export function CampaignOverviewTab({
  defaultValues,
}: CampaignOverviewTabProps) {
  useEffect(() => {
    if (defaultValues) {
      setCampaignName(defaultValues.name || "");
      if (defaultValues.dateRange) setDateRange(defaultValues.dateRange);
      // Add other fields mapping here as needed
    }
  }, [defaultValues]);

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
    return calculateDaysDifference(dateRange);
  }, [dateRange]);

  return (
    <>
      <div className="p-4 flex gap-4 relative w-full bg-[#F3F4F5] h-full overflow-auto">
        {/* Left Column */}
        <div className="flex flex-col gap-2.5 w-full">
          {/* General Information Section */}
          <CampaignOverviewGeneral
            campaignName={campaignName}
            setCampaignName={setCampaignName}
            commissionType={commissionType}
            setCommissionType={setCommissionType}
            fixedAmount={fixedAmount}
            setFixedAmount={setFixedAmount}
            percentageAmount={percentageAmount}
            setPercentageAmount={setPercentageAmount}
            dateRange={dateRange}
            setDateRange={setDateRange}
            ctaName={ctaName}
            setCtaName={setCtaName}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            daysDifference={daysDifference}
          />

          {/* Advertiser Section */}
          <CampaignOverviewAdvertiser
            advertiserName={advertiserName}
            setAdvertiserName={setAdvertiserName}
            website={website}
            setWebsite={setWebsite}
            approvalPeriod={approvalPeriod}
            setApprovalPeriod={setApprovalPeriod}
            cookieLTV={cookieLTV}
            setCookieLTV={setCookieLTV}
            isExpanded={isAdvertiserExpanded}
            setIsExpanded={setIsAdvertiserExpanded}
          />
        </div>
      </div>
    </>
  );
}

