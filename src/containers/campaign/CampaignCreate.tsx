import { useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { CampaignBlacklistTab } from "./CampaignBlacklistTab";
import { CampaignHistoryTab } from "./CampaignHistoryTab";
import { CampaignOverviewTab } from "./CampaignOverviewTab";
import { CampaignWhitelistTab } from "./CampaignWhitelistTab";

export function CampaignCreate() {
  const { publish } = useEventEmitter();

  useEffect(() => {
    publish("title-change", {
      title: "Tạo chiến dịch",
      backRoute: "/dashboard/campaigns",
    });
  }, [publish]);

  const tabs = [
    { id: "overview", label: "Tổng quan" },
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
    <div className="flex w-full h-full relative flex-col">
      <Tabs tabs={tabs} defaultTab="overview">
        {(activeTab) => (
          <div className="relative w-full h-full border-t border-[#CFD6DE]">
            {activeTab === "overview" && <CampaignOverviewTab />}
            {activeTab === "blacklist" && <CampaignBlacklistTab />}
            {activeTab === "whitelist" && <CampaignWhitelistTab />}
            {activeTab === "history" && <CampaignHistoryTab />}
          </div>
        )}
      </Tabs>
    </div>
  );
}
