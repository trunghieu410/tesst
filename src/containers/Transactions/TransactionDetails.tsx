import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { XIcon } from "@/icon/XIcon";
import { useEventEmitter, useEventListener } from "@/hooks/useEventEmitter";
import { Tabs } from "../../components/Tabs";
import { useState } from "react";
import { ClickToCopy } from "@/components/ClickToCopy";

const tabs = [
  {
    id: "overview",
    label: "Tổng quan",
  },
  {
    id: "details",
    label: "Chi tiết",
  },
  {
    id: "history",
    label: "Lịch sử",
  },
];

interface Transaction {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  wallet: string;
  walletAddress: string;
  amount: string;
  currency: string;
  balance: string;
  note: string;
  statusUpdateTime: string;
  updater: string;
  txId: string;
  createdAt: string;
  status:
    | "pending"
    | "approving"
    | "approved"
    | "rejected"
    | "temporarily-approved";
}

interface TransactionDetailsProps {
  transactionId?: number;
}

export function TransactionDetails({
  transactionId: propTransactionId,
}: TransactionDetailsProps) {
  const { publish } = useEventEmitter();

  const [transactionId, setTransactionId] = useState<string>(
    propTransactionId?.toString() || ""
  );

  // Listen for transaction selection from the table
  useEventListener<string>("show-right-panel", (id) => {
    setTransactionId(id);
  });

  const handleClose = () => {
    publish("hide-right-panel");
  };

  // Mock transaction data - in real app this would come from API
  const transactions: Transaction[] = [
    {
      id: 1,
      sender: "Hệ thống",
      receiver: "Phan Công Kiều kieu.phan@gmail.com",
      content: "Thu nhập từ chiến dịch",
      wallet: "USDT (Phan Công Kiều)",
      walletAddress: "0x9f1b7FAE548E07F4FEE34Eb1a...",
      amount: "+5.000000",
      currency: "USDT",
      balance: "12.070000",
      note: "",
      statusUpdateTime: "10.13.2025 - 14:52",
      updater: "Hệ thống",
      txId: "TxC-312-RTRWREF",
      createdAt: "10.13.2025 - 14:52",
      status: "approved",
    },
    {
      id: 2,
      sender: "Hệ thống",
      receiver: "Phan Công Kiều kieu.phan@gmail.com",
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
    {
      id: 3,
      sender: "Phan Công Kiều kieu.phan@gmail.com",
      receiver: "0x9f1b7FAE548E07F4FEE34Eb1a...",
      content: "Rút tiền OKT",
      wallet: "OKD (Phan Công Kiều)",
      walletAddress: "0x9f1b7FAE548E07F4FEE34Eb1a...",
      amount: "-15.000000",
      currency: "OKD",
      balance: "115.950000",
      note: "Checking for cheat signal.",
      statusUpdateTime: "10.13.2025 - 13:50",
      updater: "Hà Kiều hakieu@ok.co",
      txId: "TxC-9320432-REDS",
      createdAt: "10.13.2025 - 13:50",
      status: "temporarily-approved",
    },
    {
      id: 4,
      sender: "Phan Công Kiều kieu.phan@gmail.com",
      receiver: "Hệ thống",
      content: "Truy thu sai phạm",
      wallet: "OKD (Phan Công Kiều)",
      walletAddress: "0x9f1b7FAE548E07F4FEE34Eb1a...",
      amount: "-20.000000",
      currency: "OKD",
      balance: "831.000034",
      note: "Checking for cheat signal.",
      statusUpdateTime: "10.12.2025 - 13:50",
      updater: "Hà Kiều hakieu@ok.co",
      txId: "TxC-LOEWR-2435G",
      createdAt: "10.12.2025 - 13:50",
      status: "rejected",
    },
    {
      id: 5,
      sender: "0x9f1b7FAE548E07F4FEE34Eb1a...",
      receiver: "Phan Công Kiều kieu.phan@gmail.com",
      content: "Nạp tiền OKD",
      wallet: "USDT (System)",
      walletAddress: "0x9f1b7FAE548E07F4FEE34Eb1a...",
      amount: "+1000.000000",
      currency: "USDT",
      balance: "81.932001",
      note: "Checking for cheat signal.",
      statusUpdateTime: "10.11.2025 - 13:50",
      updater: "Hệ thống",
      txId: "TxC-329GE-33465",
      createdAt: "10.11.2025 - 13:50",
      status: "approved",
    },
  ];

  const transactionData = transactions.find(tx => tx.id.toString() === transactionId);

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
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

  if (!transactionData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Transaction not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-white relative rounded-none md:rounded-tl-3xl">
      {/* Title Bar */}
      <div className="bg-white p-4 rounded-none md:rounded-tl-3xl md:rounded-l-3xl rounded-tr-lg flex items-center justify-between">
        <h1 className="font-semibold text-[20px] leading-7 text-[#021337]">
          Chi tiết giao dịch
        </h1>
        <Button variant="ghost" size="sm" onClick={handleClose} className="p-1">
          <XIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Transaction ID and Status */}
      <div className="flex items-center gap-3 mb-3 px-5 pb-4">
        <div className="w-20 h-20 rounded-[80px] bg-gray-200" />
        <div className="flex-1">
          <p className="font-semibold text-xl leading-7 text-[#021337]">
            #{transactionData.id}
          </p>
          {getStatusBadge(transactionData.status)}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Tabs */}
        <Tabs defaultTab={"overview"} tabs={tabs} className="flex-1 min-h-0">
          {(activeTab) => {
            const bgColor = activeTab === "details" ? "bg-white" : "bg-[#f3f4f5]";

            return (
              <div
                className={`relative w-full pn:w-[890px] pb-4 flex-1 overflow-y-auto ${bgColor} border-t border-[#CFD6DE]`}
              >
                {/* Scrollable Content */}

                {activeTab === "overview" && (
                  <div className="p-5 space-y-4">
                    <div className="bg-white rounded-md p-4 space-y-3">
                      <h3 className="font-semibold text-lg text-[#021337]">Thông tin giao dịch</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Người gửi</span>
                          <span className="font-semibold text-sm text-[#021337]">{transactionData.sender}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Người nhận</span>
                          <span className="font-semibold text-sm text-[#021337]">
                            {transactionData.receiver.includes("0x") ? (
                              <ClickToCopy showIcon>
                                {transactionData.receiver}
                              </ClickToCopy>
                            ) : (
                              transactionData.receiver
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Nội dung</span>
                          <span className="font-semibold text-sm text-[#021337]">{transactionData.content}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Số lượng</span>
                          <span className={`font-semibold text-sm ${
                            transactionData.amount.startsWith("+")
                              ? "text-[#00a349]"
                              : "text-[#ff3b34]"
                          }`}>
                            {transactionData.amount} {transactionData.currency}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Số dư sau GD</span>
                          <span className="font-semibold text-sm text-[#021337]">{transactionData.balance} {transactionData.currency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="p-5 space-y-4">
                    <div className="bg-white rounded-md p-4 space-y-3">
                      <h3 className="font-semibold text-lg text-[#021337]">Chi tiết giao dịch</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Tx ID</span>
                          <ClickToCopy showIcon className="font-semibold text-sm text-[#021337]">
                            {transactionData.txId}
                          </ClickToCopy>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Ví thao tác</span>
                          <span className="font-semibold text-sm text-[#021337]">{transactionData.wallet}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Địa chỉ ví</span>
                          <ClickToCopy showIcon className="font-semibold text-sm text-[#021337]">
                            {transactionData.walletAddress}
                          </ClickToCopy>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Thời gian tạo</span>
                          <span className="font-semibold text-sm text-[#021337]">{transactionData.createdAt}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Cập nhật trạng thái</span>
                          <span className="font-semibold text-sm text-[#021337]">{transactionData.statusUpdateTime}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[#677187]">Người cập nhật</span>
                          <span className="font-semibold text-sm text-[#021337]">{transactionData.updater}</span>
                        </div>
                        {transactionData.note && (
                          <div className="flex justify-between items-start">
                            <span className="text-sm text-[#677187]">Ghi chú</span>
                            <span className="font-semibold text-sm text-[#021337] max-w-[200px]">{transactionData.note}</span>
                          </div>
                        )}
                      </div>
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
