import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useEffect, useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { DateRangeInput } from "@/components/DateRangeInput";
import { Dropdown } from "@/components/Dropdown";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "@/components/Table";
import { Badge } from "@/components/Badge";
import { Pagination } from "@/components/Pagination";
import { ClickToCopy } from "@/components/ClickToCopy";
import { InfoIcon } from "@/icon/InfoIcon";
import { Tabs } from "@/components/Tabs";
import { cn } from "@/lib/utils/common";
import { Button } from "@/components/Button";

type StatusType = "all" | "pending" | "approving" | "approved" | "rejected";

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

export function Transactions() {
  const { publish } = useEventEmitter();
  const [activeStatus, setActiveStatus] = useState<StatusType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("1.10 - 30.11");
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [currency, setCurrency] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(1000);

  useEffect(() => {
    publish("title-change", { title: "Giao Dịch" });
  }, [publish]);

  // Sample transaction data
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

  const filteredTransactions = transactions.filter((tx) => {
    if (activeStatus !== "all" && tx.status !== activeStatus) {
      return false;
    }
    return true;
  });

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

  const statusCounts = {
    all: transactions.length,
    pending: transactions.filter((t) => t.status === "pending").length,
    approving: transactions.filter((t) => t.status === "approving").length,
    approved: transactions.filter((t) => t.status === "approved").length,
    rejected: transactions.filter((t) => t.status === "rejected").length,
  };

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);

  const tabConfig = [
    { id: "transaction", label: "Giao dịch" },
    { id: "adjustment", label: "Điều chỉnh" },
  ];

  return (
    <Tabs
      tabs={tabConfig}
      defaultTab="transaction"
      className="border-b border-[#CFD6DE]"
    >
      {(activeTab) => {
        return (
          <div className="p-3 flex flex-col gap-4 w-full h-full border-t border-[#CFD6DE]">
            {activeTab === "transaction" ? (
              <>
                {/* Filters */}
                <div className="flex items-start gap-2.5 flex-wrap">
                  <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Mã Tx, địa chỉ ví"
                    className="w-[250px]"
                  />
                  <DateRangeInput
                    value={dateRange}
                    onChange={setDateRange}
                    className="w-40"
                  />
                  <Dropdown
                    value={sender}
                    onChange={setSender}
                    placeholder="Người gửi"
                    options={[
                      { value: "", label: "Tất cả" },
                      { value: "system", label: "Hệ thống" },
                    ]}
                    className="w-[108px]"
                  />
                  <Dropdown
                    value={receiver}
                    onChange={setReceiver}
                    placeholder="Người nhận"
                    options={[
                      { value: "", label: "Tất cả" },
                      { value: "user1", label: "Phan Công Kiều" },
                    ]}
                    className="w-[119px]"
                  />
                  <Dropdown
                    value={currency}
                    onChange={setCurrency}
                    placeholder="Đơn vị tiền"
                    options={[
                      { value: "", label: "Tất cả" },
                      { value: "usdt", label: "USDT" },
                      { value: "okd", label: "OKD" },
                    ]}
                    className="w-[114px]"
                  />
                </div>

                {/* Status Tabs */}
                <div className="flex flex-col gap-0">
                  <div className="border-t border-x rounded-t-lg border-[#e6e9ed] bg-white">
                    <div className="px-4 flex gap-0">
                      <Button
                        variant="tab"
                        isActive={activeStatus === "all"}
                        onClick={() => setActiveStatus("all")}
                      >
                        Tất cả
                        <Badge
                          isCircle
                          isActive={activeStatus === "all"}
                          variant="default"
                        >
                          {statusCounts.all}
                        </Badge>
                      </Button>
                      <Button
                        variant="tab"
                        isActive={activeStatus === "pending"}
                        onClick={() => setActiveStatus("pending")}
                      >
                        Tầng 1
                        <Badge
                          isCircle
                          isActive={activeStatus === "pending"}
                          variant="default"
                        >
                          {statusCounts.pending}
                        </Badge>
                      </Button>
                      <Button
                        variant="tab"
                        isActive={activeStatus === "approving"}
                        onClick={() => setActiveStatus("approving")}
                      >
                        Tầng 2
                        <InfoIcon className="w-4 h-4" />
                        <Badge
                          isCircle
                          isActive={activeStatus === "approving"}
                          variant="default"
                        >
                          {statusCounts.approving}
                        </Badge>
                      </Button>
                      <Button
                        variant="tab"
                        isActive={activeStatus === "approved"}
                        onClick={() => setActiveStatus("approved")}
                      >
                        Tầng 3
                        <Badge
                          isCircle
                          isActive={activeStatus === "approved"}
                          variant="default"
                        >
                          {statusCounts.approved}
                        </Badge>
                      </Button>
                      <Button
                        variant="tab"
                        isActive={activeStatus === "rejected"}
                        onClick={() => setActiveStatus("rejected")}
                      >
                        Tầng 3
                        <Badge
                          isCircle
                          isActive={activeStatus === "rejected"}
                          variant="default"
                        >
                          {statusCounts.rejected}
                        </Badge>
                      </Button>
                    </div>
                  </div>

                  {/*Transaction-section*/}
                  {/* Table */}
                  <Table
                    horizontalScrollWithStickyColumns
                    className="border border-[#cfd6de]"
                  >
                    <TableHead>
                      <TableRow>
                        <TableHeaderCell className="w-[50px]">
                          #
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[250px]">
                          Bên gửi/Bên nhận
                        </TableHeaderCell>
                        <TableHeaderCell className="w-52">
                          Nội dung giao dịch
                        </TableHeaderCell>
                        <TableHeaderCell className="w-52">
                          Ví thao tác
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[120px]" align="right">
                          Số lượng
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[100px]">
                          Đơn vị tiền
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[120px]">
                          <div className="flex items-center gap-1">
                            Số dư sau GD
                            <InfoIcon className="w-4 h-4" />
                          </div>
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[200px]">
                          Ghi chú
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[150px]">
                          Cập nhật trạng thái
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[150px]">
                          Người cập nhật
                        </TableHeaderCell>
                        <TableHeaderCell className="w-40">
                          Tx ID
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[150px]">
                          Thời gian tạo
                        </TableHeaderCell>
                        <TableHeaderCell className="w-[120px]">
                          Trạng thái
                        </TableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTransactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>{tx.id}</TableCell>
                          <TableCell className="py-2.5">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm leading-4 text-[#021337]">
                                {tx.sender}
                              </div>
                              <div className="text-sm leading-4 text-[#021337]">
                                {tx.receiver.includes("0x") ? (
                                  <ClickToCopy showIcon>
                                    {tx.receiver}
                                  </ClickToCopy>
                                ) : (
                                  tx.receiver
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-2.5">{tx.content}</TableCell>
                          <TableCell className="py-2.5">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm leading-4 text-[#021337]">
                                {tx.wallet}
                              </div>
                              <div className="text-xs leading-4 text-[#677187]">
                                {tx.walletAddress}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <span
                              className={
                                tx.amount.startsWith("+")
                                  ? "text-[#00a349]"
                                  : "text-[#ff3b34]"
                              }
                            >
                              {tx.amount}
                            </span>
                          </TableCell>
                          <TableCell>{tx.currency}</TableCell>
                          <TableCell>{tx.balance}</TableCell>
                          <TableCell>{tx.note || "-"}</TableCell>
                          <TableCell>{tx.statusUpdateTime}</TableCell>
                          <TableCell>{tx.updater}</TableCell>
                          <TableCell>
                            <ClickToCopy showIcon>{tx.txId}</ClickToCopy>
                          </TableCell>
                          <TableCell>{tx.createdAt}</TableCell>
                          <TableCell>{getStatusBadge(tx.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Footer */}
                <div className="flex items-center justify-between p-2 border-t border-[#b5bcc4] bg-white">
                  <div className="flex items-center gap-4">
                    <p className="font-normal text-sm leading-5 text-[#021337]">
                      3,323 kết quả
                    </p>
                    <p className="font-normal text-sm leading-5 text-[#021337]">
                      212.289001 số lượng
                    </p>
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={setRowsPerPage}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Điều chỉnh - Placeholder content
              </div>
            )}
          </div>
        );
      }}
    </Tabs>
  );
}
