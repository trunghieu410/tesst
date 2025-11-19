import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PublisherActionsDropdown } from "@/components/features/PublisherActionsDropdown";
import { PublisherOverview } from "./PublisherOverview";
import { PublisherKYC } from "./PublisherKYC";
import { PublisherMembers } from "./PublisherMembers";
import { PublisherInfos } from "./PublisherInfos";
import { DangerIcon } from "@/icon/DangerIcon";
import { XIcon } from "@/icon/XIcon";
import { useEventEmitter, useEventListener } from "@/hooks/useEventEmitter";
import { Tabs } from "@/components/ui/Tabs";
import { PublisherHistory } from "./PublisherHistory";
import {
  usePublisher,
  usePublisherOverview,
} from "@/lib/queries/usePublishers";
import { useState } from "react";

const tabs = [
  {
    id: "overview",
    label: "Tổng quan",
  },
  {
    id: "info",
    label: "Thông tin",
  },
  {
    id: "kyc",
    label: "KYC",
    iconBadge: () => <Badge variant="approved">Đã duyệt</Badge>,
  },
  {
    id: "members",
    label: "Thành viên",
  },
  {
    id: "action-history",
    label: "Lịch sử thao tác",
  },
];

interface PublisherDetailsProps {
  publisherId?: number;
}

export function PublisherDetails({
  publisherId: propPublisherId,
}: PublisherDetailsProps) {
  const { publish } = useEventEmitter();

  // Normalize ID to API format (pub-X or just use as-is if already in correct format)
  const normalizeId = (id: string | number | undefined): string => {
    if (!id) return "";
    const idStr = id.toString();
    // If it's already in pub-X format, use it; otherwise assume it's a number and convert
    if (idStr.startsWith("pub-")) {
      return idStr;
    }
    // If it's a plain number, convert to pub-X format
    return `pub-${idStr}`;
  };

  const [publisherId, setPublisherId] = useState<string>(
    normalizeId(propPublisherId)
  );

  // Listen for publisher selection from the table
  useEventListener<string>("show-right-panel", (id) => {
    setPublisherId(normalizeId(id));
  });

  const { data: publisherData, isLoading, error } = usePublisher(publisherId);

  const {
    data: publisherOverviewData,
    isLoading: isPublisherOverviewLoading,
    error: publisherOverviewError,
  } = usePublisherOverview(publisherId);

  console.log(publisherOverviewData);

  const handleClose = () => {
    publish("hide-right-panel");
  };

  const handleActionSelect = (action: string) => {
    // TODO: Implement action logic based on selected action
    console.log("Selected action:", action);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !publisherData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Publisher not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-white relative rounded-none md:rounded-tl-3xl">
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-none md:rounded-tl-3xl md:rounded-l-3xl rounded-tr-lg flex items-center justify-between">
        <h1 className="font-semibold text-[20px] leading-7 text-[#021337]">
          Chi tiết publisher
        </h1>
        <Button variant="ghost" size="sm" onClick={handleClose} className="p-1">
          <XIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Avatar and Name Content */}
      <div className="flex items-center gap-3 mb-3 px-5 pb-4">
        <div className="w-20 h-20 rounded-[80px] bg-gray-200" />
        <div className="flex-1">
          <p className="font-semibold text-xl leading-7 text-[#021337]">
            {publisherData.fullName}
          </p>
          <Badge variant="success">Kích hoạt</Badge>
        </div>
        <PublisherActionsDropdown
          accountState="suspend"
          onAction={handleActionSelect}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {publisherData.accountStatus === "suspended" && (
          <div className="bg-[#FFD3D5] px-3 py-2 flex items-center gap-3">
            <DangerIcon className="w-5 h-5 text-[#021337]" />
            <p className="font-normal text-[13px] leading-4 text-[#021337]">
              Tài khoản bị tạm khoá tự động do 2 lần vào blacklist chiến dịch.
            </p>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultTab={"overview"} tabs={tabs} className="flex-1 min-h-0">
          {(activeTab) => {
            const bgColor = activeTab === "info" ? "bg-white" : "bg-[#f3f4f5]";

            return (
              <div
                className={`relative w-full pn:w-[890px] pb-4 flex-1 overflow-y-auto ${bgColor} border-t border-[#CFD6DE]`}
              >
                {/* Scrollable Content */}

                {activeTab === "overview" && (
                  <PublisherOverview publisher={publisherData} />
                )}

                {activeTab === "info" && (
                  <PublisherInfos publisher={publisherData} />
                )}

                {activeTab === "kyc" && <PublisherKYC />}

                {activeTab === "members" && <PublisherMembers />}

                {activeTab === "action-history" && <PublisherHistory />}
              </div>
            );
          }}
        </Tabs>
      </div>
    </div>
  );
}
