import { Badge } from "@/components/ui/Badge";
import { CampaignBlacklistTab } from "@/components/dashboard/CampaignBlacklistTab";
import { CampaignHistoryTab } from "@/components/dashboard/CampaignHistoryTab";
import { CampaignOverviewTab } from "@/components/dashboard/CampaignOverviewTab";
import { CampaignWhitelistTab } from "@/components/dashboard/CampaignWhitelistTab";
import { Tabs } from "@/components/ui/Tabs";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect } from "react";

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
      iconBadge: () => <Badge variant="danger">2</Badge>,
    },
    {
      id: "whitelist",
      label: "Whitelist",
      iconBadge: () => <Badge variant="success">2</Badge>,
    },
    { id: "history", label: "Lịch sử thao tác" },
  ];

  return (
    <div className="flex w-full h-full relative flex-col">
      <Tabs tabs={tabs} defaultTab="overview">
        {(activeTab) => (
          <div className="relative w-full h-full">
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
