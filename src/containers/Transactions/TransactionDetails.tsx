import { useState } from "react";
import { useEventEmitter, useEventListener } from "@/hooks/useEventEmitter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ClickToCopy } from "@/components/ui/ClickToCopy";
import { XIcon } from "@/icon/XIcon";
import { WalletIcon } from "@/icon/WalletIcon";
import { cn } from "@/lib/utils/common";
import type { Transaction } from "@/types";

// Mock transaction data - in a real app, this would come from an API or state management
const mockTransactions: Transaction[] = [
  {
    id: 1,
    sender: "Hệ thống",
    receiver: "Phan Công Kiều",
    content:
      'Thu nhập từ chiến dịch "KDWR212 - 3 lượt xem quảng cáo mỗi ngày nhận ROI"',
    wallet: "USDT (Phan Công Kiều)",
    walletAddress: "5Kb7x2nFsd9Af2Xt",
    amount: "+5.000000",
    currency: "USDT",
    balance: "12.070000",
    note: "",
    statusUpdateTime: "10.13.2025 - 14:52",
    updater: "Hệ thống",
    txId: "TxC-312-RTRWREF",
    createdAt: "30/11/2021 8:40",
    status: "approved",
  },
  {
    id: 2,
    sender: "Hệ thống",
    receiver: "Phan Công Kiều",
    content: "Thu nhập từ F1 Hậu Đoàn...",
    wallet: "OKD (Phan Công Kiều)",
    walletAddress: "0x9f1b7FAE548E07F4FEE34Eb1a...",
    amount: "+0.300000",
    currency: "OKD",
    balance: "31.334300",
    note: "",
    statusUpdateTime: "10.13.2025 - 13:50",
    updater: "Hệ thống",
    txId: "TxC-9320432-REDS",
    createdAt: "10.13.2025 - 13:50",
    status: "pending",
  },
];

export function TransactionDetails() {
  const { publish } = useEventEmitter();
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");

  // Listen for transaction selection
  useEventListener<string>("show-right-panel", (transactionId) => {
    setSelectedTransactionId(transactionId);
    setActiveTab("info"); // Reset to info tab when opening
  });

  const handleClose = () => {
    publish("hide-right-panel");
    setSelectedTransactionId(null);
  };

  // Get the selected transaction
  const transaction = mockTransactions.find(
    (t) => t.id.toString() === selectedTransactionId
  );

  if (!transaction) {
    return null;
  }

  const getReceiverEmail = () => {
    // Extract email from receiver string if present
    const emailMatch = transaction.receiver.match(/[\w.-]+@[\w.-]+\.\w+/);
    return emailMatch ? emailMatch[0] : "kieu.phan@gmail.com";
  };

  const getStatusBadge = () => {
    switch (transaction.status) {
      case "approved":
        return <Badge variant="success">Đã duyệt</Badge>;
      case "pending":
        return <Badge variant="warning">Chờ duyệt</Badge>;
      case "approving":
        return <Badge variant="pending">Đang duyệt</Badge>;
      case "rejected":
        return <Badge variant="danger">Từ chối</Badge>;
      case "temporarily-approved":
        return (
          <Badge variant="default" className="bg-[#CFDDFF] text-[#021337]">
            Tạm duyệt
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white h-full flex flex-col rounded-tl-3xl rounded-bl-3xl overflow-hidden w-full md:w-[600px]">
      {/* Header */}
      <div className="bg-white flex flex-col gap-2 p-4 border-b border-[#f0f3f5] shrink-0">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[20px] font-semibold leading-7 text-[#021337]">
            Chi tiết giao dịch
          </h2>
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            aria-label="Close"
          >
            <XIcon className="w-6 h-6 text-[#021337]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-white">
        {/* Tabs */}
        <div className="bg-[#edf2fd] flex items-center h-8 mx-4 mt-4 rounded-md p-0.5">
          <button
            onClick={() => setActiveTab("info")}
            className={cn(
              "flex-1 h-7 px-2 py-1.5 rounded-[5px] text-xs font-medium leading-4 transition-colors",
              activeTab === "info"
                ? "bg-white text-[#021337]"
                : "text-[#677187]"
            )}
          >
            Thông tin
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "flex-1 h-7 px-2 py-1.5 rounded-[5px] text-xs font-medium leading-4 transition-colors",
              activeTab === "history"
                ? "bg-white text-[#021337]"
                : "text-[#677187]"
            )}
          >
            Lịch sử thao tác
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "info" ? (
          <div className="flex flex-col gap-4 p-4">
            {/* Status and Date */}
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <p className="text-sm leading-5 text-[#021337]">
                Ngày tạo: {transaction.createdAt}
              </p>
            </div>

            {/* Sender */}
            <div className="flex flex-col gap-1">
              <p className="text-xs leading-4 text-[#677187]">Người gửi</p>
              <p className="text-sm font-medium leading-5 text-[#021337]">
                {transaction.sender}
              </p>
            </div>

            {/* Receiver */}
            <div className="flex flex-col gap-1">
              <p className="text-xs leading-4 text-[#677187]">Người nhận</p>
              <div className="flex items-center gap-4 flex-wrap">
                <ClickToCopy
                  showIcon
                  className="text-sm font-medium leading-5 text-[#021337]"
                >
                  {transaction.receiver}
                </ClickToCopy>
                <ClickToCopy
                  showIcon
                  className="text-sm leading-5 text-[#021337]"
                >
                  {getReceiverEmail()}
                </ClickToCopy>
              </div>
            </div>

            {/* Transaction Content */}
            <div className="flex flex-col gap-1">
              <p className="text-xs leading-4 text-[#677187]">
                Nội dung giao dịch
              </p>
              <p className="text-sm leading-5 text-[#021337]">
                {transaction.content}
              </p>
            </div>

            {/* Amount and Wallet */}
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-xs leading-4 text-[#677187]">Số lượng</p>
                <p className="text-base font-semibold leading-6 text-[#021337]">
                  {transaction.amount} {transaction.currency}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs leading-4 text-[#677187]">Ví thao tác</p>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-sm font-semibold leading-5 text-[#021337]">
                    {transaction.wallet}
                  </span>
                  <ClickToCopy
                    showIcon
                    className="text-sm leading-5 text-[#021337]"
                  >
                    {transaction.walletAddress}
                  </ClickToCopy>
                </div>
              </div>
            </div>

            {/* Balance After Transaction */}
            <div className="flex flex-col gap-1">
              <p className="text-xs leading-4 text-[#677187]">
                Số dư của loại tiền này sau giao dịch
              </p>
              <div className="flex items-center gap-2.5">
                <p className="text-base leading-5 text-[#021337]">
                  {transaction.balance} {transaction.currency}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<WalletIcon classes="w-4 h-4" />}
                  className="h-8"
                >
                  Xem ví
                </Button>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="flex flex-col gap-1">
              <p className="text-xs leading-4 text-[#677187]">Mã giao dịch</p>
              <div className="flex items-center gap-2">
                <ClickToCopy showIcon>{transaction.txId}</ClickToCopy>
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1">
              <p className="text-xs leading-4 text-[#677187]">Ghi chú</p>
              <textarea
                placeholder="Nhập ghi chú"
                className="w-full h-[89px] px-3 py-2.5 border border-[#cfd6de] rounded-md text-[13px] leading-4 text-[#677187] resize-none focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:border-transparent"
                defaultValue={transaction.note}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <p className="text-[#677187]">Lịch sử thao tác chưa có dữ liệu</p>
          </div>
        )}
      </div>
    </div>
  );
}
