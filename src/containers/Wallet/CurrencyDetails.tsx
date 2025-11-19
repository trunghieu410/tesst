import { useState } from "react";
import { useEventListener, useEventEmitter } from "@/hooks/useEventEmitter";
import { XIcon } from "@/icon/XIcon";
import { Select } from "@/components/ui/Select";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils/common";
import {
  getCryptoIcon,
  getTransactionStatusBadge,
  formatNumber,
} from "./walletUtils";

// Data structures
interface CurrencyTransaction {
  id: string;
  txId: string;
  datetime: string;
  senderName: string;
  senderEmail?: string;
  receiverName: string;
  receiverEmail?: string;
  type: string;
  amount: string;
  balanceAfter: string;
  description: string;
  status: "approved" | "pending" | "rejected" | "warning";
}

interface CurrencyOperation {
  id: string;
  datetime: string;
  operatorName: string;
  operatorEmail: string;
  actionDescription: string;
  previousStatus: string;
  newStatus: string;
}

interface CurrencyDetailsData {
  id: number;
  name: string;
  ticker: string;
  icon: string;
  totalAssets: string;
  available: string;
  locked: string;
  usdtValue: string;
  withdrawalStatus: "enabled" | "disabled";
  transactions: CurrencyTransaction[];
  operations: CurrencyOperation[];
}

// Mock data
const mockCurrencyDetails: Record<number, CurrencyDetailsData> = {
  1: {
    id: 1,
    name: "Tether",
    ticker: "USDT",
    icon: "usdt",
    totalAssets: "12.32932832",
    available: "0.00840590",
    locked: "0.000000",
    usdtValue: "12.32932832",
    withdrawalStatus: "disabled",
    transactions: [
      {
        id: "1",
        txId: "TxC-312-67000",
        datetime: "10.13.2025 - 14:52",
        senderName: "Hệ thống",
        senderEmail: "kieu.phan@gmail.com",
        receiverName: "Phan Công Kiều",
        receiverEmail: "kieu.phan@gmail.com",
        type: "Giao dịch",
        amount: "-5.000000",
        balanceAfter: "12.070000",
        description: "Thu nhập từ chiến dịch",
        status: "approved",
      },
      {
        id: "2",
        txId: "TxC-9320432-8035",
        datetime: "10.13.2025 - 13:50",
        senderName: "Hệ thống",
        senderEmail: "kieu.phan@gmail.com",
        receiverName: "Phan Công Kiều",
        receiverEmail: "kieu.phan@gmail.com",
        type: "Giao dịch",
        amount: "-0.300000",
        balanceAfter: "31.334300",
        description: "Thu nhập từ chiến dịch",
        status: "warning",
      },
      {
        id: "3",
        txId: "TxC-9320432-8035",
        datetime: "10.13.2025 - 13:50",
        senderName: "Phan Công Kiều",
        senderEmail: "kieu.phan@gmail.com",
        receiverName: "0×9f1b7FAE548E07F4FEE9f...",
        receiverEmail: "",
        type: "Giao dịch",
        amount: "-15.000000",
        balanceAfter: "115.950000",
        description: "Rút USDT",
        status: "pending",
      },
      {
        id: "4",
        txId: "TxC-LOEvBr-24385",
        datetime: "10.12.2025 - 13:50",
        senderName: "Phan Công Kiều",
        senderEmail: "kieu.phan@gmail.com",
        receiverName: "Hệ thống",
        receiverEmail: "",
        type: "Điều chỉnh",
        amount: "+20.000000",
        balanceAfter: "831.000034",
        description: "Thu hồi xoá tài khoản",
        status: "rejected",
      },
      {
        id: "5",
        txId: "TxC-3296E-33485",
        datetime: "10.11.2025 - 13:50",
        senderName: "0×9f1b7FAE548E07F4FEE9f...",
        senderEmail: "",
        receiverName: "Phan Công Kiều",
        receiverEmail: "kieu.phan@gmail.com",
        type: "Giao dịch",
        amount: "+0.000001",
        balanceAfter: "81.932001",
        description: "Nạp tiền vào hệ thống",
        status: "approved",
      },
    ],
    operations: [
      {
        id: "1",
        datetime: "10.13.2025 - 13:50",
        operatorName: "Tuấn Phan",
        operatorEmail: "tuanphan@gmail.com",
        actionDescription: "Cập nhật Trạng thái Rút",
        previousStatus: "Khoá rút",
        newStatus: "Cho rút",
      },
      {
        id: "2",
        datetime: "10.12.2025 - 13:50",
        operatorName: "Trung Nguyễn",
        operatorEmail: "trung@gmail.com",
        actionDescription: "Cập nhật Trạng thái Nạp",
        previousStatus: "Cho nạp",
        newStatus: "Khoá nạp",
      },
    ],
  },
  2: {
    id: 2,
    name: "ROI",
    ticker: "ROI",
    icon: "roi",
    totalAssets: "723.73829182",
    available: "500.00000000",
    locked: "223.738291",
    usdtValue: "723.73829182",
    withdrawalStatus: "enabled",
    transactions: [],
    operations: [],
  },
  3: {
    id: 3,
    name: "OpenKingdom",
    ticker: "OKT",
    icon: "okt",
    totalAssets: "1,324.85938271",
    available: "1000.00000000",
    locked: "324.859382",
    usdtValue: "1,324.85938271",
    withdrawalStatus: "enabled",
    transactions: [],
    operations: [],
  },
};

