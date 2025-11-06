import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PublisherActionsDropdown } from "@/components/ui/PublisherActionsDropdown";
import { PublisherOverview } from "./PublisherOverview";
import { PublisherKYC } from "./PublisherKYC";
import { PublisherMembers } from "./PublisherMembers";
import { PublisherInfos } from "./PublisherInfos";
import { DangerIcon } from "@/icon/DangerIcon";
import { XIcon } from "@/icon/XIcon";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { Tabs } from "../ui/Tabs";
import { PublisherHistory } from "./PublisherHistory";

const mockPublishers = [
  {
    id: 1,
    name: "Phan Công Kiều",
    email: "kieu.phan@gmail.com",
    country: { code: "VN", name: "Vietnam", flag: "🇻🇳" },
    members: 0,
    createdAt: "10.13.2025 - 14:52",
    kyc: "not_started" as const,
    status: "active" as const,
  },
  {
    id: 2,
    name: "Hậu Hoàng",
    email: "queen@gmail.com",
    country: { code: "MY", name: "Malaysia", flag: "🇲🇾" },
    members: 100,
    createdAt: "10.11.2025 - 13:50",
    kyc: "pending" as const,
    status: "suspended" as const,
  },
  {
    id: 3,
    name: "Trung Nguyễn",
    email: "trung@gmail.com",
    country: { code: "ID", name: "Indonesia", flag: "🇮🇩" },
    members: 342,
    createdAt: "10.12.2025 - 13:50",
    kyc: "rejected" as const,
    status: "deleted" as const,
  },
];

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

export function PublisherDetails({ publisherId }: PublisherDetailsProps) {
  const { publish } = useEventEmitter();

  const handleClose = () => {
    publish("hide-right-panel");
  };

  const handleActionSelect = (action: string) => {
    // TODO: Implement action logic based on selected action
    console.log("Selected action:", action);
  };

  const publisher =
    mockPublishers.find((p) => p.id === Number(publisherId)) ||
    mockPublishers[1];

  if (!publisher) {
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
            {publisher.name}
          </p>
          <Badge variant="success">Kích hoạt</Badge>
        </div>
        <PublisherActionsDropdown onSelect={handleActionSelect} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {publisher.status === "suspended" && (
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
                className={`relative w-[890px] pb-4 flex-1 overflow-y-auto ${bgColor}`}
              >
                {/* Scrollable Content */}

                {activeTab === "overview" && (
                  <PublisherOverview publisher={publisher} />
                )}

                {activeTab === "info" && (
                  <PublisherInfos publisher={publisher} />
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
