import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { XIcon } from "@/icon/XIcon";
import { useEventEmitter, useEventListener } from "@/hooks/useEventEmitter";
import { Tabs } from "../../components/Tabs";
import { useState } from "react";

const tabs = [
  {
    id: "overview",
    label: "Tổng quan",
  },
  {
    id: "transactions",
    label: "Giao dịch",
  },
  {
    id: "history",
    label: "Lịch sử",
  },
];

interface WalletUser {
  id: number;
  name: string;
  email: string;
  totalAssets: string;
  available: string;
  locked: string;
  status: "pending" | "activated" | "deleted" | "locked";
}

interface WalletDetailsProps {
  walletId?: number;
}

export function WalletDetails({
  walletId: propWalletId,
}: WalletDetailsProps) {
  const { publish } = useEventEmitter();

  const [walletId, setWalletId] = useState<string>(
    propWalletId?.toString() || ""
  );

  // Listen for wallet selection from the table
  useEventListener<string>("show-right-panel", (id) => {
    setWalletId(id);
  });

  const handleClose = () => {
    publish("hide-right-panel");
  };

  // Mock wallet data - in real app this would come from API
  const walletUsers: WalletUser[] = [
    {
      id: 1,
      name: "Phan Công Kiều",
      email: "kieu.phan@gmail.com",
      totalAssets: "12.32932832",
      available: "0.00840590",
      locked: "0.000000",
      status: "pending",
    },
    {
      id: 2,
      name: "Tuấn Phan",
      email: "tuanphan@gmail.com",
      totalAssets: "723.73829182",
      available: "0.00840590",
      locked: "0.000000",
      status: "activated",
    },
    {
      id: 3,
      name: "Tuấn Phan",
      email: "tuanphan@gmail.com",
      totalAssets: "832.73828291",
      available: "0.00840590",
      locked: "0.000000",
      status: "deleted",
    },
    {
      id: 4,
      name: "Trung Nguyễn",
      email: "trung@gmail.com",
      totalAssets: "1,324.85938271",
      available: "0.00840590",
      locked: "0.000000",
      status: "locked",
    },
  ];

  const walletData = walletUsers.find(user => user.id.toString() === walletId);

  const getStatusBadge = (status: WalletUser["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Chờ kích hoạt</Badge>;
      case "activated":
        return <Badge variant="success">Kích hoạt</Badge>;
      case "deleted":
        return <Badge variant="error">Đã xoá</Badge>;
      case "locked":
        return <Badge variant="pending">Tạm khoá</Badge>;
      default:
        return null;
    }
  };

  if (!walletData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Wallet not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-white relative rounded-none md:rounded-tl-3xl">
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-none md:rounded-tl-3xl md:rounded-l-3xl rounded-tr-lg flex items-center justify-between">
        <h1 className="font-semibold text-[20px] leading-7 text-[#021337]">
          Chi tiết ví
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
            {walletData.name}
          </p>
          {getStatusBadge(walletData.status)}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
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
                  <div className="p-5 space-y-4">
                    <div className="bg-white rounded-md p-4 space-y-3">
                      <h3 className="font-semibold text-lg text-[#021337]">Thông tin tài sản</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Tổng tài sản quy đổi USDT</span>
                          <span className="font-semibold text-sm text-[#021337]">{walletData.totalAssets}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Khả dụng</span>
                          <span className="font-semibold text-sm text-[#021337]">{walletData.available}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Đang khoá</span>
                          <span className="font-semibold text-sm text-[#021337]">{walletData.locked}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "transactions" && (
                  <div className="p-5">
                    <div className="bg-white rounded-md p-4">
                      <h3 className="font-semibold text-lg text-[#021337] mb-4">Lịch sử giao dịch</h3>
                      <p className="text-sm text-[#677187]">Chưa có giao dịch nào</p>
                    </div>
                  </div>
                )}

                {activeTab === "history" && (
                  <div className="p-5">
                    <div className="bg-white rounded-md p-4">
                      <h3 className="font-semibold text-lg text-[#021337] mb-4">Lịch sử thao tác</h3>
                      <p className="text-sm text-[#677187]">Chưa có lịch sử thao tác nào</p>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </Tabs>
      </div>
    </div>
  );
}
