import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PublisherActionsDropdown } from "@/components/features/PublisherActionsDropdown";
import { PublisherOverview } from "./PublisherOverview";
import { PublisherKYC } from "./PublisherKYC";
import { PublisherMembers } from "./PublisherMembers";
import { PublisherInfos } from "./PublisherInfos";
import { DangerIcon } from "@/icon/DangerIcon";
import { XIcon } from "@/icon/XIcon";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { Tabs } from "@/components/ui/Tabs";
import { PublisherHistory } from "./PublisherHistory";
import {
  usePublisher,
  usePublisherOverview,
} from "@/lib/queries/usePublishers";
import { useSearchParams } from "react-router-dom";
import type { PublisherType } from "@/types";

const AVATAR_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
];

const getAvatarColor = (identifier: string) => {
  let hash = 0;
  for (let i = 0; i < identifier.length; i++) {
    hash = identifier.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % AVATAR_COLORS.length);
  return AVATAR_COLORS[index];
};

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

const accountStatusMap: Record<
  PublisherType["accountStatus"],
  { label: string; variant: BadgeVariant }
> = {
  active: { label: "Kích hoạt", variant: "success" },
  deleted: { label: "Đã xoá", variant: "error" },
  suspended: { label: "Tạm dừng", variant: "pending" },
};

export function PublisherDetails({ publisherId }: { publisherId: string }) {
  const { publish } = useEventEmitter();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: publisherData, isLoading, error } = usePublisher(publisherId);

  const {
    data: publisherOverviewData,
    isLoading: isPublisherOverviewLoading,
  } = usePublisherOverview(publisherId);
  console.log("publisherData isLoading", isLoading);
  const handleClose = () => {
    // Remove publisherId from URL when closing
    searchParams.delete("publisherId");
    setSearchParams(searchParams);
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

  const accountStatus = accountStatusMap[publisherData.accountStatus];
  const avatarUrl = publisherData.personalInfo?.avatarUrl;
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
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-[80px]" />
        ) : (
          <div className={`w-20 h-20 rounded-[80px] flex items-center justify-center text-3xl font-semibold text-white ${getAvatarColor(publisherData.email || publisherData.fullName)}`}>
            {(publisherData.email || publisherData.fullName || "?").charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <p className="font-semibold text-xl leading-7 text-[#021337]"> 
            {publisherData.fullName}
          </p>
          <Badge variant={accountStatus.variant}>
            {accountStatus.label}
          </Badge>
        </div>
        <PublisherActionsDropdown
          accountState={publisherData.accountStatus}
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
                  <PublisherOverview
                    publisher={publisherData}
                    publisherId={publisherId}
                    overviewData={publisherOverviewData}
                    isLoading={isPublisherOverviewLoading}
                  />
                )}

                {activeTab === "info" && (
                  <PublisherInfos
                    publisher={publisherData}
                    publisherId={publisherId}
                  />
                )}

                {activeTab === "kyc" && (
                  <PublisherKYC publisherId={publisherId} />
                )}

                {activeTab === "members" && (
                  <PublisherMembers publisherId={publisherId} />
                )}

                {activeTab === "action-history" && (
                  <PublisherHistory publisherId={publisherId} />
                )}
              </div>
            );
          }}
        </Tabs>
      </div>
    </div>
  );
}
