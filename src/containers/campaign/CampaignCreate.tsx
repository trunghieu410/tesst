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

export function CampaignCreate() {
  const { publish } = useEventEmitter();

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
  ];

  return (
    <div className="flex flex-col w-full h-screen bg-white relative rounded-none md:rounded-tl-3xl">
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-none md:rounded-tl-3xl md:rounded-l-3xl rounded-tr-lg flex items-center justify-between">
        <h1 className="font-semibold text-[20px] leading-7 text-[#021337]">
          Tạo chiến dịch
        </h1>
        <Button variant="ghost" size="sm" onClick={handleClose} className="p-1">
          <XIcon className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <Tabs tabs={tabs} defaultTab="overview" className="flex-1 min-h-0">
          {(activeTab) => (
            <div className="relative w-full pn:w-[890px] h-full border-t border-[#CFD6DE] overflow-y-auto">
              {activeTab === "overview" && <CampaignOverviewTab />}
              {activeTab === "assets" && <CampaignAssets />}
              {activeTab === "blacklist" && <CampaignBlacklistTab />}
              {activeTab === "whitelist" && <CampaignWhitelistTab />}
              {activeTab === "history" && <CampaignHistoryTab />}
            </div>
          )}
        </Tabs>
      </div>
    </div>
  );
}
