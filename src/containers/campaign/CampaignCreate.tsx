import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { CampaignBlacklistTab } from "./CampaignBlacklistTab";
import { CampaignHistoryTab } from "./CampaignHistoryTab";
import { CampaignOverviewTab } from "./CampaignOverviewTab";
import { CampaignWhitelistTab } from "./CampaignWhitelistTab";
import { Button } from "@/components/ui/Button";
import { XIcon } from "@/icon/XIcon";
import { CampaignAssets } from "./CampaignAssets";
import { useEffect, useState } from "react";

interface CampaignCreateProps {
  campaignId?: string | number | null;
}

export function CampaignCreate({ campaignId }: CampaignCreateProps) {
  const { publish } = useEventEmitter();
  const isEdit = !!campaignId;
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [campaignDetails, setCampaignDetails] = useState<any>(null);

  useEffect(() => {
    if (isEdit && campaignId) {
      setIsLoading(true);
      // Mock API call
      console.log(`Fetching details for campaign ${campaignId}`);
      const timer = setTimeout(() => {
        setCampaignDetails({
          id: campaignId,
          name: "Mock Campaign Details",
          description: "This is a mock description fetched from API",
          // Add other mock fields as needed
        });
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setCampaignDetails(null);
    }
  }, [campaignId, isEdit]);

  const handleClose = () => {
    publish("hide-right-panel");
  };

  const tabs = [
    { id: "overview", label: "Tổng quan" },
    { id: "assets", label: "T&C, tài nguyên" },
    {
      id: "blacklist",
      label: "Blacklist",
      iconBadge: () => (
        <Badge isCircle variant="danger">
          2
        </Badge>
      ),
    },
    {
      id: "whitelist",
      label: "Whitelist",
      iconBadge: () => (
        <Badge isCircle variant="success">
          2
        </Badge>
      ),
    },
    { id: "history", label: "Lịch sử thao tác" },
  ].filter((tab) => {
    if (!isEdit) {
      return ["overview", "assets"].includes(tab.id);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full h-screen bg-white relative rounded-none md:rounded-tl-3xl">
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-none md:rounded-tl-3xl md:rounded-l-3xl rounded-tr-lg flex items-center justify-between">
        <h1 className="font-semibold text-[20px] leading-7 text-[#021337]">
          {isEdit ? "Chi tiết chiến dịch" : "Tạo chiến dịch"}
        </h1>
        {/*action-buttons*/}
        <Button variant="ghost" size="sm" onClick={handleClose} className="p-1">
          <XIcon className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <Tabs tabs={tabs} defaultTab="overview" className="flex-1 min-h-0">
          {(activeTab) => (
            <div className="relative w-full pn:w-[890px] h-full border-t border-[#CFD6DE] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  Loading...
                </div>
              ) : (
                <>
                  {activeTab === "overview" && (
                    <CampaignOverviewTab defaultValues={campaignDetails} />
                  )}
                  {activeTab === "assets" && <CampaignAssets />}
                  {activeTab === "blacklist" && <CampaignBlacklistTab />}
                  {activeTab === "whitelist" && <CampaignWhitelistTab />}
                  {activeTab === "history" && <CampaignHistoryTab />}
                </>
              )}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