export function CurrencyDetails() {
  const { publish } = useEventEmitter();
  const [selectedCurrencyId, setSelectedCurrencyId] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"information" | "operations">(
    "information"
  );
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("");

  // Listen for currency selection
  useEventListener<string>("show-currency-panel", (currencyId) => {
    setSelectedCurrencyId(Number(currencyId));
    setActiveTab("information");
  });

  const handleClose = () => {
    publish("hide-right-panel");
    setSelectedCurrencyId(null);
  };

  // Get selected currency data
  const currencyData = selectedCurrencyId
    ? mockCurrencyDetails[selectedCurrencyId]
    : null;

  if (!currencyData) {
    return null;
  }

  const transactionTypeOptions = [
    { value: "", label: "Loại giao dịch" },
    { value: "Giao dịch", label: "Giao dịch" },
    { value: "Điều chỉnh", label: "Điều chỉnh" },
  ];

  const filteredTransactions = transactionTypeFilter
    ? currencyData.transactions.filter((t) => t.type === transactionTypeFilter)
    : currencyData.transactions;

  return (
    <div className="bg-white h-full flex flex-col rounded-tl-3xl rounded-bl-3xl overflow-hidden w-full md:w-[600px]">
      {/* Header */}
      <div className="bg-white flex flex-col gap-2 items-end p-4 border-b border-[#cfd6de] rounded-tl-3xl">
        <div className="flex gap-4 items-center w-full">
          <div className="flex-1 flex gap-2.5 items-center">
            <h2 className="text-xl font-semibold text-[#021337] leading-7">
              Chi tiết ví tổng
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center text-[#677187] hover:text-[#021337] transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="px-4 pt-4">
          <div className="bg-[#edf2fd] flex h-8 items-center justify-center px-0.5 py-0 rounded-md">
            <button
              onClick={() => setActiveTab("information")}
              className={cn(
                "flex gap-2.5 h-7 items-center justify-center px-2 py-1.5 rounded-[5px] transition-colors",
                activeTab === "information"
                  ? "bg-white text-[#021337] font-medium"
                  : "bg-transparent text-[#677187] font-normal hover:text-[#021337]"
              )}
            >
              <span className="text-xs leading-4">Thông tin</span>
            </button>
            <button
              onClick={() => setActiveTab("operations")}
              className={cn(
                "flex gap-2.5 h-7 items-center justify-center px-2 py-1.5 rounded-[5px] transition-colors",
                activeTab === "operations"
                  ? "bg-white text-[#021337] font-medium"
                  : "bg-transparent text-[#677187] font-normal hover:text-[#021337]"
              )}
            >
              <span className="text-xs leading-4">Lịch sử thao tác</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {/* Tab 1: Information */}
          {activeTab === "information" && (
            <div className="flex flex-col gap-4 pt-4">
              {/* Withdrawal Status */}
              <div className="flex flex-col gap-1">
                <p className="text-xs text-[#677187] leading-4">
                  Trạng thái rút
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-10 h-6 rounded-full p-0.5 flex",
                      currencyData.withdrawalStatus === "disabled"
                        ? "bg-[#ff3b34] items-start"
                        : "bg-[#00a349] items-end"
                    )}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-sm" />
                  </div>
                  <span className="text-sm text-[#021337] leading-5">
                    {currencyData.withdrawalStatus === "disabled"
                      ? "Khoá rút"
                      : "Cho rút"}
                  </span>
                </div>
              </div>

              {/* Balance Info Table */}
              <div className="flex flex-col gap-1">
                <div className="border border-[#cfd6de] rounded-lg overflow-hidden">
                  <Table>
                    <TableHead>
                      <TableRow className="bg-white">
                        <TableHeaderCell align="left" className="min-w-[140px]">
                          Tên tài sản
                        </TableHeaderCell>
                        <TableHeaderCell
                          align="right"
                          className="min-w-[100px]"
                        >
                          Tổng tài sản
                        </TableHeaderCell>
                        <TableHeaderCell align="right" className="min-w-[90px]">
                          Khả dụng
                        </TableHeaderCell>
                        <TableHeaderCell align="right" className="min-w-[90px]">
                          Đang khoá
                        </TableHeaderCell>
                        <TableHeaderCell
                          align="right"
                          className="min-w-[120px]"
                        >
                          Tổng tài sản quy đổi USDT
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className="h-14">
                        <TableCell align="left">
                          <div className="flex items-center gap-2">
                            {getCryptoIcon(currencyData.icon)}
                            <div className="flex items-center gap-2 text-sm leading-[18px]">
                              <span className="font-medium text-[#021337]">
                                {currencyData.name}
                              </span>
                              <span className="text-[#777e90]">
                                {currencyData.ticker}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="right" className="text-sm">
                          {currencyData.totalAssets}
                        </TableCell>
                        <TableCell align="right" className="text-sm">
                          {currencyData.available}
                        </TableCell>
                        <TableCell align="right" className="text-sm">
                          {currencyData.locked}
                        </TableCell>
                        <TableCell align="right" className="text-sm">
                          {currencyData.usdtValue}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Transaction Type Filter */}
              <div className="w-[180px]">
                <Select
                  value={transactionTypeFilter}
                  onChange={setTransactionTypeFilter}
                  placeholder="Loại giao dịch"
                  options={transactionTypeOptions}
                />
              </div>

              {/* Transactions Table */}
              <div className="border border-[#cfd6de] rounded-lg overflow-hidden">
                <Table>
                  <TableHead>
                    <TableRow className="bg-white">
                      <TableHeaderCell align="center" className="w-10">
                        #
                      </TableHeaderCell>
                      <TableHeaderCell align="left" className="min-w-[140px]">
                        Tx ID
                      </TableHeaderCell>
                      <TableHeaderCell align="left" className="min-w-[150px]">
                        Bên gửi/ Bên nhận
                      </TableHeaderCell>
                      <TableHeaderCell align="left" className="min-w-[100px]">
                        Loại giao dịch
                      </TableHeaderCell>
                      <TableHeaderCell align="right" className="min-w-[100px]">
                        Số lượng
                      </TableHeaderCell>
                      <TableHeaderCell align="right" className="min-w-[100px]">
                        Số dư sau GD
                      </TableHeaderCell>
                      <TableHeaderCell align="left" className="min-w-[150px]">
                        Nội dung giao dịch
                      </TableHeaderCell>
                      <TableHeaderCell align="left" className="min-w-[100px]">
                        Trạng thái
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center" className="py-8">
                          <p className="text-sm text-[#677187]">
                            Không có giao dịch nào
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction, index) => (
                        <TableRow key={transaction.id} className="h-[50px]">
                          <TableCell align="center" className="text-sm">
                            {index + 1}
                          </TableCell>
                          <TableCell align="left">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs text-[#677187]">
                                {transaction.datetime}
                              </span>
                              <span className="text-xs text-[#3273F1] font-medium">
                                {transaction.txId}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-medium">
                                {transaction.senderName}
                              </span>
                              <span className="text-xs">
                                {transaction.senderEmail ||
                                  transaction.receiverEmail}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="left" className="text-sm">
                            {transaction.type}
                          </TableCell>
                          <TableCell
                            align="right"
                            className={cn(
                              "text-sm font-medium",
                              transaction.amount.startsWith("+")
                                ? "text-[#00a349]"
                                : "text-[#e5240c]"
                            )}
                          >
                            {transaction.amount}
                          </TableCell>
                          <TableCell align="right" className="text-sm">
                            {transaction.balanceAfter}
                          </TableCell>
                          <TableCell align="left" className="text-sm">
                            {transaction.description}
                          </TableCell>
                          <TableCell align="left">
                            {getTransactionStatusBadge(transaction.status)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* Tab 2: Operation History */}
          {activeTab === "operations" && (
            <div className="flex flex-col gap-4 pt-4">
              <div className="border border-[#cfd6de] rounded-lg overflow-hidden">
                <Table>
                  <TableHead>
                    <TableRow className="bg-white">
                      <TableHeaderCell align="left" className="flex-1">
                        Người thao tác
                      </TableHeaderCell>
                      <TableHeaderCell align="left" className="w-[250px]">
                        Thao tác
                      </TableHeaderCell>
                      <TableHeaderCell align="left" className="w-[150px]">
                        Thời gian thao tác
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currencyData.operations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} align="center" className="py-8">
                          <p className="text-sm text-[#677187]">
                            Chưa có lịch sử thao tác
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      currencyData.operations.map((operation) => (
                        <TableRow key={operation.id} className="h-[50px]">
                          <TableCell align="left">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-normal">
                                {operation.operatorName}
                              </span>
                              <span className="text-[10px]">
                                {operation.operatorEmail}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <div className="flex flex-col gap-0">
                              <span className="text-sm">
                                {operation.actionDescription}
                              </span>
                              <span className="text-sm font-medium">
                                {operation.previousStatus} →{" "}
                                {operation.newStatus}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="left">
                            <span className="text-sm">
                              {operation.datetime}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
